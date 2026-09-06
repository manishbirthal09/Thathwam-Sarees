
import express from "express";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "../controllers/couponController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getCoupons);
router.post("/", protect, createCoupon);
router.put("/:id", protect, updateCoupon);
router.delete("/:id", protect, deleteCoupon);
router.post("/validate", validateCoupon); // public
export default router;