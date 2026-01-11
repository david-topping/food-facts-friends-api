import express from "express";
import { registerRoutes } from "./routes";

export const app = express();

const API_BASE_PATH = process.env.API_BASE_PATH || "";
console.log(API_BASE_PATH);
app.use(express.json());
const router = express.Router();
registerRoutes(router);
app.use(API_BASE_PATH, router);
