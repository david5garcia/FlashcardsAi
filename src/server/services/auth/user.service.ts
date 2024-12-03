import prisma from "@/lib/db/db";
import { PublicError } from "@/model/trpc/publicError";
import bcrypt from "bcrypt";
import { emailService } from "../email.service";

const startResetPasswordProcess = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email }
  });
  if (!user) {
    throw new PublicError("User not found");
  }

  await prisma.passwordReset.deleteMany({
    where: { userId: user.id }
  });

  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5) // 5 days
    }
  });

  const resetLink = `${process.env.NEXT_PUBLIC_WEB_URL}/reset-password/${token}`;

  await emailService.sendEmail(
    email,
    "Reset password",
    `You can reset your password by clicking this link: ${resetLink}`,
    `You can reset your password by clicking this link: <a href="${resetLink}">${resetLink}</a>`
  );
};

const changePassword = async (newPassword: string, token: string) => {
  const passwordReset = await prisma.passwordReset.findFirst({
    where: { token }
  });

  if (!passwordReset) {
    throw new PublicError("Invalid token");
  }

  if (passwordReset.expiresAt < new Date()) {
    throw new PublicError("Token expired");
  }

  await prisma.user.update({
    where: { id: passwordReset.userId },
    data: {
      password: bcrypt.hashSync(newPassword, 10)
    }
  });

  await prisma.passwordReset.delete({
    where: { id: passwordReset.id }
  });
};

const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const userService = {
  startResetPasswordProcess,
  changePassword,
  getAllUsers
};
