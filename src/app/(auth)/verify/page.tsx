import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
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
    <Card className="bg-white px-4 py-10 flex flex-col gap-4 text-center items-center max-w-[700px] mt-4 mx-auto">
      <h1 className="text-3xl">Account Verified</h1>
      <p>Your account {user.email} has been verified.</p>

      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </Card>
  );
};

export default Verify;
