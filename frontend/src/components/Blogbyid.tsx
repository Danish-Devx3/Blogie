import { Blogs } from "../hooks";
import { Avatar } from "./BlogCard";

export const Blogbyid = ({ blog }: { blog: Blogs }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-12 w-full px-10 pt-20">
        <div className="col-start-1 col-span-8">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <h2 className="text-2xl font-medium text-gray-700 pt-3">{blog.content}</h2>
        </div>
        <div className="col-start-9 col-span-12">
          <p className="text-xl font-medium text-gray-700 pb-2">Author</p>
          <div className="flex items-center gap-3">
            <div>
             <Avatar name={blog.author.name || "Anonymous"}/>
            </div>
            <div>
            <h3 className="text-xl font-medium ">{blog.author.name || "Anonymous"}</h3>
            <p className="text-xl">something about author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
