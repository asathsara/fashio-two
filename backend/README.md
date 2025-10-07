# 🚀 Fashio Backend API

Node.js + Express + MongoDB backend for the Fashio e-commerce platform. Provides RESTful APIs for product management, categories, images, and promotions.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

---

## 📁 Project Structure

```
backend/
├── models/              # MongoDB schemas
│   ├── category.js     # Category model
│   ├── image.js        # Image model
│   ├── item.js         # Item/Product model
│   └── promo.js        # Promo model
├── routes/              # API routes
│   ├── categoryRoutes.js
│   ├── imageRoutes.js
│   ├── itemRoute.js
│   └── promoRoutes.js
├── uploads/             # Static file storage
│   ├── items/          # Product images
│   └── slider/         # Slider images
├── .env                 # Environment variables
├── server.js            # Express server entry point
└── package.json
```

---

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/fashio

# JWT Authentication (for future implementation)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
# 5MB = 5 * 1024 * 1024 bytes
```

---

## 📡 API Endpoints

### **Categories**

#### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Men",
    "subcategories": ["Shirts", "Pants", "Shoes"]
  }
]
```

#### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Women",
  "subcategories": ["Dresses", "Tops", "Accessories"]
}
```

#### Update Category
```http
PUT /api/categories/:id
Content-Type: application/json

{
  "name": "Updated Category Name",
  "subcategories": ["Sub1", "Sub2"]
}
```

#### Delete Category
```http
DELETE /api/categories/:id
```

---

### **Items (Products)**

#### Get All Items
```http
GET /api/items
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Classic T-Shirt",
    "description": "Comfortable cotton t-shirt",
    "price": 29.99,
    "category": "Men",
    "subcategory": "Shirts",
    "sizes": ["S", "M", "L", "XL"],
    "urls": ["image1.jpg", "image2.jpg"],
    "createdAt": "2025-01-10T10:30:00Z"
  }
]
```

#### Get Item by ID
```http
GET /api/items/:id
```

#### Create Item
```http
POST /api/items
Content-Type: multipart/form-data

name: Classic T-Shirt
description: Comfortable cotton t-shirt
price: 29.99
category: Men
subcategory: Shirts
sizes: ["S", "M", "L"]
images: [file1, file2, file3, file4]
```

#### Update Item
```http
PUT /api/items/:id
Content-Type: multipart/form-data

name: Updated Name
price: 34.99
# ... other fields
```

#### Delete Item
```http
DELETE /api/items/:id
```

---

### **Images (Slider)**

#### Get All Slider Images
```http
GET /api/images
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "url": "slide_one.jpg",
    "createdAt": "2025-01-10T10:30:00Z"
  }
]
```

#### Upload Slider Image
```http
POST /api/images
Content-Type: multipart/form-data

image: [file]
```

#### Delete Slider Image
```http
DELETE /api/images/:id
```

---

### **Promos**

#### Get All Promos
```http
GET /api/promos
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Summer Sale",
    "discountPercentage": 25,
    "startDate": "2025-06-01",
    "endDate": "2025-08-31",
    "items": ["itemId1", "itemId2"]
  }
]
```

#### Create Promo
```http
POST /api/promos
Content-Type: application/json

{
  "name": "Summer Sale",
  "discountPercentage": 25,
  "startDate": "2025-06-01",
  "endDate": "2025-08-31",
  "items": ["itemId1", "itemId2"]
}
```

#### Delete Promo
```http
DELETE /api/promos/:id
```

---

## 💾 Database Models

### **Category Model**
```javascript
{
  name: { type: String, required: true, unique: true },
  subcategories: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}
