import Order from "../models/Order.js";
import { sendOrderNotification }  from "../utils/emailNotifier.js";  

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, customer, paymentMethod } = req.body;
    const order = await Order.create({customerRef: req.customer.id, items, totalAmount, customer, paymentMethod });
    res.status(201).json(order);
    sendOrderNotification(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders  (admin only)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/orders/:id/status  (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/my-orders  (customer only)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerRef: req.customer.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};