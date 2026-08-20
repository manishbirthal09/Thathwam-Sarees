import express from "express";
const router = express.Router();
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
} from "../controllers/customerAuthController.js";
import { protectCustomer }  from "../middleware/customerAuthMiddleware.js";

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/profile", protectCustomer, getCustomerProfile);

export default router;