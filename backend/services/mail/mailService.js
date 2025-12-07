import transporter from "./transporter.js";
import { verificationEmail } from "./templates/verificationEmail.js";
import { resetPasswordEmail } from "./templates/resetPasswordEmail.js";
import { welcomeEmail } from "./templates/welcomeEmail.js";
import { orderConfirmationEmail } from "./templates/orderConfirmationEmail.js";
import { orderStatusUpdateEmail } from "./templates/orderStatusUpdateEmail.js";

const send = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Fashio" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log(`Email sent to ${to}: ${subject}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
};

export default {
    sendVerificationEmail: (email, token, name) =>
        send(email, "Verify Your Email", verificationEmail(name, `${process.env.FRONTEND_URL}/verify-email?token=${token}`)),

    sendPasswordResetEmail: (email, token, name) =>
        send(email, "Reset Password", resetPasswordEmail(name, `${process.env.FRONTEND_URL}/reset-password?token=${token}`)),

    sendWelcomeEmail: (email, name) =>
        send(email, "Welcome to Fashio!", welcomeEmail(name)),

    sendOrderConfirmationEmail: (order) =>
        send(order.user.email, `Order Confirmation #${order._id}`, orderConfirmationEmail(order)),

    sendOrderStatusUpdateEmail: (order) =>
        send(order.user.email, `Order Update #${order._id}`, orderStatusUpdateEmail(order))
};
