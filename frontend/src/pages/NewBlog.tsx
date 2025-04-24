import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const NewBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    async function createBlog(){
        const response = axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title:title,
            content:content
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })

        navigate(`/blog/${(await response).data.id}`)
    }

  return (
    <div className="max-w-3xl mx-auto m-15">
      <div className="relative z-0 w-full mb-5 group">
        <input
        onChange={(e)=>{
            setTitle(e.target.value)
        }}
          type="text"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-1 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className=" text-2xl peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Title
        </label>
      </div>

      <div className="max-w-full mx-auto mt-20">
        <label
          htmlFor="message"
          className="block mb-2 text-xl font-medium text-gray-900 "
        >
          Content
        </label>
        <textarea
        onChange={(e)=>{
            setContent(e.target.value)
        }}
          id="message"
          className=" w-full h-90 block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Put your content here..."
        ></textarea>
          <button
           onClick={createBlog}
           type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish Post</button>

      </div>
    </div>
  );
};
