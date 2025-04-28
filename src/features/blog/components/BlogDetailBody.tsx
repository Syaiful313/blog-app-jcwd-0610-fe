import MarkDown from "@/components/Markdown";
import { Blog } from "@/types/blog";
import { FC } from "react";

interface BlogDetailBodyProps {
  blog: Blog;
}
const BlogDetailBody: FC<BlogDetailBodyProps> = ({ blog }) => {
  return (
    <section className="my-10">
      <MarkDown content={blog.content} />
    </section>
  );
};

export default BlogDetailBody;
