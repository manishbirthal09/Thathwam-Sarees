import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

export const protectCustomer = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Important: reject if an admin token is used on a customer route
    if (decoded.type !== "customer") {
      return res.status(403).json({ success: false, message: "Not authorized as customer" });
    }

    const customer = await Customer.findById(decoded.id);
    if (!customer) {
      return res.status(401).json({ success: false, message: "Customer not found" });
    }

    req.customer = { id: customer._id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};