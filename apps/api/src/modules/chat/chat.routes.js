import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { ask } from "./chat.controller.js";

const router = Router();

router.post("/projects/:projectId/chat", authenticate, ask);

export default router;