import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


export interface Blogs{
  "content": string;
  "title": string;
  "id": number;
  "author": {
      "name": string|null;
  }
}


export const useBlog = ({id}:{id:string}) => {
  const [loading, setLoading] = useState(true)

  const [blog, setBlog] = useState<Blogs>();

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    }).then(response =>{
        setBlog(response.data.blog);
        setLoading(false)
    })

  },[])

  return {
    loading,
    blog
  }

}


export const useBlogs = () => {
  const [loding, setLoding] = useState(true)

  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    }).then(response =>{
        setBlogs(response.data.blogs);
        setLoding(false)
    })

  },[])

  return {
    loding,
    blogs
  }

}
