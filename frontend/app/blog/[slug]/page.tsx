import axios from "axios";
import { getServerSession } from "next-auth";
import { BLOG_ROUTE } from "../../lib/constants/blog/blog";
import { NEXT_AUTH } from "../../lib/auth";
export default async function Blog({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
    const id = (await params).slug;
    const session = await getServerSession(NEXT_AUTH);
    const response = await axios.get(`${BLOG_ROUTE}/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });
    const blog = response.data.blog
  return (
    <div className="flex flex-col gap-10 pt-10 w-80 mx-auto md:w-[700px]">
      <h2 className="font-bold text-4xl">{blog.title}</h2>
      <p className="text-gray-500">{blog.content}</p>
    </div>
  );
}
