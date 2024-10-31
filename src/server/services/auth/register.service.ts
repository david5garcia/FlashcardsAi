import prisma from "@/lib/db/db";
import { PublicError } from "@/model/trpc/publicError";
import bcrypt from "bcrypt";
import { emailService } from "../email.service";

async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.WEB_URL}/verify?token=${token}`;

  await emailService.sendEmail(
    email,
    "FlashcardsAi - Please verify your email",
    `Click the link to verify your email: ${verificationLink} or copy and paste this link into your browser: ${verificationLink}`,
    `<p>Click the link to verify your email: <a href="${verificationLink}">Verify Email</a> or copy and paste this link into your browser: ${verificationLink}</p>`
  );
}

async function verifyUser(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId }
  });

  if (!user) {
    throw new PublicError("User not found");
  }

  await prisma.verification.deleteMany({
    where: { userId }
  });

  const verification = await prisma.verification.create({
    data: {
      userId,
      token:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    }
  });

  await sendVerificationEmail(user.email, verification.token);
}

const createUser = async (email: string, password: string) => {
  const userExists = await prisma.user.findFirst({
    where: { email: email }
  });

  if (userExists) {
    throw new PublicError("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password, 10)
    }
  });

  await verifyUser(user.id);
};

export const registerService = {
  createUser,
  verifyUser
};
