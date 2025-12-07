import { baseTemplate } from "./baseTemplate.js";

export const welcomeEmail = (name) => {
    const content = `
    <p>Hi ${name},</p>
    <p>Your email has been verified successfully. Start exploring trends!</p>
    <p style="text-align: center;">
      <a href="${process.env.FRONTEND_URL}" class="button">Start Shopping</a>
    </p>
  `;
    return baseTemplate("Welcome to Fashio 🎉", content);
};
