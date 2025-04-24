import { BlogCard } from "../components/BlogCard"
import { Navbar } from "../components/Navbar"
import { useBlogs } from "../hooks"

export const Blogs = ()=>{

    const {loding,blogs} = useBlogs();

    if(loding){
        return <div>Loading...</div>
    }



    return <div className="">
        <Navbar/>
        {blogs.map(blog => <BlogCard
        id={blog.id} 
        authorName={blog.author.name||"Anano"} title={blog.title} content={blog.content} publishedDate={"22 APR 2025"}
        />)}
        
    </div>
}