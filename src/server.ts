require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "node:http";
import config from "./config/config";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";

import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import connectToFirebase from "./config/firebase";

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
    ],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable parsing of cookies
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

server.listen(PORT, () => {
  connectToDatabase();
  connectToFirebase()
  console.log(`Server running on http://localhost:${PORT}`);
});
