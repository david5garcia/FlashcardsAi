import { registerRouter } from "./routers/auth/register";
import { playRouter } from "./routers/play/play";
import { router } from "./trpc";

export const appRouter = router({
  register: registerRouter,
  play: playRouter
});

export type AppRouter = typeof appRouter;
