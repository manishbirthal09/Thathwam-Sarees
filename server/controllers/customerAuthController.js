import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

const generateToken = (id) => {
  return jwt.sign({ id, type: "customer" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};


export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const customer = await Customer.create({ name, email, password, phone });
    const token = generateToken(customer._id);

    res.status(201).json({
      success: true,
      token,
      customer: { id: customer._id, name: customer.name, email: customer.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const customer = await Customer.findOne({ email }).select("+password");
    if (!customer || !(await customer.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(customer._id);

    res.status(200).json({
      success: true,
      token,
      customer: { id: customer._id, name: customer.name, email: customer.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};