"use client";

import Button from "@/components/shared/button";
import { CircularProgress } from "@mui/material";
import { Level } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { trpc } from "../_trpc/client";

const Play = () => {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const playMutation = trpc.play.createSinglePlayerGame.useMutation({
    onSuccess: (response) => {
      router.push(`/play/game/${response.game.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    }
  });

  return (
    <div className="flex flex-col gap-8 text-center justify-center items-center mt-20">
      {loading ? (
        <div className="mt-40">
          <CircularProgress size={80} color="secondary" />
        </div>
      ) : (
        <>
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

                  setLoading(true);
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
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Play;
