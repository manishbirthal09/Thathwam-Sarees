import express from "express";
const router = express.Router();
import { protect }  from "../middleware/authMiddleware.js";
import { protectCustomer, optionalCustomer }  from "../middleware/customerAuthMiddleware.js"; 
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders, 
} from "../controllers/orderController.js";

router.post("/", optionalCustomer, createOrder);
router.get("/my-orders", protectCustomer, getMyOrders);    
router.get("/", protect, getOrders);                        
router.get("/:id", optionalCustomer, getOrderById);          
router.put("/:id/status", protect, updateOrderStatus);      

export default router;