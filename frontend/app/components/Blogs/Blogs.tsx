
"use client";
import React from "react";
import { BlogsProps } from "./Blogs.types";
import dynamic from "next/dynamic";
const BlogCard = dynamic(() => import("../BlogCard/BlogCard"),{ssr:false});


export const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:max-w-[1024px] md:mx-auto">
      {blogs.map((blog) => {
        return (
          <div
            key={blog.id}
            className="w-full mx-auto"
          >
            <BlogCard {...blog}/>
          </div>
        );
      })}
    </div>
  );
};
