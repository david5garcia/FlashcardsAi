import ProfileTable from "@/components/profile/profileTable";
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
      <ProfileTable gameData={gameData} />
    </div>
  );
};

export default Profile;
