import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema(
  {
    customerRef: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    bogoDiscount: { type: Number, default: 0 },
    couponDiscount: { type: Number, default: 0 },
    couponCode: { type: String, default: null },
    deliveryCharge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: String,
      pincode: String,
    },
    paymentMethod: { type: String, enum: ["razorpay", "cod"], default: "razorpay" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    razorpay_order_id: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
    },
    razorpay_signature: {
      type: String,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);