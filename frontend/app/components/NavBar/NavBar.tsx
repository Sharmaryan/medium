import Link from "next/link";

export const NavBar = () => {
  return (
    <header className="flex items-center border-b border-gray-200 p-2">
      <h1 className="text-2xl font-bold">Medium</h1>
      <Link href={'/new'} className="ml-auto border-2 border-secondary px-4 py-2 rounded-xl">Create Post</Link>
    </header>
  );
};
