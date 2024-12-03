import ProfileTable from "@/components/profile/profileTable";
import Card from "@/components/shared/card";
import prisma from "@/lib/db/db";
import authOptions from "@/lib/utils/auth/authOptions";
import { MessageSender, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export type GameData = Prisma.GameGetPayload<{
  include: {
    conversation: {
      select: {
        _count: {
          select: {
            messages: {
              where: {
                sender: "USER";
              };
            };
          };
        };
      };
    };
    flashcard: true;
  };
}>[];

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const { user } = session!;

  const gameData = await prisma.game.findMany({
    where: {
      userId: String(user.userId)
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      conversation: {
        select: {
          _count: {
            select: {
              messages: {
                where: {
                  sender: MessageSender.USER
                }
              }
            }
          }
        }
      },
      flashcard: true
    }
  });

  return (
    <div className="my-6">
      <Card className="bg-white my-5 p-4 flex flex-col gap-4">
        <h1 className=" font-semibold text-[2.4rem]">Profile</h1>
        <p className="text-xl">Welcome {user.email?.split("@")[0]}.</p>
        <p className="text-xl">
          You have:&nbsp;
          <span className="text-2xl text-[#4158d0]">
            {gameData.reduce(
              (sum, game) =>
                sum +
                Math.max(100 - (game.conversation._count.messages - 1) * 5, 40),
              0
            )}
          </span>
          &nbsp;points!
        </p>
      </Card>
      <ProfileTable gameData={gameData} />
    </div>
  );
};

export default Profile;
