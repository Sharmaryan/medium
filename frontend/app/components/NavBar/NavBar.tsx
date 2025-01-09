"use client"
import Link from "next/link";
import { Button } from "../Button/Button";
import { signOut } from "next-auth/react";

export const NavBar = () => {
  return (
    <header className="flex items-center border-b border-gray-200 p-2">
      <h1 className="text-2xl font-bold">Medium</h1>
      <Button fill="outline" className="ml-auto">
        <Link href="/new">Create Post</Link>
      </Button>
      <Button fill="solid" onClick={() => signOut({callbackUrl:'/signin'})} className="ml-5">Logout</Button>
    </header>
  );
};
