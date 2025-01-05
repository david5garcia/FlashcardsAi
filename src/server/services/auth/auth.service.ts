import bcrypt from "bcrypt";
import prisma from "@/lib/db/db";

const authorize = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!user || !bcrypt.compareSync(password, user!.password)) {
    return null;
  }

  return {
    id: String(user.id),
    email: user.email,
    verified: user.verified,
    role: user.role
  };
};

export const authService = { authorize };
