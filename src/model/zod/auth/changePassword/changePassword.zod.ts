import { z } from "zod";
import { passwordSchema } from "../register/registerForm.zod";

export const ChangePasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
    token: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });
export type ChangePasswordForm = z.infer<typeof ChangePasswordFormSchema>;
