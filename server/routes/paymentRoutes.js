import express from "express";
const router = express.Router();
import { createRazorpayOrder,
  verifyRazorpayPayment, } from "../controllers/paymentController.js";
import { optionalCustomer }  from "../middleware/customerAuthMiddleware.js";


router.post("/create-order", optionalCustomer, createRazorpayOrder);
router.post("/verify-payment", optionalCustomer, verifyRazorpayPayment);

export default router;