import  nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.ADMIN_EMAIL,
//     pass: process.env.EMAIL_APP_PASSWORD,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendOrderNotification = async (order) => {
  try {
    const itemsList = order.items
      .map((item) => `${item.name} × ${item.quantity} — ₹${item.price}`)
      .join("\n");

    const mailOptions = {
      from: `"Niara by Neenu" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
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
    };

    await transporter.sendMail(mailOptions);
    console.log("Order notification email sent");
  } catch (error) {
    console.error("Email notification error:", error.message);
    
  }
};