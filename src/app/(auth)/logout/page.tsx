"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);
  return <></>;
};

export default Logout;
