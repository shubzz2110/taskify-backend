require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "node:http";
import config from "./config/config";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import connectToFirebase from "./config/firebase";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import sectionRoutes from "./routes/section";
import taskRoutes from "./routes/task";
import boardRoutes from "./routes/board";

const PORT = config.port || 5000;

// App and server initialization
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://taskify-backend-aq8n.onrender.com",
      "https://taskify-frontend-az4c.onrender.com/",
    ],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable parsing of cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/task", taskRoutes);

server.listen(PORT, () => {
  connectToDatabase();
  connectToFirebase();
  console.log(`Server running on http://localhost:${PORT}`);
});
