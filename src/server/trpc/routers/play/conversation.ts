import { PublicError } from "@/model/trpc/publicError";
import { conversationService } from "@/server/services/conversation.service";
import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const conversationRouter = router({
  createMessage: publicProcedure
    .input(
      z.object({
        content: z.string(),
        gameId: z.string(),
        sender: z.enum(["USER", "BOT"])
      })
    )
    .mutation(async ({ input }) => {
      try {
        const game = await conversationService.createMessage(
          input.gameId,
          input.sender,
          input.content
        );
      } catch (error) {
        console.error(error);
        if (error instanceof PublicError) {
          throw error;
        }
        throw new Error("Error creating message");
      }
    })
});
