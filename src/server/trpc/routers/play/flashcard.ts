import { PublicError } from "@/model/trpc/publicError";
import { FlashcardFormSchema } from "@/model/zod/flashcard/createFlashcard.zod";
import { flashcardService } from "@/server/services/flashcard.service";
import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const flashcardRouter = router({
  createFlashcard: protectedProcedure
    .input(FlashcardFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await flashcardService.createFlashcard({
          flashcardData: input,
          userId: ctx.session?.user.userId
        });
      } catch (error) {
        console.error(error);
        if (error instanceof PublicError) {
          throw error;
        }
        throw new Error("Error creating flashcard");
      }
    }),
  deleteFlashcard: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      try {
        if (
          ctx.session.user.role !== "ADMIN" &&
          ctx.session.user.role !== "MODERATOR"
        ) {
          throw new PublicError("You are not authorized to delete flashcards");
        }
        await flashcardService.deleteFlashcard(input);
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting flashcard");
      }
    })
});
