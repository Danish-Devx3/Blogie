import { Link } from "react-router-dom";

interface BlogCardProps{
    id:number;
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}

export const BlogCard = ({id,authorName,title,content,publishedDate}:BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b-1 border-gray-400 flex flex-col mx-auto max-w-4xl pb-6 my-10 cursor-pointer">
        <div >
            <h3 className="text-start capitalize font-medium text-gray-500"><Avatar name={authorName}/> {authorName} • {publishedDate}</h3>

        </div>

        <div className="flex justify-center">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex justify-center">
            <p className="text-xl font-medium">{content.slice(0,100)+"..."}</p>
        </div>
        <div>
            <p>{`${Math.ceil(content.length/100)} minutes`}</p>
        </div>
    </div>
    </Link>
  )
}


export function Avatar({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
}