# 📝 Fashio Project - Implementation TODO List

Complete step-by-step guide for implementing the unified frontend with authentication, layouts, and routing.

**Last Updated:** October 7, 2025  
**Branch:** `unify/frontend`

---

## 🎯 Current Status

- ✅ Project structure unified
- ✅ Components organized (admin/client/common)
- ✅ Routes configuration created
- ✅ Type definitions completed
- ✅ README documentation created
- ⏳ Authentication system (in progress)
- ⏳ Layouts implementation (in progress)

---

## 📋 Implementation Roadmap

### **Phase 1: Authentication System** 🔐

#### ✅ Step 1.1: Create Auth Types
**File:** `frontend/src/types/auth.ts`

**Status:** ✅ Ready to implement

**Code provided in previous response**

**Tasks:**
- [ ] Create the file
- [ ] Define User interface
- [ ] Define AuthContextType interface
- [ ] Test type imports

---

#### ✅ Step 1.2: Create Auth Context
**File:** `frontend/src/contexts/AuthContext.tsx`

**Status:** ✅ Ready to implement

**Features:**
- User state management
- Login/logout functions
- localStorage persistence
- JWT token handling (future)

**Tasks:**
- [ ] Create contexts folder
- [ ] Implement AuthContext
- [ ] Add localStorage logic
- [ ] Test context provider

**Testing:**
```tsx
// Test in a component
import { useAuth } from '../contexts/AuthContext';

const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  console.log({ user, isAuthenticated });
  return <div>{user?.email}</div>;
};
```

---

#### ✅ Step 1.3: Create Protected Route Component
**File:** `frontend/src/components/common/ProtectedRoute.tsx`

**Status:** ✅ Ready to implement

**Features:**
- Check authentication status
- Check user role
- Redirect to login if not authenticated
- Show loading state

**Tasks:**
- [ ] Create the component
- [ ] Add loading state
- [ ] Add role checking
- [ ] Test redirects

---

### **Phase 2: Layout System** 🎨

#### Step 2.1: Update PublicLayout
**File:** `frontend/src/layouts/PublicLayout.tsx`

**Current Status:** Exists but needs updates

**Required Changes:**
1. Add Navbar with navigation items
2. Add Footer with links
3. Add FloatingUpButton
4. Import from correct component paths

**Tasks:**
- [ ] Read current PublicLayout
- [ ] Import Navbar from client components
- [ ] Import Footer from client components
- [ ] Import FloatingUpButton
- [ ] Pass publicNavRoutes to Navbar
- [ ] Add drawer state management
- [ ] Test layout rendering

**Example:**
```tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/client/Navbar';
import Footer from '../components/client/Footer';
import FloatingUpButton from '../components/client/FloatingUpButton';
import NavigationDrawer from '../components/client/NavigationDrawer';
import { publicNavRoutes } from '../config/routes';

const PublicLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        navItems={publicNavRoutes}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />
      <NavigationDrawer
        navItems={publicNavRoutes}
        open={isDrawerOpen}
        closeNav={() => setIsDrawerOpen(false)}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer footerItems={publicNavRoutes} />
      <FloatingUpButton />
    </div>
  );
};
```

---

#### Step 2.2: Update AdminLayout
**File:** `frontend/src/layouts/AdminLayout.tsx`

**Current Status:** Exists but needs updates

**Required Changes:**
1. Import admin components
2. Add drawer/rail state
3. Pass admin routes
4. Add proper responsive behavior

**Tasks:**
- [ ] Read current AdminLayout
- [ ] Import Navbar from admin components
- [ ] Import NavigationRail
- [ ] Import NavigationDrawer
- [ ] Pass adminNavRoutes
- [ ] Add responsive design
- [ ] Test layout rendering

---

### **Phase 3: Routes & App Update** 🗺️

#### Step 3.1: Update Routes Configuration
**File:** `frontend/src/config/routes.tsx`

**Status:** ✅ Created, needs verification

