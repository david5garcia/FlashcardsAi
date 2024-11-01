import { PublicError } from "@/model/trpc/publicError";
import { playService } from "@/server/services/play.service";
import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const playRouter = router({
  createSinglePlayerGame: publicProcedure
    .input(
      z.object({
        level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
        userId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const game = await playService.createSinglePlayerGame(
          input.userId,
          input.level
        );
        return { game };
      } catch (error) {
        console.error(error);
        if (error instanceof PublicError) {
          throw error;
        }
        throw new Error("Error creating game");
      }
    }),
  setGameStatus: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
        status: z.enum(["IN_PROGRESS", "COMPLETED"])
      })
    )
    .mutation(async ({ input }) => {
      try {
        await playService.setGameStatus(input.gameId, input.status);
      } catch (error) {
        console.error(error);
        if (error instanceof PublicError) {
          throw error;
        }
        throw new Error("Error setting game status");
      }
    })
});
