import crypto from "crypto";
import razorpayInstance from "../utils/razorpay.js";
import Order from "../models/Order.js"; 
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    
    const options = {
      amount: amount * 100,     // Razorpay expects PAISE, not rupees. ₹499 => 49900
      currency: "INR",
      receipt: `receipt_${orderId}`, // your own internal order reference
      payment_capture: 1,        // 1 = auto-capture payment immediately after authorization
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    
    await Order.findByIdAndUpdate(orderId, {
      razorpay_order_id: razorpayOrder.id,
      payment_status: "created",
    });

      res.status(200).json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID, // public key, safe to expose
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    res.status(500).json({ success: false, message: "Could not create order" });
  }
};


export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // your internal order _id
    } = req.body;

        const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isSignatureValid = generatedSignature === razorpay_signature;

    if (!isSignatureValid) {
      await Order.findByIdAndUpdate(orderId, { payment_status: "failed" });
      return res.status(400).json({ success: false, message: "Invalid signature — payment not trusted" });
    }

   
    await Order.findByIdAndUpdate(orderId, {
      razorpay_payment_id,
      razorpay_signature,
      payment_status: "paid",
    });

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ success: false, message: "Verification error" });
  }
};


// import { randomUUID }  from 'crypto';
// import { StandardCheckoutPayRequest } from 'pg-sdk-node';
// import phonepeClient from '../utils/phonepeClient.js';
// import Order from '../models/Order.js';

// export const initiatePayment = async(req,res) => {
//     try{
//         const {orderId} =  req.params;
//         const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
//     const merchantOrderId = `${order._id}-${Date.now()}`;
//     const amountInPaise = Math.round(order.totalAmount * 100);
//     const request = StandardCheckoutPayRequest.builder()
//       .merchantOrderId(merchantOrderId)
//       .amount(amountInPaise)
//       .redirectUrl(`${process.env.PHONEPE_SUCCESS_URL}/${order._id}`)
//       .build();

//       const response = await phonepeClient.pay(request);
//       order.paymentMethod = "phonepe";
//     order.phonepeMerchantTransactionId = merchantOrderId;
//     await order.save();
//     res.status(200).json({
//       success: true,
//       redirectUrl: response.redirectUrl,
//     });
    
//     } catch (error) {
//     console.error("PhonePe initiate error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }

// };

// export const checkPaymentStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
//     const status = await phonepeClient.getOrderStatus(order.phonepeMerchantTransactionId);
//     if (status.state === "COMPLETED") {
//       order.paymentStatus = "paid";
//       order.status = "confirmed";
//     } else if (status.state === "FAILED") {
//       order.paymentStatus = "failed";
//     }

//     await order.save();
//     res.status(200).json({
//       success: true,
//       paymentStatus: order.paymentStatus,
//       orderStatus: order.status,
//     });
//   } catch (error) {
//     console.error("PhonePe status check error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };