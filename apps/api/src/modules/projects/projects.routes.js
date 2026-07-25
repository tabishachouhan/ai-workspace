import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { create, list, getOne, update, remove } from "./projects.controller.js";

const router = Router();

router.use(authenticate); // every route below requires a logged-in user

router.post("/", create);
router.get("/", list);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;