"use client";

import axios from "axios";
import { Session } from "next-auth";
import { BLOG_ROUTE } from "../../lib/constants/blog/blog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import Input from "../Input/Input";

export const BlogForm = ({ session }: { session: Session | null }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const publishHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const payload = { title, content };
      await axios.post(BLOG_ROUTE, payload, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      router.push("/");
    } catch (err) {
      console.log(err);
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
      <Button fill="solid" type="submit" className="px-6">
        Publish
      </Button>
    </form>
  );
};
