import prisma from "@/lib/db/db";
import { PrivateError } from "@/model/trpc/privateError";
import { Conversation, MessageSender } from "@prisma/client";

const createConversation = async (userId: string): Promise<Conversation> => {
  const conversation = await prisma.conversation.create({
    data: {
      userId
    }
  });

  return conversation;
};

const createMessage = async (
  gameId: string,
  sender: MessageSender,
  content: string
) => {
  const game = await prisma.game.findFirst({
    where: {
      id: gameId
    },
    include: {
      conversation: true
    }
  });

  if (!game) {
    throw new PrivateError("Game not found");
  }

  const message = await prisma.message.create({
    data: {
      conversationId: game.conversation.id,
      sender,
      content
    }
  });

  return message;
};

export const conversationService = {
  createConversation,
  createMessage
};