**Tasks:**
- [ ] Verify all page imports are correct
- [ ] Check admin route paths (should be /admin/*)
- [ ] Verify type imports
- [ ] Test route exports

**Verification:**
```bash
# Check for import errors
cd frontend
pnpm build
```

---

#### Step 3.2: Update App.tsx
**File:** `frontend/src/App.tsx`

**Status:** ⏳ Needs complete rewrite

**Tasks:**
- [ ] Remove current App.tsx content
- [ ] Add AuthProvider wrapper
- [ ] Add BrowserRouter
- [ ] Add Routes and Route components
- [ ] Implement public routes with PublicLayout
- [ ] Implement admin routes with protection
- [ ] Add 404 route
- [ ] Test routing

**Testing Checklist:**
- [ ] Public routes accessible without login
- [ ] Admin routes redirect to login
- [ ] After login, admin routes accessible
- [ ] 404 redirects to home
- [ ] Layouts render correctly

---

### **Phase 4: Move Common Components** 📦

#### Step 4.1: Move Spacer Component

**Tasks:**
- [ ] Create `frontend/src/components/common/Spacer.tsx`
- [ ] Copy content from admin/Spacer.tsx
- [ ] Delete `admin/Spacer.tsx`
- [ ] Delete `client/Spacer.tsx`
- [ ] Update imports in App.tsx (if used)

**Command:**
```bash
# Check for Spacer usage
cd frontend
grep -r "import.*Spacer" src/
```

---

#### Step 4.2: Move Dialog Component

**Tasks:**
- [ ] Create `frontend/src/components/common/Dialog.tsx`
- [ ] Copy content from admin/Dialog.tsx
- [ ] Delete `admin/Dialog.tsx`
- [ ] Update imports in ItemInsertPage
- [ ] Update imports in ItemListPage
- [ ] Update imports in PromoAddPage
- [ ] Test dialog functionality

**Files to Update:**
```
src/pages/admin/ItemInsertPage.tsx
src/pages/admin/ItemListPage.tsx
src/pages/admin/PromoAddPge.tsx
```

**Find & Replace:**
```
Old: import Dialog from "../../components/admin/Dialog";
New: import Dialog from "../../components/common/Dialog";
```

---

### **Phase 5: Update Components** 🔧

#### Step 5.1: Update Admin Navbar
**File:** `frontend/src/components/admin/Navbar.tsx`

**Required Changes:**
1. Add logout button functionality
2. Import useAuth hook
3. Add navigation on logout

**Tasks:**
- [ ] Import useAuth
- [ ] Import useNavigate
- [ ] Add handleLogout function
- [ ] Update logout button onClick
- [ ] Test logout flow

**Code Addition:**
```tsx
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ openNav }: NavbarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // ... existing code
    <button onClick={handleLogout} className="...">
      Logout
    </button>
  );
};
```

---

#### Step 5.2: Update NavigationRail
**File:** `frontend/src/components/admin/NavigationRail.tsx`

**Tasks:**
- [ ] Verify adminNavRoutes import
- [ ] Check route paths match new structure
- [ ] Test navigation

---

#### Step 5.3: Update NavigationDrawer (Admin)
**File:** `frontend/src/components/admin/NavigationDrawer.tsx`

**Tasks:**
- [ ] Update to use adminNavRoutes
- [ ] Ensure paths match new structure
- [ ] Test mobile drawer

---

#### Step 5.4: Update Client Navbar
**File:** `frontend/src/components/client/Navbar.tsx`

**Tasks:**
- [ ] Verify publicNavRoutes usage
- [ ] Check all links working
- [ ] Test search functionality
- [ ] Test drawer opening

---

#### Step 5.5: Update Client Footer
**File:** `frontend/src/components/client/Footer.tsx`

**Tasks:**
- [ ] Verify navigation links
- [ ] Test footer links
- [ ] Check responsive design

---

### **Phase 6: Implement Login Page** 🔑

#### Step 6.1: Create Login UI
**File:** `frontend/src/pages/client/LoginPage.tsx`

**Status:** Currently empty, needs implementation

**Required Features:**
1. Email input
2. Password input
3. Form validation
4. Error handling
5. Loading state
6. Redirect after login

**Tasks:**
- [ ] Create form UI
- [ ] Add useState for form fields
- [ ] Import useAuth hook
- [ ] Implement handleSubmit
- [ ] Add error display
- [ ] Add loading state
- [ ] Test login flow
- [ ] Test error states

**Full code provided in previous response**

---

### **Phase 7: Backend Auth API** 🔒

#### Step 7.1: Create User Model
**File:** `backend/models/user.js`

**Tasks:**
- [ ] Create User schema
- [ ] Add email field (unique)
- [ ] Add password field (hashed)
- [ ] Add role field (admin/user)
- [ ] Add timestamps

**Schema:**
```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});
```

---

#### Step 7.2: Create Auth Routes
**File:** `backend/routes/authRoutes.js`

**Endpoints to create:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

**Tasks:**
- [ ] Install dependencies (bcrypt, jsonwebtoken)
- [ ] Create auth routes file
- [ ] Implement register endpoint
- [ ] Implement login endpoint
- [ ] Implement token generation
- [ ] Add auth middleware
- [ ] Register routes in server.js

**Dependencies:**
```bash
cd backend
npm install bcrypt jsonwebtoken
```

---

#### Step 7.3: Create Auth Middleware
**File:** `backend/middleware/auth.js`

**Tasks:**
- [ ] Create middleware folder
- [ ] Create auth middleware
- [ ] Verify JWT token
- [ ] Attach user to request
- [ ] Handle errors

---

#### Step 7.4: Protect Admin Routes

**Tasks:**
- [ ] Add auth middleware to admin routes
- [ ] Add role checking
- [ ] Test protected routes
- [ ] Update frontend to send token

---

### **Phase 8: Frontend Auth Service** 🌐

#### Step 8.1: Create Auth Service
**File:** `frontend/src/services/authService.ts`

**Tasks:**
- [ ] Create authService.ts
- [ ] Add login function
- [ ] Add register function
- [ ] Add logout function
- [ ] Add token management
- [ ] Update axios interceptors

**Example:**
```typescript
import api from './api';
import { ENDPOINTS } from './endpoints';

export const login = async (email: string, password: string) => {
  const response = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return user;
};

export const register = async (email: string, password: string, name: string) => {
  const response = await api.post(ENDPOINTS.AUTH.REGISTER, { email, password, name });
  return response.data;
};
```

---

#### Step 8.2: Update Axios Instance
**File:** `frontend/src/services/api.ts`

**Tasks:**
- [ ] Add request interceptor for token
- [ ] Add response interceptor for errors
- [ ] Handle 401 errors (logout)
- [ ] Test token sending

---

### **Phase 9: Testing & Debugging** 🧪

#### Step 9.1: Manual Testing

**Public Routes:**
- [ ] Navigate to home page
- [ ] Click on promo link
- [ ] Click on help link
- [ ] Test mobile menu
- [ ] Test footer links

**Login Flow:**
- [ ] Navigate to /login
- [ ] Try login without credentials (should show error)
- [ ] Try login with wrong credentials (should show error)
- [ ] Login with correct credentials
- [ ] Should redirect to /admin

**Admin Routes:**
- [ ] Access /admin without login (should redirect to /login)
- [ ] Login and access /admin (should show admin dashboard)
- [ ] Test all admin navigation links
- [ ] Test admin drawer on mobile
- [ ] Test logout

**Protected Routes:**
- [ ] Try accessing /profile without login
- [ ] Login and access /profile
- [ ] Logout and verify redirect

---

#### Step 9.2: Fix Common Issues

**Issue 1: Routes not working**
- Check BrowserRouter is wrapping everything
- Verify route paths match exactly
- Check for trailing slashes

**Issue 2: Auth not working**
- Check AuthProvider is wrapping app
- Verify useAuth hook usage
- Check localStorage for user data

**Issue 3: Layout not rendering**
- Check Outlet component is present
- Verify layout imports
- Check component paths

**Issue 4: Components not found**
- Verify all imports are correct
- Check file names (case-sensitive)
- Run `pnpm install` again

---

### **Phase 10: Final Polish** ✨

#### Step 10.1: Code Cleanup

**Tasks:**
- [ ] Remove console.logs
- [ ] Remove unused imports
- [ ] Remove commented code
- [ ] Format code consistently
- [ ] Run ESLint and fix issues

**Commands:**
```bash
cd frontend
pnpm lint
pnpm build
```

---

#### Step 10.2: Documentation

**Tasks:**
- [ ] Update README files
- [ ] Add JSDoc comments to functions
- [ ] Document environment variables
- [ ] Add API documentation
- [ ] Create deployment guide

---

#### Step 10.3: Performance Optimization

**Tasks:**
- [ ] Add lazy loading for routes
- [ ] Optimize images
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Add code splitting

---

## 🎯 Quick Start Checklist

Follow these steps in order for fastest implementation:

### **Day 1: Foundation**
- [ ] 1. Create auth types (`types/auth.ts`)
- [ ] 2. Create AuthContext (`contexts/AuthContext.tsx`)
- [ ] 3. Create ProtectedRoute (`components/common/ProtectedRoute.tsx`)
- [ ] 4. Update App.tsx with routing
- [ ] 5. Test basic routing

### **Day 2: Layouts**
- [ ] 6. Update PublicLayout
- [ ] 7. Update AdminLayout
- [ ] 8. Move common components (Spacer, Dialog)
- [ ] 9. Update component imports
- [ ] 10. Test layouts

### **Day 3: Components**
- [ ] 11. Update Admin Navbar (add logout)
- [ ] 12. Update NavigationRail
- [ ] 13. Update NavigationDrawer
- [ ] 14. Update Client components
- [ ] 15. Test all navigation

### **Day 4: Login & Auth**
- [ ] 16. Implement LoginPage
- [ ] 17. Create backend User model
- [ ] 18. Create auth routes (backend)
- [ ] 19. Create auth service (frontend)
- [ ] 20. Test login flow

### **Day 5: Testing & Polish**
- [ ] 21. Test all routes
- [ ] 22. Test authentication
- [ ] 23. Fix any bugs
- [ ] 24. Code cleanup
- [ ] 25. Documentation

---

## 📊 Progress Tracking

**Total Tasks:** 100+  
**Completed:** 15 (15%)  
**In Progress:** 5 (5%)  
**Remaining:** 80 (80%)

**Estimated Time:** 5-7 days for full implementation

---

## 🆘 Troubleshooting

### Common Errors

**Error: Cannot find module**
```bash
# Solution: Check import paths and file names
# Run: pnpm install
```

**Error: useAuth is not defined**
```bash
# Solution: Ensure AuthProvider wraps your app
# Check: App.tsx has <AuthProvider>
```

**Error: Routes not matching**
```bash
# Solution: Check exact paths in routes.tsx
# Verify: BrowserRouter is used (not HashRouter)
```

**Error: Build fails**
```bash
# Solution: Check for TypeScript errors
# Run: tsc --noEmit
```

---

## 📞 Need Help?

- Check the main README.md
- Review component examples
- Test in small increments
- Use browser DevTools
- Check console for errors

---

**Good luck with implementation! 🚀**
