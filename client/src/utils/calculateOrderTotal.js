
export function calculateBogoDiscount(cartItems, bogoEnabled) {
  if (!bogoEnabled) return 0;

  const allPrices = [];
  cartItems.forEach((item) => {
    const price = item.product.discountPrice || item.product.price;
    for (let i = 0; i < item.quantity; i++) {
      allPrices.push(price);
    }
  });

  allPrices.sort((a, b) => a - b);
  const freeItemsCount = Math.floor(allPrices.length / 3);

  let discount = 0;
  for (let i = 0; i < freeItemsCount; i++) {
    discount += allPrices[i];
  }
  return discount;
}

export function calculateOrderTotal({ cartItems, settings, couponDiscountPercent = 0 }) {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const bogoDiscount = calculateBogoDiscount(cartItems, settings.bogoEnabled);
  const afterBogo = subtotal - bogoDiscount;
  const couponDiscount = (afterBogo * couponDiscountPercent) / 100;
  const afterCoupon = afterBogo - couponDiscount;
  const deliveryCharge = settings.deliveryCharge;
  const total = afterCoupon + deliveryCharge;

  return {
    subtotal,
    bogoDiscount,
    couponDiscount,
    deliveryCharge,
    total: Math.round(total),
  };
}