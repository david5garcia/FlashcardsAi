import prisma from "@/lib/db/db";
import { PublicError } from "@/model/trpc/publicError";
import { playService } from "@/server/services/play.service";
import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const playRouter = router({
  createSinglePlayerGame: protectedProcedure
    .input(
      z.object({
        level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
        userId: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = ctx.session.user.userId;
        const user = await prisma.user.findUnique({
          where: {
            id: userId
          }
        });
        if (!user) {
          throw new PublicError("User not found");
        }
        if (!user.verified) {
          throw new PublicError("User not verified, please verify your email");
        }
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
  setGameStatus: protectedProcedure
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
