"use client";
import { signOut } from "next-auth/react";

const Logout = async () => {
  await signOut({ callbackUrl: "/" });
  return <></>;
};

export default Logout;
