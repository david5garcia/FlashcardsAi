import { registerRouter } from "./routers/auth/register";
import { userRouter } from "./routers/auth/user";
import { conversationRouter } from "./routers/play/conversation";
import { playRouter } from "./routers/play/play";
import { router } from "./trpc";

export const appRouter = router({
  register: registerRouter,
  play: playRouter,
  conversation: conversationRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;
