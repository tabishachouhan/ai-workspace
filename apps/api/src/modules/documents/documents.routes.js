import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { upload as uploadMiddleware } from "../../config/multer.js";
import { upload, list, getOne, remove } from "./documents.controller.js";

const router = Router();

router.post("/projects/:projectId/documents", authenticate, uploadMiddleware.single("file"), upload);
router.get("/projects/:projectId/documents", authenticate, list);
router.get("/documents/:id", authenticate, getOne);
router.delete("/documents/:id", authenticate, remove);

export default router;