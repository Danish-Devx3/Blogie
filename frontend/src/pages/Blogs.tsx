import { BlogCard } from "../components/BlogCard"
import { Navbar } from "../components/Navbar"
import { useBlogs } from "../hooks"
import { Skeleton } from "../components/Skeleton";

export const Blogs = () => {

    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Navbar />
            <div className="flex justify-center">
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Navbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}
