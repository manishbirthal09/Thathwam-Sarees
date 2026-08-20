import express from "express";
const router = express.Router();
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
}  from "../controllers/cartController.js";

router.get("/:cartId", getCart);
router.post("/:cartId/add", addToCart);
router.put("/:cartId/update", updateCartItem);
router.delete("/:cartId/remove/:productId", removeFromCart);

export default router;