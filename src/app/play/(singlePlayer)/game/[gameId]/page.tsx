import Card from "@/components/shared/card";
import prisma from "@/lib/db/db";

const Game = async ({ params }: { params: Promise<{ gameId: string }> }) => {
  const { gameId } = await params;

  const game = await prisma.game.findFirst({
    where: {
      id: gameId
    },
    include: {
      flashcard: true
    }
  });

  if (!game) {
    return <div>Game not found</div>;
  }

  const { flashcard } = game;

  return (
    <div className="flex justify-center">
      <Card className="w-fit px-12 py-4 min-h-[200px] flex flex-col justify-center text-center gap-6">
        <h3>Can you guess?</h3>
        <p className="font-medium text-xl">
          Hint: <i className="font-normal">{flashcard.hint}</i>
        </p>
      </Card>
    </div>
  );
};

export default Game;
