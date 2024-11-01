import { conversationService } from "@/server/services/conversation.service";
import { MessageSender } from "@prisma/client";
import { OpenAIStream } from "ai";
import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request, res: Response) {
  const reqJson = await req.json();
  console.log("req:", reqJson);

  const { messages, flashcardData, gameData } = reqJson;

  await conversationService.createMessage(
    gameData.id,
    MessageSender.USER,
    messages.slice(-1)[0].content
  );

  const oaiResponse = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are the FlashcardAi bot, a chat assistant in a flashcard game that is focused on users having fun and learning English. The user is a human trying to guess the following word: ${flashcardData.word}, with this definition: ${flashcardData.definition} (never give them the definition). The hint provided to them is: ${flashcardData.hint}. You can only answer with simple answers, like "Yes", "No", "Maybe", "Not sure", etc. Also, if you detect that the question has mistakes, like grammar or incorrect words, you should correct them. If the user asks an unrelated question, you should remind them of the game.`
      },
      ...messages
    ],
    stream: true
  });

  const stream = OpenAIStream(oaiResponse, {
    onCompletion: async (message) => {
      await conversationService.createMessage(
        gameData.id,
        MessageSender.BOT,
        message
      );
    }
  });

  return new Response(stream);
}
