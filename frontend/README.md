# 🎨 Fashio Frontend

Modern React + TypeScript frontend for the Fashio e-commerce platform with unified routing, authentication, and responsive design.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

---

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Reusable UI components
│   ├── admin/          # Admin dashboard components (30+ components)
│   │   ├── category/   # Category management components
│   │   ├── item/       # Item/Product components
│   │   ├── order/      # Order management components
│   │   ├── promo/      # Promo management components
│   │   ├── Navbar.tsx
│   │   ├── NavigationRail.tsx
│   │   └── ...
│   ├── auth/           # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── client/         # Client-facing components (35+ components)
│   │   ├── cart/       # Shopping cart components
│   │   ├── checkout/   # Checkout flow components
│   │   ├── home/       # Homepage components (Hero, Slider)
│   │   ├── item/       # Product display components
│   │   ├── profile/    # User profile components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── common/         # Shared components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Spinner.tsx
│   │   └── ...
│   └── ui/             # Radix UI primitives (20+ components)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       └── ...
├── config/             # App configuration
│   └── routes.tsx      # Unified routing config
├── contexts/           # React Context providers
│   ├── auth/           # Auth context & provider
│   ├── cart/           # Cart context & provider
│   ├── PromoProvider.tsx
│   └── ...
├── error-boundaries/   # Error handling components
│   ├── AsyncErrorBoundary.tsx
│   ├── ComponentErrorBoundary.tsx
│   ├── RouteErrorBoundary.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── admin/          # Admin-specific hooks
│   ├── auth/           # Auth hooks
│   ├── useAuthQueries.ts
│   ├── useCart.ts
│   ├── useCategories.ts
│   ├── useItems.ts
│   ├── useOrders.ts
│   ├── usePromos.ts
│   └── ...
├── layouts/            # Layout wrappers
│   ├── AdminLayout.tsx
│   └── PublicLayout.tsx
├── lib/                # Utility libraries
│   └── utils.ts        # Helper functions
├── pages/              # Route page components
│   ├── admin/          # Admin pages
│   │   ├── CategoriesPage.tsx
│   │   ├── ImageSliderPage.tsx
│   │   ├── ItemInsertPage.tsx
│   │   ├── ItemListPage.tsx
│   │   ├── OrderDashboardPage.tsx
│   │   └── PromoAddPage.tsx
│   ├── client/         # Client pages
│   │   ├── HomePage.tsx
│   │   ├── ItemDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── PromoPage.tsx
│   │   └── HelpPage.tsx
│   └── NotFoundPage.tsx
├── schemas/            # Zod validation schemas
│   ├── authSchemas.ts
│   ├── itemSchemas.ts
│   └── orderSchemas.ts
├── services/           # API service layer
│   ├── api.ts          # Axios instance
│   ├── authService.ts
│   ├── cartService.ts
│   ├── categoryService.ts
│   ├── imageService.ts
│   ├── itemService.ts
│   ├── orderService.ts
│   ├── promoService.ts
│   └── userService.ts
├── types/              # TypeScript definitions
│   ├── auth.ts
│   ├── cart.ts
│   ├── category.ts
│   ├── item.ts
│   ├── order.ts
│   ├── promo.ts
│   └── ...
├── utils/              # Helper utilities
│   ├── image.ts
│   ├── promo.ts
│   └── ...
├── App.tsx             # Root component
├── AppRoutes.tsx       # Route definitions
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

## 🎯 Key Features

### **Unified Routing System**
- Single source of truth for all routes
- Separate public and admin routes
- Automatic route protection
- Role-based access control

### **Authentication**
- Context-based auth state management
- JWT token handling
- Protected routes
- Role-based permissions (admin/user)
- Persistent login with localStorage

### **Layouts**
- **PublicLayout**: Client-facing pages with navbar, footer, and floating buttons
- **AdminLayout**: Dashboard with sidebar navigation and admin navbar
- Responsive design (mobile drawer, desktop navigation rail)

### **Component Architecture**
- **Admin Components**: Dashboard-specific UI components
- **Client Components**: Customer-facing UI components
- **Common Components**: Shared across both interfaces
- TypeScript for type safety

---

## 🔐 Authentication Flow

```
User Access
    ↓
Check Route Type
    ├─→ Public Route → Render with PublicLayout
    │
    └─→ Protected Route (/admin/*)
        ↓
    Check Authentication
        ├─→ Not Authenticated → Redirect to /login
        │
        └─→ Authenticated
            ↓
        Check Role
            ├─→ Wrong Role → Redirect to /
            │
            └─→ Correct Role → Render with AdminLayout
```

