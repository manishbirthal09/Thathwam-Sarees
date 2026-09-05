import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true,
},
    colors: [{ type: String }],
    description: { type: String },
    stock: { type: Number, default: 10 },
    images: [{ type: String }], 
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);