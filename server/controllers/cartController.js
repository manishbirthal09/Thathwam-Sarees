import  Cart from "../models/Cart.js";
import { v4 as uuidv4 } from "uuid";

// GET /api/cart/:cartId
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ cartId: req.params.cartId }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ cartId: req.params.cartId, items: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart/:cartId/add
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ cartId: req.params.cartId });

    if (!cart) {
      cart = await Cart.create({ cartId: req.params.cartId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/cart/:cartId/update
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ cartId: req.params.cartId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/:cartId/remove/:productId
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartId: req.params.cartId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};