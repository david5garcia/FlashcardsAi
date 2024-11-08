import { z } from "zod";

const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const registerFormZod = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(
        passwordRequirements,
        "Password must contain at least one lowercase, uppercase letter and one number"
      ),
    confirmPassword: z.string().min(8).max(20)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export default registerFormZod;

export type RegisterForm = z.infer<typeof registerFormZod>;
