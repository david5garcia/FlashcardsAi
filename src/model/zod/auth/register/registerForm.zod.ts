import { z } from "zod";

const registerFormZod = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export default registerFormZod;

export type RegisterForm = z.infer<typeof registerFormZod>;
