import { z } from "zod";

const loginFormZod = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required")
});

export default loginFormZod;

export type LoginForm = z.infer<typeof loginFormZod>;
