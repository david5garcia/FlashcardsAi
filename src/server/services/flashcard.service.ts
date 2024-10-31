import prisma from "@/lib/db/db";
import { Flashcard, Level } from "@prisma/client";

const getRandomFlashcard = async (level: Level): Promise<Flashcard> => {
  const totalNumberOfFlashcards = await prisma.flashcard.count({
    where: {
      level: level
    }
  });

  const randomOffset = Math.floor(Math.random() * totalNumberOfFlashcards);

  const randomFlashCards = await prisma.flashcard.findMany({
    where: {
      level: level
    },
    take: 1,
    skip: randomOffset
  });

  return randomFlashCards[0];
};

export const flashcardService = {
  getRandomFlashcard
};
