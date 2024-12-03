import { registerRouter } from "./routers/auth/register";
import { userRouter } from "./routers/auth/user";
import { conversationRouter } from "./routers/play/conversation";
import { flashcardRouter } from "./routers/play/flashcard";
import { playRouter } from "./routers/play/play";
import { router } from "./trpc";

export const appRouter = router({
  register: registerRouter,
  play: playRouter,
  conversation: conversationRouter,
  user: userRouter,
  flashcard: flashcardRouter
});

export type AppRouter = typeof appRouter;
