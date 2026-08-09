import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema(
  {
    customerRef: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }, // 👈 NEW
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: String,
      pincode: String,
    },
    paymentMethod: { type: String, enum: ["phonepe", "cod"], default: "phonepe" }, 
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    phonepeMerchantTransactionId: String, 
        phonepeTransactionId: String,          
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
); 
export default mongoose.model("Order", orderSchema);