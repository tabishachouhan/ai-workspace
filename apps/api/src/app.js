import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import passport from "./config/passport.js";
import projectRoutes from "./modules/projects/projects.routes.js";
import documentRoutes from "./modules/documents/documents.routes.js";
import chatRoutes from "./modules/chat/chat.routes.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(passport.initialize());
app.use("/api", documentRoutes);
app.use("/api", chatRoutes);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorHandler);

export default app;