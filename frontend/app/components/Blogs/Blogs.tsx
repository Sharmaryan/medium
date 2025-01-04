import React from "react";
import { BlogCard } from "../BlogCard/BlogCard";
import { BlogsProps } from "./Blogs.types";

export const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <div className="flex gap-4 flex-col">
      {blogs.map((blog) => {
        return (
          <div
            key={blog.id}
            className="w-full mx-auto xl:w-[700px]"
          >
            <BlogCard {...blog}/>
          </div>
        );
      })}
    </div>
  );
};
