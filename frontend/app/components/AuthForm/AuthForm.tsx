"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AuthProps } from "./AuthForm.types";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import axios from "axios";

export const AuthForm = ({ path, linkText }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentPage = usePathname();

  return (
    <form
      className="flex flex-col gap-8 shadow-xl p-5 w-80"
      onSubmit={async (e) => {
        e.preventDefault();
        const payload = { email, password };
        if (currentPage !== "/signup") {
          await signIn("credentials", { redirect: false, payload });
        } else {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/signup`,
              payload
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      }}
    >
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <button
        className="text-primary bg-secondary rounded-md py-2"
        type="submit"
      >
        Submit
      </button>
      <Link href={path}>{linkText}</Link>
    </form>
  );
};
