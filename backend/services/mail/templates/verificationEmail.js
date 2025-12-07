import { baseTemplate } from "./baseTemplate.js";

export const verificationEmail = (name, url) => {
    const content = `
    <p>Hi ${name},</p>
    <p>Please verify your email to complete your registration.</p>
    <p style="text-align: center;">
      <a href="${url}" class="button">Verify Email</a>
    </p>
    <p>Or copy this link:<br>${url}</p>
    <p>This link will expire in 24 hours.</p>
  `;
    return baseTemplate("Welcome to Fashio!", content);
};
