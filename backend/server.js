const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
const imageRoutes = require("./routes/imageRoutes");
app.use("/api/images", imageRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

const promoRoutes = require("./routes/promoRoutes");
app.use("/api/promos", promoRoutes);

const itemRoutes = require("./routes/itemRoute");
app.use("/api/items", itemRoutes);

// Serve static files
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
