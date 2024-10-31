"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../shared/card";

const authLinks = [
  { href: "/play", label: "Play" },
  { href: "/profile", label: "Profile" },
  { href: "/logout", label: "Logout" }
];

const noAuthLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" }
];

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const session = useSession();

  const links = session.data ? authLinks : noAuthLinks;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex justify-between items-center text-white py-12">
      <h1 className="text-3xl">
        <Link href="/">FlashcardsAi</Link>
      </h1>
      <div className="relative flex items-center">
        {isMobile ? (
          <>
            <button onClick={() => setShowMenu((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
            <ul>
              {showMenu && (
                <Card className="absolute top-12 right-0 px-4 pl-14 text-[#333] w-fit flex flex-col gap-4 z-10 py-6">
                  {links.map((link) => {
                    return (
                      <li className="flex justify-end text-xl" key={link.href}>
                        <Link className="font-medium" href={link.href}>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </Card>
              )}
            </ul>
          </>
        ) : (
          <ul className="flex gap-2 text-xl">
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <Link
                    className="hover:bg-white hover:text-[#4858cf] px-5 py-2 rounded-lg"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;