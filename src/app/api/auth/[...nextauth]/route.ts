import prisma from "@/lib/db/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials!;

        if (!email || !password) {
          return null;
        }

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
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({
      session,
      token
    }: {
      session: Record<string, any>;
      token: Record<string, any>;
    }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          verified: token.verified
        },
        expires: session.expires
      };
    },
    jwt({
      token,
      user
    }: {
      token: Record<string, any>;
      user: Record<string, any>;
    }) {
      if (user) {
        token.role = user.role;
        token.verified = user.verified;
      }
      return token;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
