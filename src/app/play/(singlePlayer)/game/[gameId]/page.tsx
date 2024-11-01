import Game from "@/components/play/game";
import prisma from "@/lib/db/db";

const SingleGame = async ({
  params
}: {
  params: Promise<{ gameId: string }>;
}) => {
  const { gameId } = await params;

  const game = await prisma.game.findFirst({
    where: {
      id: gameId
    },
    include: {
      flashcard: true,
      conversation: {
        include: {
          messages: true,
        }
      }
    }
  });

  if (!game) {
    return <div>Game not found</div>;
  }

  const { flashcard, conversation } = game;

  return <Game game={game} flashcard={flashcard} conversation={conversation} />;
};

export default SingleGame;
