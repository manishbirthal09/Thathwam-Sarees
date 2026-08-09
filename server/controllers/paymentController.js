import { randomUUID }  from 'crypto';
import { StandardCheckoutPayRequest } from 'pg-sdk-node';
import phonepeClient from '../utils/phonepeClient';
import Order from '../models/Order';

export default initiatePayment = async(req,res) => {
    try{
        const {orderId} =  req.params;
        const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    const merchantOrderId = `${order._id}-${Date.now()}`;
    const amountInPaise = Math.round(order.totalAmount * 100);
    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amountInPaise)
      .redirectUrl(`${process.env.PHONEPE_SUCCESS_URL}/${order._id}`)
      .build();

      const response = await phonepeClient.pay(request);
      order.paymentMethod = "phonepe";
    order.phonepeMerchantTransactionId = merchantOrderId;
    await order.save();
    res.status(200).json({
      success: true,
      redirectUrl: response.redirectUrl,
    });
    
    } catch (error) {
    console.error("PhonePe initiate error:", error);
    res.status(500).json({ success: false, message: error.message });
  }

};

export default checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    const status = await phonepeClient.getOrderStatus(order.phonepeMerchantTransactionId);
    if (status.state === "COMPLETED") {
      order.paymentStatus = "paid";
      order.status = "confirmed";
    } else if (status.state === "FAILED") {
      order.paymentStatus = "failed";
    }

    await order.save();
    res.status(200).json({
      success: true,
      paymentStatus: order.paymentStatus,
      orderStatus: order.status,
    });
  } catch (error) {
    console.error("PhonePe status check error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};