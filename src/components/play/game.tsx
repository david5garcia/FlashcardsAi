"use client";
import { Flashcard, Game as GamePrisma, Message } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import Chat from "./chat";
import "./css/game.css";
import { useRouter } from "next/navigation";
import Button from "../shared/button";

const Game = ({
  flashcard,
  game,
  conversation
}: {
  flashcard: Flashcard;
  game: GamePrisma;
  conversation: { messages: Message[] };
}) => {
  const [gameOver, setGameOver] = useState(game.status === "COMPLETED");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-1 flex-1">
      <div
        className={`card w-[380px] h-[200px] max-w-[100%] ${
          gameOver && "card-turn"
        }`}
      >
        <div className="card__content text-center relative p-20 transition-transform duration-1000 font-bold">
          <div className="card__front absolute w-[380px] h-[200px] max-w-[100%] px-12 py-4 top-0 bottom-0 right-0 left-0 p-8 bg-[#ffffffe6] flex flex-col items-center justify-center rounded-lg gap-5">
            <h3 className="text-sm">Can you guess?</h3>
            <p className="font-medium text-md">
              Hint: <i className="font-normal">{flashcard.hint}</i>
            </p>
          </div>
          <div className="card__back absolute w-[380px] h-[200px] max-w-[100%] px-12 py-4 top-0 bottom-0 right-0 left-0 p-8 bg-[#ffffffe6] flex flex-col items-center rounded-lg justify-evenly">
            <h3 className="text-md">{flashcard.word}</h3>
            {flashcard.image && (
              <Image
                src={flashcard.image}
                alt={flashcard.word}
                width={100}
                height={100}
                objectFit="cover"
                className="rounded-lg"
              />
            )}
            <p className="font-medium text-sm">
              <i className="font-normal">{flashcard.definition}</i>
            </p>
            <p className="text-sm">{flashcard.pronunciation}</p>
          </div>
        </div>
      </div>
      <Chat
        game={game}
        flashcard={flashcard}
        gameOver={gameOver}
        setGameOver={setGameOver}
        conversation={conversation}
      />
      {gameOver && (
        <Button className="btn btn-primary mb-10" onClick={() => router.push("/play")}>
          Play Again
        </Button>
      )}
    </div>
  );
};

export default Game;
