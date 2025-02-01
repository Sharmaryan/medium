"use client";
import React from "react";
import { BlogCardProps } from "./BlogCard.types";
import Link from "next/link";
import { useTheme } from "next-themes";
import classNames from "classnames";

const BlogCard = ({ title, content, id }: BlogCardProps) => {
  const { theme } = useTheme();
  return (
    <Link
      href={`blog/${id}`}
      className={classNames("flex flex-col gap-3 p-5 h-60 shadow-lg", {
        "shadow-lg": theme === "light",
        "bg-dark-primary rounded-xl": theme === "dark",
      })}
    >
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="text-gray-500">
        {content.length > 150 ? content.slice(0, 150) + "..." : content}
      </p>
    </Link>
  );
};

export default BlogCard
