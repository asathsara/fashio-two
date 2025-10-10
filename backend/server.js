import express from "express";
import { connect } from "mongoose";
import cors from "cors";
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
import imageRoutes from "./routes/imageRoutes";
app.use("/api/images", imageRoutes);

import categoryRoutes from "./routes/categoryRoutes";
app.use("/api/categories", categoryRoutes);

import promoRoutes from "./routes/promoRoutes";
app.use("/api/promos", promoRoutes);

import itemRoutes from "./routes/itemRoute";
app.use("/api/items", itemRoutes);

// Serve static files
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
