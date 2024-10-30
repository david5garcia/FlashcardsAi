import prisma from "@/lib/db/db";
import CustomTrpcError from "@/model/trpc/customTrpcError";
import registerFormZod from "@/model/zod/auth/register/registerForm.zod";
import { emailService } from "@/server/services/email.service";
import bcrypt from "bcrypt";
import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.WEB_URL}/verify?token=${token}`;

  await emailService.sendEmail(
    email,
    "FlashcardsAi - Please verify your email",
    `Click the link to verify your email: ${verificationLink} or copy and paste this link into your browser: ${verificationLink}`,
    `<p>Click the link to verify your email: <a href="${verificationLink}">Verify Email</a> or copy and paste this link into your browser: ${verificationLink}</p>`
  );
}

async function verifyUser(userId: number) {
  const user = await prisma.user.findFirst({
    where: { id: userId }
  });

  if (!user) {
    throw new CustomTrpcError("User not found");
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

export const registerRouter = router({
  registerUser: publicProcedure
    .input(registerFormZod)
    .mutation(async ({ input }) => {
      try {
        const userExists = await prisma.user.findFirst({
          where: { email: input.email }
        });

        if (userExists) {
          throw new CustomTrpcError("User already exists");
        }

        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: bcrypt.hashSync(input.password, 10)
          }
        });

        await verifyUser(user.id);
      } catch (error) {
        console.error(error);
        if (error instanceof CustomTrpcError) {
          throw error;
        }
        throw new Error("Error registering user");
      }

      return {
        message: "User registered, email sent to verify account"
      };
    }),

  verifyUser: publicProcedure
    .input(
      z.object({
        userId: z.number()
      })
    )
    .mutation(async ({ input }) => {
      await verifyUser(input.userId); 
      return {
        message: "Verification email sent"
      };
    })
});
