"use client";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog";
import { FC } from "react";
import Image from "next/image";
import { format } from "date-fns";
import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import ModalDeleteBlog from "./ModalDeleteBlog";
import { useAuthStore } from "@/stores/auth";

interface BlogDetailHeaderProps {
  blog: Blog;
}
const BlogDetailHeader: FC<BlogDetailHeaderProps> = ({ blog }) => {
  const { user } = useAuthStore();
  const { mutateAsync: deleteBlog, isPending } = useDeleteBlog();

  const handleDelete = async () => {
    await deleteBlog(blog.id);
  };
  return (
    <section className="mt-20 space-y-4">
      <Badge
        variant="outline"
        className="rounded-sm bg-green-100 text-green-600 capitalize"
      >
        {blog.category}
      </Badge>

      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <div className="flex items-center justify-between">
        <p>
          {format(new Date(blog.createdAt), "dd MMM yyyy")} -{" "}
          <span className="capitalize">{blog.user?.name}</span>
        </p>

        {user?.id === blog.userId && (
          <ModalDeleteBlog onClick={handleDelete} isPending={isPending} />
        )}
      </div>

      <div className="relative h-[440px]">
        <Image
          src={blog.thumbnail}
          alt="thumbnail"
          className="object-cover"
          fill
        />
      </div>
    </section>
  );
};

export default BlogDetailHeader;
