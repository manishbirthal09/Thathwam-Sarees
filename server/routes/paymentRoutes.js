import express from "express";
const router = express.Router();
import { createRazorpayOrder,
  verifyRazorpayPayment, } from "../controllers/paymentController.js";
import { protectCustomer }  from "../middleware/customerAuthMiddleware.js";


router.post("/create-order", protectCustomer, createRazorpayOrder);
router.post("/verify-payment", protectCustomer, verifyRazorpayPayment);

export default router;