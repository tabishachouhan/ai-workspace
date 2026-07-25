import { Router } from "express";
import { register, login, refresh } from "./auth.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { prisma } from "../../lib/prisma.js";
import { sanitizeUser, issueTokens } from "./auth.service.js";
import passport from "../../config/passport.js";
import { env } from "../../config/env.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

router.get("/me", authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/google",
  passport.authenticate("google", { session: false, scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${env.clientUrl}/login?error=oauth_failed` }),
  async (req, res, next) => {
    try {
      const tokens = await issueTokens(req.user);
      const redirectUrl = new URL(`${env.clientUrl}/oauth/callback`);
      redirectUrl.searchParams.set("accessToken", tokens.accessToken);
      redirectUrl.searchParams.set("refreshToken", tokens.refreshToken);
      res.redirect(redirectUrl.toString());
    } catch (err) {
      next(err);
    }
  }
);

export default router;

