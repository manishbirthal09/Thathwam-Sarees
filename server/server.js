import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerAuthRoutes from "./routes/customerAuthRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";

const app = express();
app.use(cors({
  origin: [
     "http://localhost:5173",
     "http://localhost:5174",
     "https://thathwam-sarees-frontend.vercel.app",
     "https://thathwam-sarees-admin.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/customer/auth", customerAuthRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/coupons", couponRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));