---

## 🗺️ Routes

### **Public Routes** (`/`)
- `/` - Home page
- `/promo` - Promotions
- `/help` - Help center
- `/login` - User login
- `/profile` - User profile (protected)

### **Admin Routes** (`/admin/*`) - Protected
- `/admin/image-slider` - Manage slider images
- `/admin/items/insert` - Add new products
- `/admin/items/list` - Product inventory
- `/admin/categories` - Category management
- `/admin/promo` - Promo management

---

## 🎨 Styling

### **Tailwind CSS v4**
- Utility-first CSS framework
- Custom color palette
- Responsive design utilities
- Component-based styling

### **Custom Theme**
```css
/* Main colors */
--navbar-gray: #2C3E50
--dark-gray: #34495E
--background-gray: #ECF0F1

/* Fonts */
font-pacifico: 'Pacifico', cursive
font-poppins: 'Poppins', sans-serif
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# Image URLs
VITE_API_UPLOAD_IMAGES_URL=http://localhost:5000/uploads/items/
VITE_API_SLIDER_IMAGES_URL=http://localhost:5000/uploads/slider/
```

---

## 📦 Dependencies

### **Production**
- `react` (^19.1.1) - UI library
- `react-dom` (^19.1.1) - DOM rendering
- `react-router-dom` (^7.9.3) - Routing
- `axios` (^1.12.2) - HTTP client
- `framer-motion` (^12.23.22) - Animations
- `react-icons` (^5.5.0) - Icon library
- `tailwindcss` (^4.1.14) - CSS framework

### **Development**
- `typescript` (^5.8.3) - Type checking
- `vite` (^6.0.7) - Build tool
- `eslint` (^9.36.0) - Code linting

---

## 🏗️ Build Configuration

### **Vite Config**
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Code splitting
- Tree shaking

### **TypeScript Config**
- Strict mode enabled
- Path aliases configured
- Type checking on build

---

## 🧩 Component Patterns

### **Page Component Example**
```tsx
import { useState, useEffect } from 'react';
import { fetchItems } from '../../services/itemService';
import type { Item } from '../../types/item';

const ItemListPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to load items', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ItemListPage;
```

### **Service Layer Example**
```tsx
import api from './api';
import { ENDPOINTS } from './endpoints';
import type { Item } from '../types/item';

export const fetchItems = async (): Promise<Item[]> => {
  const response = await api.get(ENDPOINTS.ITEMS);
  return response.data;
};

export const createItem = async (item: FormData): Promise<Item> => {
  const response = await api.post(ENDPOINTS.ITEMS, item);
  return response.data;
};
```

---

## 🔄 State Management

### **Auth Context**
```tsx
import { useAuth } from '../contexts/AuthContext';

const Component = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use auth state and methods
};
```

### **Protected Routes**
```tsx
<Route element={<ProtectedRoute requiredRole="admin" />}>
  <Route path="/admin/*" element={<AdminLayout />} />
</Route>
```

---

## 🎭 Animations

Using Framer Motion for smooth transitions:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Navigation drawer for mobile
- Navigation rail for desktop

---

## 🧪 Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

---

## 📊 Performance

- Code splitting by route
- Lazy loading of images
- Optimized bundle size
- Tree shaking
- Production minification

---

## 🐛 Debugging

```bash
# Development with source maps
pnpm dev

# Build with source maps
pnpm build --sourcemap

# Type checking
tsc --noEmit
```

---

## 📖 Best Practices

1. **Component Organization**
   - One component per file
   - Colocate related files
   - Use TypeScript interfaces

2. **State Management**
   - Use Context for global state
   - Local state for component-specific data
   - Custom hooks for reusable logic

3. **API Calls**
   - Always use service layer
   - Handle errors gracefully
   - Show loading states

4. **Type Safety**
   - Define types for all data
   - Use strict TypeScript
   - Avoid `any` type

---

## 🚀 Deployment

### **Production Build**
```bash
pnpm build
```

### **Preview Build Locally**
```bash
pnpm preview
```

### **Deploy to Vercel/Netlify**
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

---

## 📝 TODO

See the main project README and the todo list for upcoming features and improvements.

---

## 🤝 Contributing

1. Follow the existing code style
2. Write TypeScript types
3. Test your changes
4. Update documentation
5. Submit a pull request

---

## 📄 License

ISC License - See main project README

---

Made with ⚡ Vite + ⚛️ React + 📘 TypeScript
