import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import { protectCustomer } from "../middleware/customerAuthMiddleware"; // 👈 NEW import
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders, 
} from "../controllers/orderController";

router.post("/", protectCustomer, createOrder);           // 👈 CHANGED — login required now
router.get("/my-orders", protectCustomer, getMyOrders);    // 👈 NEW route
router.get("/", protect, getOrders);                        // unchanged — admin only
router.get("/:id", protectCustomer, getOrderById);          // 👈 CHANGED — login required
router.put("/:id/status", protect, updateOrderStatus);      // unchanged — admin only

export default router;