import ModFlashcard from "@/components/flashcard/modFlashcard";
import Button from "@/components/shared/button";
import authOptions from "@/lib/utils/auth/authOptions";
import { flashcardService } from "@/server/services/flashcard.service";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Flashcard = async () => {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")
  ) {
    redirect("/");
  }
  const flashCards = await flashcardService.getFlashcardsByUser(
    session?.user.userId
  );
  return (
    <div className="flex flex-col items-center gap-5 my-10">
      <h1 className="text-white text-3xl">Flashcards</h1>
      <Link href="/flashcard/create">
        <Button>New flashcard</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashCards.length > 0 &&
          flashCards.map((flashCard) => (
            <ModFlashcard key={flashCard.id} flashCard={flashCard} />
          ))}
      </div>
    </div>
  );
};

export default Flashcard;
