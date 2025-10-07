# Fashio - E-Commerce Fashion Platform

A modern, full-stack e-commerce platform for fashion items with separate admin and client interfaces, built with React, TypeScript, Node.js, and MongoDB.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### **Client Features**
- 🛍️ Browse fashion items by category
- 🔍 Search and filter products
- 🎠 Image slider for promotions
- 📱 Fully responsive design
- 👤 User authentication
- 💳 Shopping cart (coming soon)

### **Admin Features**
- 🔐 Protected admin routes with authentication
- 📦 Product management (CRUD operations)
- 🏷️ Category management
- 🖼️ Image slider management
- 🎁 Promo management
- 📊 Inventory tracking

### **Technical Features**
- ⚡ Fast development with Vite
- 🎨 Tailwind CSS for styling
- 🔄 Framer Motion animations
- 🔒 JWT-based authentication
- 📱 Mobile-first responsive design
- 🎯 TypeScript for type safety

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Icons:** React Icons
- **State Management:** React Context API

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **File Upload:** Multer
- **Authentication:** JWT (coming soon)
- **CORS:** Enabled for cross-origin requests

---

## 📁 Project Structure

```
fashio-two/
├── backend/                 # Node.js Express API
│   ├── models/             # MongoDB schemas
│   │   ├── category.js
│   │   ├── image.js
│   │   ├── item.js
│   │   └── promo.js
│   ├── routes/             # API routes
│   │   ├── categoryRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── itemRoute.js
│   │   └── promoRoutes.js
│   ├── uploads/            # Static file storage
│   ├── server.js           # Express server entry
│   └── package.json
│
└── frontend/               # React + TypeScript
    ├── src/
    │   ├── assets/         # Static assets (images, icons)
    │   ├── components/     # Reusable components
    │   │   ├── admin/      # Admin-specific components
    │   │   ├── client/     # Client-specific components
    │   │   └── common/     # Shared components
    │   ├── config/         # Configuration files
    │   │   └── routes.tsx  # Unified routing config
    │   ├── contexts/       # React contexts (Auth)
    │   ├── layouts/        # Layout components
    │   │   ├── AdminLayout.tsx
    │   │   └── PublicLayout.tsx
    │   ├── pages/          # Page components
    │   │   ├── admin/      # Admin pages
    │   │   └── client/     # Client pages
    │   ├── services/       # API services
    │   ├── types/          # TypeScript type definitions
    │   ├── App.tsx         # Main app component
    │   └── main.tsx        # Entry point
    └── package.json
```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- pnpm (optional, or use npm/yarn)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/asathsara/Fashio-Two.git
   cd fashio-two
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   pnpm install
   # or
   npm install
   ```

4. **Setup Environment Variables**

   Create `.env` files in both backend and frontend directories (see [Environment Variables](#-environment-variables))

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

6. **Run the Application**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start at `http://localhost:5000`

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   pnpm dev
   ```
   App will open at `http://localhost:5173`

---

## 🔐 Environment Variables

### **Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashio
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### **Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_API_UPLOAD_IMAGES_URL=http://localhost:5000/uploads/items/
VITE_API_SLIDER_IMAGES_URL=http://localhost:5000/uploads/slider/
```

---

## 📡 API Endpoints

### **Categories**
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### **Items**
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create item (with images)
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### **Images**
- `GET /api/images` - Get all slider images
- `POST /api/images` - Upload slider image
- `DELETE /api/images/:id` - Delete slider image

### **Promos**
- `GET /api/promos` - Get all promos
- `POST /api/promos` - Create promo
- `DELETE /api/promos/:id` - Delete promo

---

## 🗺️ Routing Structure

### **Public Routes**
- `/` - Home page
- `/promo` - Promotions page
- `/help` - Help page
- `/login` - Login page
- `/profile` - User profile (protected)

### **Admin Routes** (Protected)
- `/admin/image-slider` - Manage slider images
- `/admin/items/insert` - Add new items
- `/admin/items/list` - View/manage items
- `/admin/categories` - Manage categories
- `/admin/promo` - Manage promotions

---

## 🎨 Design System

### **Colors**
- **Primary:** Navbar Gray (`#2C3E50`)
- **Secondary:** Dark Gray (`#34495E`)
- **Background:** Light Gray (`#ECF0F1`)
- **Accent:** Custom brand colors

### **Typography**
- **Headings:** Pacifico (Google Fonts)
- **Body:** Poppins (Google Fonts)

---

## 📝 Development Workflow

### **Branch Strategy**
- `main` - Production-ready code
- `unify/frontend` - Current unified frontend development
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### **Code Style**
- ESLint for code quality
- TypeScript strict mode
- Consistent component structure
- Proper type definitions

---

## 🔄 Next Steps (TODO)

- [ ] **Auth System** - Implement JWT authentication with backend
- [ ] **Shopping Cart** - Add cart functionality
- [ ] **Payment Integration** - Add payment gateway
- [ ] **Order Management** - Track customer orders
- [ ] **Email Notifications** - Send order confirmations
- [ ] **Product Reviews** - Allow customer reviews
- [ ] **Search Enhancement** - Advanced search and filters
- [ ] **Performance Optimization** - Code splitting, lazy loading
- [ ] **Testing** - Unit and integration tests
- [ ] **Deployment** - CI/CD pipeline setup

See the [TODO List](#todo-list) below for detailed implementation steps.

---

## 🧪 Testing

```bash
# Frontend
cd frontend
pnpm test          # Run tests
pnpm test:watch    # Watch mode

# Backend
cd backend
npm test
```

---

## 📦 Build & Deploy

### **Frontend Build**
```bash
cd frontend
pnpm build
pnpm preview    # Preview production build
```

### **Backend Deploy**
```bash
cd backend
npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Team

- **Developer:** [asathsara](https://github.com/asathsara)

---

## 📞 Support

For support, email asathsara@example.com or open an issue in the GitHub repository.

---

## 🙏 Acknowledgments

- React Team for amazing framework
- Tailwind CSS for utility-first CSS
- MongoDB for flexible database
- All open-source contributors

---

Made with ❤️ by the Fashio Team
