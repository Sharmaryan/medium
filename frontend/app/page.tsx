import axios from "axios";
import { BLOG_ROUTE } from "./lib/constants/blog/blog";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./lib/auth";
import { BlogCardProps } from "./components/BlogCard/BlogCard.types";
import { Blogs } from "./components/Blogs/Blogs";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);
  const response = await axios.get(`${BLOG_ROUTE}/bulk`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  });

  const blogs:BlogCardProps[] = response.data.blogs;
  return (
    <div className="p-4">
    <Blogs blogs={blogs} />
    </div>
  );
}
