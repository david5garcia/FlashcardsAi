"use client";
import { trpc } from "@/app/_trpc/client";
import { Flashcard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Button from "../shared/button";
import Card from "../shared/card";

const ModFlashcard = ({ flashCard }: { flashCard: Flashcard }) => {
  const router = useRouter();
  const deleteFlashcardMutation = trpc.flashcard.deleteFlashcard.useMutation();
  const deleteFlashcard = async (flashcardId: number): Promise<void> => {
    await deleteFlashcardMutation.mutateAsync(flashcardId, {
      onSuccess: () => {
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
  return (
    <Card
      key={flashCard.id}
      className="bg-white p-4 flex flex-col justify-between items-center text-center"
    >
      <h2 className="text-2xl">{flashCard.word}</h2>
      <p>
        <b>Hint:</b> {flashCard.hint}
      </p>
      <p>
        <b>Definition:</b> {flashCard.definition}
      </p>
      <p>
        <b>Pronunciation:</b> {flashCard.pronunciation}
      </p>
      <p>
        <b>Level:</b> {flashCard.level}
      </p>
      <p>
        <b>Created at: </b>
        {new Date(flashCard.createdAt).toLocaleString()}
      </p>
      <Button
        className="mt-5 bg-red-500 text-white"
        onClick={() => deleteFlashcard(flashCard.id)}
      >
        Delete
      </Button>
      <ToastContainer />
    </Card>
  );
};

export default ModFlashcard;
