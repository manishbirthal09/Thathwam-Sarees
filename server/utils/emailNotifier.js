import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderNotification = async (order) => {
  try {
    const itemsList = order.items
      .map((item) => `${item.name} × ${item.quantity} — ₹${item.price}`)
      .join("\n");

    await resend.emails.send({
      from: "Aabha <orders@mail.aabhabybhanupriya.com>",
      to: process.env.ADMIN_ORDER_EMAIL,
      subject: `New Order Received — ₹${order.totalAmount}`,
      text: `
A new order has been placed!

Order ID: ${order._id}
Customer: ${order.customer.name}
Phone: ${order.customer.phone}
Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}

Items:
${itemsList}

Total Amount: ₹${order.totalAmount}
Payment Method: ${order.paymentMethod.toUpperCase()}

Check the admin dashboard for full details.
      `.trim(),
    });

    console.log("Order notification email sent");
  } catch (error) {
    console.error("Email notification error:", error.message);
  }
};