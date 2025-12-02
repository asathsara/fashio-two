# ✨ Rate Limiting Overview

🔒 This folder contains all rate-limiter configurations used in the API.

Rate limiting helps to:

* 🛡️ Prevent brute-force login attempts
* 🤖 Protect expensive AI APIs
* 📧 Reduce email spam
* 📦 Guard file uploads
* 📊 Limit public data scraping
* 👑 Protect admin routes
* 🌐 Provide global DoS protection

⚙️ Implemented using **express-rate-limit**.

---

## 🔑 How Keys Are Generated

* 👤 **User ID** → if logged in
* 🌍 **IP (IPv4/IPv6 safe)** → if not logged in

This prevents IPv6 users from bypassing limits.

---

## 🧱 Limiters Included

### 1. 🤖 AI Limiter

* 5 requests / 15 minutes
* Uses user ID or IP
* Protects costly AI generation

### 2. 🔐 Auth Limiter

* 5 attempts / 15 minutes
* Blocks login brute-force attacks

### 3. 📧 Email Limiter

* 3 actions / hour
* Prevents email spam (verify, resend)

### 4. 📤 Upload Limiter

* 20 uploads / hour
* Protects storage/bandwidth

### 5. 🌐 Public API Limiter

* 100 GET requests / 15 minutes
* Reduces scraping

### 6. 👑 Admin API Limiter

* 30 requests / hour
* Protects sensitive admin actions

### 7. 🚦 Global Limiter

* 100 requests / 15 minutes
* Default DoS protection

---

## 🚀 How to Use a Limiter

```ts
import { aiLimiter } from "./rateLimiter.js";

router.post("/generate", aiLimiter, controller);
```

## 🧪 How To Test If Your Limiter Works

1. Open Postman or Thunder Client
2. Send the same request repeatedly
3. When you exceed the limit, you should receive:

```json
{
    "success": false,
    "message": "Too many requests. Please try again in X minutes."
}
```

If you see this — congratulations! Your limiter works perfectly.
