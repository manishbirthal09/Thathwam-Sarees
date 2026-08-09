import express from "express";
const router = express.Router();
import { initiatePayment, checkPaymentStatus } from "../controllers/paymentController";
import { protectCustomer }  from "../middleware/customerAuthMiddleware";


router.post("/initiate/:orderId", protectCustomer, initiatePayment);
router.get("/status/:orderId", protectCustomer, checkPaymentStatus);

export default router;