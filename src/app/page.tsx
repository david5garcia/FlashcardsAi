"use client";
import Lottie from "lottie-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [animationData, setAnimationData] = useState(null);
  const session = useSession();

  useEffect(() => {
    const loadAnimation = async () => {
      const res = await fetch("/lottie/ai.json");
      const data = await res.json();
      setAnimationData(data);
    };
    loadAnimation();
  }, []);

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <h1 className="text-[3rem] md:text-[7rem] lg:text-[11rem] xl:text-[13rem]">
        FlashcardsAi
      </h1>
      <h2 className="md:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.6rem] text-center">
        FlashcardsAi is a flashcard app that uses AI to help you learn faster.
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-3">
        <h2 className="md:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.6rem]">
          Want to play?
        </h2>
        <div className="text-xl flex justify-center items-center gap-5">
          {!session.data ? (
            <>
              <Link
                className="bg-[#eeecec] text-[#4858cf]  w-28 text-center py-3 rounded-lg hover:bg-[#4858cf] hover:text-white transition-all ease-in-out duration-500"
                href="/login"
              >
                Log in
              </Link>
              <span> / </span>
              <Link
                className="bg-[#eeecec] text-[#4858cf]  w-28 text-center py-3 rounded-lg hover:bg-[#4858cf] hover:text-white transition-all ease-in-out duration-500"
                href="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                className="bg-[#eeecec] text-[#4858cf]  w-28 text-center py-3 rounded-lg hover:bg-[#4858cf] hover:text-white transition-all ease-in-out duration-500"
                href="/play"
              >
                Start
              </Link>
            </>
          )}
        </div>
      </div>
      <div>
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 300, height: 300 }}
        />
      </div>
    </div>
  );
}
