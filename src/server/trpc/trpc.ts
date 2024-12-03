import prisma from "@/lib/db/db";
import { getServerSession, type Session } from "next-auth";

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma
  };
};

export const createTRPCContext = async () => {
  const session = await getServerSession(authOptions);

  return createInnerTRPCContext({
    session
  });
};

import authOptions from "@/lib/utils/auth/authOptions";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

const enforceIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user || ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const adminProcedure = t.procedure
  .use(enforceUserIsAuthed)
  .use(enforceIsAdmin);
