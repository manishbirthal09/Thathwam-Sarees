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

export const optionalCustomer = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    req.customer = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== "customer") {
      req.customer = null;
      return next();
    }
    const customer = await Customer.findById(decoded.id);
    req.customer = customer ? { id: customer._id } : null;
    next();
  } catch (error) {
    req.customer = null;
    next();
  }
};