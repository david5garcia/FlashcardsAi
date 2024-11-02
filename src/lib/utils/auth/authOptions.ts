import { DefaultSession, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      role: string;
      verified: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role: string;
    verified: boolean;
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
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
    session: ({ session, token }: { session: Session; token: JWT }) => {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.id,
          role: token.role,
          verified: token.verified
        },
        expires: session.expires
      };
    },
    jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.verified = user.verified;
      }
      return token;
    }
  }
};

export default authOptions;