```

### **Item Model**
```javascript
{
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  sizes: [{ type: String }],
  urls: [{ type: String }],
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}
```

### **Image Model**
```javascript
{
  url: { type: String, required: true },
  type: { type: String, default: 'slider' },
  createdAt: { type: Date, default: Date.now }
}
```

### **Promo Model**
```javascript
{
  name: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  createdAt: { type: Date, default: Date.now }
}
```

---

## 📦 Dependencies

### **Production**
- `express` (^4.21.2) - Web framework
- `mongoose` (^8.18.2) - MongoDB ODM
- `multer` (^1.4.5) - File upload handling
- `cors` (^2.8.5) - Cross-origin resource sharing
- `dotenv` (^16.4.7) - Environment variables

### **Development**
- `nodemon` - Auto-reload on file changes (optional)

---

## 🗄️ Database Setup

### **Install MongoDB**

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Or use Chocolatey
choco install mongodb
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
```

### **Start MongoDB**
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### **Create Database**
```bash
# Connect to MongoDB
mongosh

# Create database
use fashio

# Verify
show dbs
```

---

## 📤 File Upload Configuration

### **Multer Settings**
- **Max file size:** 5MB per file
- **Allowed formats:** JPG, JPEG, PNG, GIF, WEBP
- **Storage:** Local disk storage in `uploads/` directory

### **Upload Directories**
- `uploads/items/` - Product images (up to 4 per item)
- `uploads/slider/` - Homepage slider images

### **Access Uploaded Files**
```
http://localhost:5000/uploads/items/filename.jpg
http://localhost:5000/uploads/slider/filename.jpg
```

---

## 🔐 CORS Configuration

Currently configured to allow all origins:
```javascript
app.use(cors());
```

For production, restrict to specific origins:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

---

## 🛡️ Security (TODO)

### **Planned Security Features**
- [ ] JWT Authentication
- [ ] Password hashing with bcrypt
- [ ] Rate limiting
- [ ] Input validation with express-validator
- [ ] Helmet.js for security headers
- [ ] XSS protection
- [ ] SQL injection prevention (MongoDB already prevents this)

---

## 🧪 Testing

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 📊 API Response Format

### **Success Response**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### **Error Response**
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

---

## 🐛 Error Handling

The API uses standard HTTP status codes:

- `200` - OK (Success)
- `201` - Created (Resource created)
- `400` - Bad Request (Invalid input)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error (Server error)

---

## 🚀 Deployment

### **Prepare for Production**

1. **Set environment variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fashio
   ```

2. **Use process manager**
   ```bash
   npm install -g pm2
   pm2 start server.js --name fashio-backend
   ```

3. **Enable monitoring**
   ```bash
   pm2 monit
   ```

### **Deploy to Heroku**
```bash
heroku create fashio-backend
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### **Deploy to Railway/Render**
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

---

## 📝 Development Workflow

### **Adding a New API Endpoint**

1. **Create/Update Model** (`models/`)
   ```javascript
   const newSchema = new mongoose.Schema({
     // Define schema
   });
   module.exports = mongoose.model('ModelName', newSchema);
   ```

2. **Create Route Handler** (`routes/`)
   ```javascript
   const express = require('express');
   const router = express.Router();
   
   router.get('/', async (req, res) => {
     // Handle GET request
   });
   
   module.exports = router;
   ```

3. **Register Route** (`server.js`)
   ```javascript
   const newRoutes = require('./routes/newRoutes');
   app.use('/api/new', newRoutes);
   ```

---

## 🔄 Scripts

```json
{
  "dev": "node --watch server.js",    // Development with auto-reload
  "start": "node server.js",          // Production start
  "test": "jest",                     // Run tests (when configured)
  "seed": "node seed.js"              // Seed database (create this file)
}
```

---

## 📖 Best Practices

1. **Always validate input data**
2. **Use try-catch blocks for async operations**
3. **Return appropriate status codes**
4. **Log errors for debugging**
5. **Use environment variables for sensitive data**
6. **Implement proper error handling**
7. **Document API changes**

---

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

ISC License - See main project README

---

Made with 🚀 Node.js + Express + MongoDB
