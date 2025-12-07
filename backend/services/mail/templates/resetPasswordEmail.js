import { baseTemplate } from "./baseTemplate.js";

export const resetPasswordEmail = (name, url) => {
    const content = `
    <p>Hi ${name},</p>
    <p>You requested a password reset. Click below:</p>
    <p style="text-align: center;">
      <a href="${url}" class="button">Reset Password</a>
    </p>
    <p>Or copy this link:<br>${url}</p>

    <div style="background:#fff3cd;border:1px solid #ffc107;padding:15px;border-radius:5px;">
      <strong>⚠️ Security Notice</strong>
      <p>This link expires in 1 hour.</p>
    </div>
  `;
    return baseTemplate("Reset Your Password", content);
};
