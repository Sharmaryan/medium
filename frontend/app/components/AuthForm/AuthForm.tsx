"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AuthProps } from "./AuthForm.types";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { USER_ROUTE, loggingInUser } from "../../lib/constants/auth/auth";
import { Button } from "../Button/Button";
import Input from "../Input/Input";

export const AuthForm = ({ path, linkText }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentPage = usePathname();
  const router = useRouter();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form
      className="flex flex-col gap-8 shadow-xl p-5 w-80"
      onSubmit={async (e) => {
        e.preventDefault();
        const payload = { redirect: false, email, password };
        if (currentPage !== "/signup") {
          loggingInUser(payload);
          router.push("/");
        } else {
          try {
            const response = await axios.post(`${USER_ROUTE}/signup`, payload);
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
      <Input onChange={handleEmail} label={"email"} name={"email"} />
      <Input onChange={handlePassword} label={"password"} name={"password"} />
      <Button fill="solid" type="submit" className="w-full">
        Submit
      </Button>
      <Button fill="clear">
        <Link href={path}>{linkText}</Link>
      </Button>
    </form>
  );
};
