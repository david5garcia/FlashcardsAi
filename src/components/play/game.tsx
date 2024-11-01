"use client";
import { Flashcard, Game as GamePrisma, Message } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import Chat from "./chat";
import "./css/game.css";

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

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`card w-[450px] h-[250px] max-w-[100%] ${
          gameOver && "card-turn"
        }`}
      >
        <div className="card__content text-center relative p-20 transition-transform duration-1000 font-bold">
          <div className="card__front absolute w-[450px] h-[250px] max-w-[100%] px-12 py-4 top-0 bottom-0 right-0 left-0 p-8 bg-white flex flex-col items-center justify-center rounded-lg gap-5">
            <h3>Can you guess?</h3>
            <p className="font-medium text-xl">
              Hint: <i className="font-normal">{flashcard.hint}</i>
            </p>
          </div>
          <div className="card__back absolute w-[450px] h-[250px] max-w-[100%] px-12 py-4 top-0 bottom-0 right-0 left-0 p-8 bg-white flex flex-col items-center rounded-lg justify-evenly">
            <h3 className="text-xl">{flashcard.word}</h3>
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
            <p className="font-medium">
              <i className="font-normal">{flashcard.definition}</i>
            </p>
            <p>{flashcard.pronunciation}</p>
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
    </div>
  );
};

export default Game;
