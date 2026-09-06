
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

  const totalItems = allPrices.length;
  const freeItemsCount = Math.floor(totalItems / 3);

  let discount = 0;
  for (let i = 0; i < freeItemsCount; i++) {
    discount += allPrices[i];
  }
  return discount;
}