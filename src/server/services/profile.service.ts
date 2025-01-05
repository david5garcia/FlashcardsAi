import { MessageSender, Prisma } from "@prisma/client";
import prisma from "@/lib/db/db";

export type GameData = Prisma.GameGetPayload<{
  include: {
    conversation: {
      select: {
        _count: {
          select: {
            messages: {
              where: {
                sender: "USER";
              };
            };
          };
        };
      };
    };
    flashcard: true;
  };
}>[];

const getProfileData = async (userId: string): Promise<GameData> => {
  const gameData = await prisma.game.findMany({
    where: {
      userId: String(userId)
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      conversation: {
        select: {
          _count: {
            select: {
              messages: {
                where: {
                  sender: MessageSender.USER
                }
              }
            }
          }
        }
      },
      flashcard: true
    }
  });

  return gameData;
};

export const profileService = {
  getProfileData
};
