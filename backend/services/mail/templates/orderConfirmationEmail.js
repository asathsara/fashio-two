import { baseTemplate } from "./baseTemplate.js";

export const orderConfirmationEmail = (order) => {
    const itemsHtml = order.items.map(item => `
    <tr>
      <td>${item.name}<br><small>Qty: ${item.quantity}</small></td>
      <td style="text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join("");

    const content = `
    <p>Hi ${order.user.name},</p>
    <p>Your order is confirmed!</p>

    <h3>Order Summary (#${order._id})</h3>
    <table style="width:100%; border-collapse: collapse;">
      ${itemsHtml}
      <tr>
         <td style="border-top:1px solid #ccc; padding-top:10px;"><strong>Total:</strong></td>
         <td style="border-top:1px solid #ccc; padding-top:10px; text-align:right;"><strong>$${order.total.toFixed(2)}</strong></td>
      </tr>
    </table>

    <p style="text-align: center;">
      <a href="${process.env.FRONTEND_URL}/profile" class="button">View Order</a>
    </p>
  `;

    return baseTemplate("Order Confirmed 🛍️", content);
};
