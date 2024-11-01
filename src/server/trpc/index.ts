import { registerRouter } from "./routers/auth/register";
import { conversationRouter } from "./routers/play/conversation";
import { playRouter } from "./routers/play/play";
import { router } from "./trpc";

export const appRouter = router({
  register: registerRouter,
  play: playRouter,
  conversation: conversationRouter
});

export type AppRouter = typeof appRouter;
