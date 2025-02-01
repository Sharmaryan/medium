"use client";
import { useTheme } from "next-themes";
import { BlogForm } from "../components/BlogForm/BlogForm";
import classNames from "classnames";

export default function New() {
  const {theme} = useTheme()
  return (
    <div className="px-2 flex flex-col gap-3 mt-5 lg:max-w-screen-lg lg:mx-auto">
      <h2 className={classNames("text-3xl font-semibold",{"text-secondary":theme === "dark"})}>Create a Post</h2>
      <BlogForm />
    </div>
  );
}
