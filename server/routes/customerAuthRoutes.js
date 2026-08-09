import express from "express";
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
} = require("../controllers/customerAuthController");
const { protectCustomer } = require("../middleware/customerAuthMiddleware");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/profile", protectCustomer, getCustomerProfile);

export default router;