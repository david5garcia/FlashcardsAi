import prisma from "@/lib/db/db";
import { FlashcardForm } from "@/model/zod/flashcard/createFlashcard.zod";
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

const getFlashcardsByUser = async (userId: string): Promise<Flashcard[]> => {
  return await prisma.flashcard.findMany({
    where: {
      userId: userId
    }
  });
};

const createFlashcard = async ({
  flashcardData,
  userId
}: {
  flashcardData: FlashcardForm;
  userId: string;
}): Promise<Flashcard> => {
  return await prisma.flashcard.create({
    data: {
      userId,
      word: flashcardData.word,
      hint: flashcardData.hint,
      definition: flashcardData.definition,
      pronunciation: flashcardData.pronunciation,
      level: flashcardData.level
    }
  });
};

const deleteFlashcard = async (flashcardId: number): Promise<void> => {
  await prisma.flashcard.delete({
    where: {
      id: flashcardId
    }
  });
};

export const flashcardService = {
  getRandomFlashcard,
  getFlashcardsByUser,
  createFlashcard,
  deleteFlashcard
};
