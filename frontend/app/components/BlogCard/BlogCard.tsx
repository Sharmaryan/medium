import React from "react";
import { BlogCardProps } from "./BlogCard.types";
import Link from "next/link";

export const BlogCard = ({ title, content, id }:BlogCardProps) => {
    console.log(id)
  return (
    <Link href={`blog/${id}`} className="flex flex-col gap-3 border-b-2 py-2">
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="text-gray-500">{content.length > 150 ? content.slice(0, 150) + '...': content}</p>
    </Link>
  );
};
