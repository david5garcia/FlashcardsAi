import prisma from "@/lib/db/db";
import Link from "next/link";

const Verify = async ({
  searchParams
}: {
  searchParams: { token: string };
}) => {
  const { token } = searchParams;

  if (!token) {
    return <div>Invalid token</div>;
  }

  const verification = await prisma.verification.findFirst({
    where: {
      token
    }
  });

  if (!verification) {
    return <div>Invalid token</div>;
  }

  const user = await prisma.user.update({
    where: {
      id: verification?.userId
    },
    data: {
      verified: true
    }
  });

  return (
    <div>
      <h1>Account Verified</h1>
      <p>
        Your account {user.email} has been verified. You can now
        <Link href="/login">login</Link>
      </p>
    </div>
  );
};

export default Verify;
