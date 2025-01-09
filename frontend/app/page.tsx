import { BLOG_ROUTE } from "./lib/constants/blog/blog";
import { BlogCardProps } from "./components/BlogCard/BlogCard.types";
import { Blogs } from "./components/Blogs/Blogs";
import { getReq } from "./lib/axios-helpers/apiClient";

export default async function Home() {
  const response = await getReq<{ blogs: BlogCardProps[] }>(
    `${BLOG_ROUTE}/bulk`
  );

  const blogs: BlogCardProps[] = response?.blogs;
  return (
    <div className="p-4">
      <Blogs blogs={blogs} />
    </div>
  );
}
