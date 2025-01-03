"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AuthProps } from "./AuthForm.types";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { loggingInUser } from "../../lib/constants";

export const AuthForm = ({ path, linkText }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentPage = usePathname();
  const router = useRouter();

  return (
    <form
      className="flex flex-col gap-8 shadow-xl p-5 w-80"
      onSubmit={async (e) => {
        e.preventDefault();
        const payload = { redirect: false, email, password };
        if (currentPage !== "/signup") {
          loggingInUser(payload);
        } else {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/signup`,
              payload
            );
            if (response.status === 200) {
              loggingInUser(payload);
              router.push("/");
            }
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
