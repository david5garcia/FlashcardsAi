import { registerRouter } from "./routers/auth/register";
import { router } from "./trpc";

export const appRouter = router({
  register: registerRouter
});

export type AppRouter = typeof appRouter;
