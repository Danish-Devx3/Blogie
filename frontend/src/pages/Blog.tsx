import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { Blogbyid } from "../components/Blogbyid";
import { Navbar } from "../components/Navbar";
import { Skelton } from "../components/Skelton";

export const Blog = () => {
  
  const {id} = useParams();
  
  const {loading, blog} = useBlog({
    id:id || ""
  });
  
  
  if(loading || !blog){
    return <div>
      <Skelton/>
      <Skelton/>
      <Skelton/>
      <Skelton/>
    </div>
  }

  return (
    <div>
      <Navbar/>
      <Blogbyid blog={blog}/>
    </div>
  )
}


