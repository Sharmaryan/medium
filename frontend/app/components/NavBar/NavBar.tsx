"use client";
import Link from "next/link";
import { Button } from "../Button/Button";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
const ThemeSwitcher = dynamic(() => import("../ThemeSwitcher/ThemeSwitcher"),{ssr:false});

export const NavBar = () => {
  const session = useSession();
  return (
    <header className="flex items-center border-b border-disable p-2">
      <h1 className="text-2xl font-bold">Medium</h1>
      <div className="flex ml-auto gap-4">
      {session.data?.user.token && (
        <>
          <Button fill="outline">
            <Link href="/new">Create Post</Link>
          </Button>
          <Button
            fill="solid"
            onClick={() => signOut({ callbackUrl: "/signin" })}
          >
            Logout
          </Button>
        </>
      )}
     <ThemeSwitcher/>
      </div>
    </header>
  );
};
