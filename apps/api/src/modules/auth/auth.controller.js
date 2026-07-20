import { registerSchema, loginSchema } from "./auth.validation.js";
import { registerUser } from "./auth.service.js";

export async function register(req, res, next) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const result = await registerUser(parsed.data);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}