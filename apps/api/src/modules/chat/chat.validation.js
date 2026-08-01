import { z } from "zod";

export const askQuestionSchema = z.object({
  question: z.string().min(1, "Question is required").max(2000),
  sessionId: z.string().uuid().optional(),
});