import { BlogForm } from "../components/BlogForm/BlogForm";

export default async function New() {
  return (
    <div className="px-2">
      <h1>Create a Post</h1>
      <BlogForm />
    </div>
  );
}
