import express from "express";
import { registerRoutes } from "./routes";
import { errorHandler } from "./errorHandler";

export const app = express();

const API_BASE_PATH = process.env.API_BASE_PATH || "";

app.use(express.json());

const router = express.Router();
registerRoutes(router);

app.use(API_BASE_PATH, router);
app.use(errorHandler);
