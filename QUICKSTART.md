# 🚀 Fashio - Quick Start Guide

Get up and running with Fashio in under 10 minutes!

---

## ⚡ Prerequisites

Before you begin, make sure you have:

- ✅ Node.js (v18 or higher) - [Download](https://nodejs.org/)
- ✅ MongoDB (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ pnpm (optional) - `npm install -g pnpm`
- ✅ Git - [Download](https://git-scm.com/)

**Check your installations:**
```bash
node --version    # Should be v18+
npm --version     # Should be v8+
mongod --version  # Should be v6+
```

---

## 📥 Step 1: Clone & Install (3 minutes)

```bash
# Clone the repository
git clone https://github.com/asathsara/Fashio-Two.git
cd fashio-two

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
pnpm install
# or: npm install
```

---

## 🔧 Step 2: Setup Environment (2 minutes)

### Backend Environment

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashio
NODE_ENV=development
```

### Frontend Environment

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_API_UPLOAD_IMAGES_URL=http://localhost:5000/uploads/items/
VITE_API_SLIDER_IMAGES_URL=http://localhost:5000/uploads/slider/
```

**Quick Create (Copy & Paste):**

**Windows PowerShell:**
```powershell
# Backend
cd backend
@"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashio
NODE_ENV=development
"@ | Out-File -FilePath .env -Encoding utf8

# Frontend
cd ../frontend
@"
VITE_API_BASE_URL=http://localhost:5000
VITE_API_UPLOAD_IMAGES_URL=http://localhost:5000/uploads/items/
VITE_API_SLIDER_IMAGES_URL=http://localhost:5000/uploads/slider/
"@ | Out-File -FilePath .env -Encoding utf8
```

**Mac/Linux:**
```bash
# Backend
cd backend
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashio
NODE_ENV=development
EOF

# Frontend
cd ../frontend
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000
VITE_API_UPLOAD_IMAGES_URL=http://localhost:5000/uploads/items/
VITE_API_SLIDER_IMAGES_URL=http://localhost:5000/uploads/slider/
EOF
```

---

## 🗄️ Step 3: Start MongoDB (1 minute)

**Option 1: Default Start**
```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option 2: Custom Data Directory**
```bash
mongod --dbpath /path/to/your/data
```

**Verify MongoDB is running:**
```bash
mongosh
# Should connect successfully
# Type: exit
```

---

## 🏃 Step 4: Run the Application (2 minutes)

**You need 2 terminal windows:**

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

You should see:
```
✓ Server running on http://localhost:5000
✓ MongoDB connected successfully
```

### Terminal 2: Frontend
```bash
cd frontend
pnpm dev
```

You should see:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🎉 Step 5: Access the Application

Open your browser and navigate to:

- **Client App:** http://localhost:5173/
- **Admin Panel:** http://localhost:5173/admin *(requires login)*
- **API Server:** http://localhost:5000/

---

## 🔑 Default Login (Coming Soon)

Once authentication is implemented:

```
Email: admin@fashio.com
Password: admin123
Role: Admin
```

---

## 📸 What You Should See

### **Home Page** (`/`)
- Image slider carousel
- Category sections
- Product items
- Navigation bar
- Footer

### **Admin Panel** (`/admin`)
- Login redirect (if not authenticated)
- Dashboard with sidebar
- Product management
- Category management

---

## ✅ Verify Everything Works

### Test Checklist:

#### Frontend
- [ ] Home page loads
- [ ] Navigation menu works
- [ ] Images load correctly
- [ ] Responsive design works (try mobile view)
- [ ] No console errors

#### Backend
- [ ] Server responds at http://localhost:5000
- [ ] Can access: http://localhost:5000/api/categories
- [ ] Can access: http://localhost:5000/api/items
- [ ] MongoDB connection successful

#### Database
- [ ] MongoDB running without errors
- [ ] Can connect with `mongosh`
- [ ] Database 'fashio' exists

---

## 🐛 Common Issues & Fixes

### Issue 1: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Fix:**
```bash
# Find and kill the process
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

### Issue 2: MongoDB Not Running

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Fix:**
```bash
# Check if MongoDB is running
# Windows
sc query MongoDB

# Mac
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Start MongoDB if not running
mongod
```

---

### Issue 3: Module Not Found

**Error:**
```
Cannot find module 'express'
```

**Fix:**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
pnpm install
```

---

### Issue 4: CORS Error

**Error:**
```
Access to fetch at 'http://localhost:5000' blocked by CORS policy
```

**Fix:**
- Check backend .env has correct settings
- Restart backend server
- Clear browser cache
- Check browser console for actual error

---

### Issue 5: Vite Port Conflict

**Error:**
```
Port 5173 is already in use
```

**Fix:**
```bash
# Option 1: Use different port
pnpm dev --port 3000

# Option 2: Kill existing process
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

---

## 📁 Project Structure Quick Reference

```
fashio-two/
├── backend/           # API Server
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── uploads/      # Uploaded files
│   └── server.js     # Entry point
│
└── frontend/         # React App
    └── src/
        ├── components/  # UI components
        ├── pages/      # Page components
        ├── services/   # API calls
        ├── types/      # TypeScript types
        └── App.tsx     # Main app
```

---

## 🎯 Next Steps

Once everything is running:

1. **Explore the Frontend**
   - Browse products on home page
   - Test navigation
   - Try responsive design

2. **Test the Admin Panel**
   - Go to `/admin`
   - Will redirect to login (not implemented yet)

3. **Check the API**
   - Visit http://localhost:5000/api/categories
   - Visit http://localhost:5000/api/items

4. **Follow Implementation Guide**
   - Read `TODO.md` for next steps
   - Implement authentication
   - Add more features

---

## 🔄 Daily Development Workflow

```bash
# 1. Start MongoDB
mongod

# 2. Start Backend (Terminal 1)
cd backend
npm run dev

# 3. Start Frontend (Terminal 2)
cd frontend
pnpm dev

# 4. Make changes and test
# Files auto-reload on save

# 5. Stop servers
# Press Ctrl+C in each terminal
```

---

## 📚 Learn More

- [Full README](./README.md) - Complete project documentation
- [Frontend README](./frontend/README.md) - Frontend specific docs
- [Backend README](./backend/README.md) - Backend API docs
- [TODO Guide](./TODO.md) - Implementation roadmap

---

## 🆘 Get Help

**Still having issues?**

1. Check the error message carefully
2. Search for the error online
3. Check MongoDB logs
4. Check browser console (F12)
5. Check terminal output
6. Open an issue on GitHub

---

## 🎊 Success!

If you see the home page with products and the slider, congratulations! 🎉

You're ready to start developing. Check out `TODO.md` for the next steps in implementing the full authentication and routing system.

---

**Happy Coding! 💻✨**
