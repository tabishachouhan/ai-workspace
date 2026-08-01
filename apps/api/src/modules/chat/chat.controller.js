import { askQuestionSchema } from "./chat.validation.js";
import { askQuestion } from "./chat.service.js";

export async function ask(req, res, next) {
  try {
    const parsed = askQuestionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const result = await askQuestion(req.user.id, req.params.projectId, parsed.data);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}