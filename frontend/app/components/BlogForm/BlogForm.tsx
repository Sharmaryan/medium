"use client";

import { BLOG_ROUTE } from "../../lib/constants/blog/blog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import Input from "../Input/Input";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import { useToast } from "../../context/toast-provider";
import { Status } from "../Toast/Toast.types";
import { useMutation } from "../../hooks/useMutate";

export const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const session = useSession();
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate, isLoading } = useMutation("POST", BLOG_ROUTE, session.data?.user.token);
  const publishHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const payload = { title, content };
      await mutate(payload);
      router.push("/");
      addToast(Status.Success, "Blog Published Successfully");
    } catch (err) {
      if (isAxiosError(err)) {
        addToast(Status.Error, err.response?.data.error);
      } else {
        addToast(Status.Error, "Something Went Wrong!");
      }
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={publishHandler}>
      <Input
        label="Title"
        name="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        id="message"
        rows={20}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 dark:placeholder-gray-400"
        placeholder="Write your post content here..."
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button fill="solid" type="submit" className="px-6" isLoading={isLoading}>
        Publish
      </Button>
    </form>
  );
};
