import prisma from "@/lib/db/db";
import { Game, Level } from "@prisma/client";
import { conversationService } from "./conversation.service";
import { flashcardService } from "./flashcard.service";
import { PrivateError } from "@/model/trpc/privateError";

const createSinglePlayerGame = async (
  userId: string,
  level: Level
): Promise<Game> => {
  const conversation = await conversationService.createConversation(userId);

  if (!conversation) {
    throw new PrivateError("Error creating conversation");
  }

  const randomFlashcard = await flashcardService.getRandomFlashcard(level);

  if (!randomFlashcard) {
    throw new PrivateError("Error getting random flashcard");
  }

  const game = await prisma.game.create({
    data: {
      conversationId: conversation.id,
      flashcardId: randomFlashcard.id,
      userId,
      status: "IN_PROGRESS",
      mode: "SINGLE_PLAYER"
    }
  });

  if (!game) {
    throw new PrivateError("Error creating game");
  }

  return game;
};

export const playService = {
  createSinglePlayerGame
};