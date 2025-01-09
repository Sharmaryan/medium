import { BLOG_ROUTE } from "../../lib/constants/blog/blog";
import { getReq } from "../../lib/axios-helpers/apiClient";
import { BlogCardProps } from "../../components/BlogCard/BlogCard.types";
export default async function Blog({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
    const id = (await params).slug;
    const response = await getReq<{blog:BlogCardProps}>(`${BLOG_ROUTE}/${id}`);
    const blog = response.blog
  return (
    <div className="flex flex-col gap-10 pt-10 w-80 mx-auto md:w-[700px]">
      <h2 className="font-bold text-4xl">{blog.title}</h2>
      <p className="text-gray-500">{blog.content}</p>
    </div>
  );
}
