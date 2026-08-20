import crypto from "crypto";
import Order from "../models/Order";


export const razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET; // set separately in Razorpay dashboard
    const signature = req.headers["x-razorpay-signature"];

        const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = req.body.event;

    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;

      
      const order = await Order.findOne({ razorpay_order_id: payment.order_id });
      if (order && order.payment_status !== "paid") {
        order.payment_status = "paid";
        order.razorpay_payment_id = payment.id;
        await order.save();
      }
    }

    if (event === "payment.failed") {
      const payment = req.body.payload.payment.entity;
      await Order.findOneAndUpdate(
        { razorpay_order_id: payment.order_id },
        { payment_status: "failed" }
      );
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ status: "error" });
  }
};

