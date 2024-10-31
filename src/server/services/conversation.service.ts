import prisma from "@/lib/db/db";
import { Conversation } from "@prisma/client";

const createConversation = async (userId: string): Promise<Conversation> => {
  const conversation = await prisma.conversation.create({
    data: {
      userId
    }
  });

  return conversation;
};

export const conversationService = {
  createConversation
};