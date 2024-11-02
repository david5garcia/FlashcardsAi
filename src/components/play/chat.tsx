"use client";
import { trpc } from "@/app/_trpc/client";
import { Flashcard, Game, Message } from "@prisma/client";
import { useChat } from "ai/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Card from "../shared/card";

const checkIfCorrect = (message: string, word: string) => {
  return message.toLowerCase().includes(word.toLowerCase());
};

const Chat = ({
  game,
  flashcard,
  gameOver,
  setGameOver,
  conversation
}: {
  game: Game;
  flashcard: Flashcard;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  conversation: { messages: Message[] };
}) => {
  const gameStatusMutation = trpc.play.setGameStatus.useMutation();
  const messageMutation = trpc.conversation.createMessage.useMutation();

  const setGameStatusCompleted = async () => {
    await gameStatusMutation.mutateAsync({
      gameId: game.id,
      status: "COMPLETED"
    });
  };

  const addFinalMessages = async (userInput: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length.toString(),
        role: "user",
        content: userInput
      },
      {
        id: prev.length.toString() + 1,
        role: "assistant",
        content: `Congratulations! You guessed the word: ${flashcard.word}`
      }
    ]);
    messageMutation.mutate({
      gameId: game.id,
      sender: "USER",
      content: userInput
    });
    messageMutation.mutate({
      gameId: game.id,
      sender: "BOT",
      content: `Congratulations! You guessed the word: ${flashcard.word}`
    });
  };

  const gameCompleted = (userInput: string) => {
    setGameOver(true);
    setInput("");
    setGameStatusCompleted();
    addFinalMessages(userInput);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userInput = formData.get("input-field") as string;

    if (checkIfCorrect(userInput, flashcard.word)) {
      return gameCompleted(userInput);
    }

    handleSubmit(e);
  };

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit
  } = useChat({
    api: "/api/openai",
    initialMessages: [
      {
        id: "0",
        role: "assistant",
        content:
          "Hello! I'm the FlashcardAi bot. I'm here to help you guess the word. You can ask me yes or no questions."
      }
    ],
    body: {
      flashcardData: {
        word: flashcard.word,
        definition: flashcard.definition,
        hint: flashcard.hint
      },
      gameData: {
        id: game.id
      }
    }
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      messagesContainerRef.current as HTMLDivElement;
    if (scrollHeight >= scrollTop + offsetHeight) {
      messagesContainerRef.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    setMessages((prev) => [
      ...prev,
      ...conversation.messages.map((message) => ({
        id: String(message.id),
        role:
          message.sender === "USER"
            ? "user"
            : ("assistant" as "user" | "assistant"),
        content: message.content
      }))
    ]);
  }, []);

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div
        ref={messagesContainerRef}
        className="pr-10 pl-5 py-5 flex flex-col gap-3 overflow-scroll text-sm"
      >
        {messages.map((m, index) => (
          <div key={m.id} className={`flex justify-center items-center`}>
            <Image
              className="avatar"
              alt="avatar"
              src={m.role === "user" ? "/images/human.png" : "/images/bot.png"}
              width={35}
              height={35}
            />
            <div style={{ width: "100%", marginLeft: "16px" }}>
              <p className="message">{m.content}</p>
              {index < messages.length - 1 && (
                <div className="horizontal-line" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Card
        className={`flex flex-col justify-between p-5 w-[100%] max-w-[500px] flex-1 mb-8`}
        style={{ height: "inherit" }}
      >
        {renderResponse()}
        <form onSubmit={onSubmit} className="relative">
          <input
            name="input-field"
            type="text"
            placeholder="Say anything"
            onChange={handleInputChange}
            value={input}
            className="w-full p-2 border-2 border-gray-200 rounded-lg"
            disabled={gameOver}
          />
          <button type="submit" className="absolute right-2 top-1">
            <Image
              src="/images/send.png"
              alt="Send image"
              width={35}
              height={35}
            ></Image>
          </button>
        </form>
      </Card>
    </>
  );
};

export default Chat;
