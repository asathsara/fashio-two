import { baseTemplate } from "./baseTemplate.js";

export const orderStatusUpdateEmail = (order) => {
    const messages = {
        Processing: "Your order is being processed.",
        Shipped: "Great news! Your order is on the way.",
        Delivered: "Your package has been delivered.",
        Cancelled: "Your order has been cancelled.",
    };

    const content = `
    <p>Hi ${order.user.name},</p>
    <div style="background: white; padding: 20px; border-left: 5px solid #1a1a1a;">
      <h3>Order #${order._id}</h3>
      <p><strong>Status:</strong> ${order.status}</p>
      <p>${messages[order.status] || "Your order status has been updated."}</p>
    </div>
    <p style="text-align:center;">
      <a href="${process.env.FRONTEND_URL}/profile" class="button">Track Order</a>
    </p>
  `;
    return baseTemplate("Order Update 🚚", content);
};
