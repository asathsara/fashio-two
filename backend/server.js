import express from "express";
import { connect } from "mongoose";
import cors from "cors";

import imageRoutes from "./routes/imageRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";
import itemRoutes from "./routes/itemRoute.js";

import dotenv from "dotenv";
dotenv.config();


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
app.use("/api/images", imageRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/items", itemRoutes);

// Serve static files
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
