"use client";

import Button from "@/components/shared/button";
import { Level } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { trpc } from "../_trpc/client";

const Play = () => {
  const router = useRouter();
  const session = useSession();

  const playMutation = trpc.play.createSinglePlayerGame.useMutation({
    onSuccess: (response) => {
      router.push(`/play/game/${response.game.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <div className="flex flex-col gap-4 text-center justify-center items-center">
      <h2 className="text-white text-2xl">Choose difficulty</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {Object.keys(Level).map((level) => (
          <Button
            key={level}
            onClick={() => {
              if (!session.data?.user) {
                toast.error("You need to be logged in to play");
                return;
              }

              playMutation.mutate({
                level: level as Level,
                userId: session.data.user.userId
              });
            }}
          >
            {level}
          </Button>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Play;
