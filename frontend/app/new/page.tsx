import { BlogForm } from "../components/BlogForm/BlogForm";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";

export default async function New() {
  const session = await getServerSession(NEXT_AUTH);

  return (
    <div className="px-2">
      <h1>Create a Post</h1>
      <BlogForm session={session} />
    </div>
  );
}
