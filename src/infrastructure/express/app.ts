import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { errorHandler } from "./errorHandler";

export const app = express();

const API_BASE_PATH = process.env.API_BASE_PATH || "";

const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked origin: ${origin}`), false);
    },
    credentials: true,
  })
);

app.use(express.json());

const router = express.Router();
registerRoutes(router);

app.use(API_BASE_PATH, router);
app.use(errorHandler);
