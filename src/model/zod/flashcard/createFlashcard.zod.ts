import { z } from "zod";

export const FlashcardFormSchema = z.object({
  hint: z.string().min(1, "Field is required"),
  word: z.string().min(1, "Field is required"),
  definition: z.string().min(1, "Field is required"),
  pronunciation: z.string().min(1, "Field is required"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
});

export type FlashcardForm = z.infer<typeof FlashcardFormSchema>;
