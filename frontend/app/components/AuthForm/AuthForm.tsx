"use client";
import Link from "next/link";
import React from "react";
import { AuthProps } from "./AuthForm.types";
import { usePathname, useRouter } from "next/navigation";
import { USER_ROUTE, loggingInUser } from "../../lib/constants/auth/auth";
import { Button } from "../Button/Button";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { SignupInput } from "@sharmaryan/common-medium";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../../lib/form-schema/SignIn.schema";
import { useMutation } from "../../hooks/useMutate";
import { useToast } from "../../context/toast-provider";
import { Status } from "../Toast/Toast.types";

export const AuthForm = ({ path, linkText }: AuthProps) => {
  const currentPage = usePathname();
  const router = useRouter();
  const { mutate, isLoading } = useMutation("POST", `${USER_ROUTE}/signup`);
  const { addToast, } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  });
  const formHandler = async (data: SignupInput) => {
    const payload = {
      redirect: false,
      email: data.email,
      password: data.password,
    };
    if (currentPage !== "/signup") {
      const response = await loggingInUser(payload);
      if (response?.error) {
        addToast(Status.Error, response?.error);
      } else {
        router.push("/");
        addToast(Status.Success, "Signed in successfully");
      }
    } else {
      try {
        const response = await mutate(payload);
        if (response?.status === 200) {
          const response = await loggingInUser(payload);
          if (response?.error) {
            addToast(Status.Error, response?.error);
          } else {
            router.push("/");
            addToast(Status.Success, "Signing In...");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-8 shadow-xl p-5 w-80"
      onSubmit={handleSubmit(formHandler)}
    >
      <Input
        {...register("email")}
        label={"Email"}
        name={"email"}
        error={errors.email?.message && errors.email.message}
      />
      <Input
        {...register("password")}
        label={"Password"}
        name={"password"}
        type="password"
        error={errors.password?.message && errors.password.message}
      />
      <Button fill="solid" type="submit" className="w-full" isLoading={isLoading}>
        Submit
      </Button>
      <Button fill="clear">
        <Link href={path}>{linkText}</Link>
      </Button>
    </form>
  );
};
