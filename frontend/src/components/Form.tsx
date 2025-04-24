import { SignupInput } from "@100xdevs/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


export const Form = ({type}:{type:"signup" | "signin"}) => {

    const navigate = useNavigate()


    const [postInput, setPostInput] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signin"?"signin":"signup"}`,{
                name:postInput.name,
                username:postInput.username,
                password:postInput.password
            });
            const jwt = response.data;
            console.log(response)
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        } catch (error) {
            alert("error in signup")
        }
    }
    
    
    return <div className=" h-screen">
                <div className="max-w-md mx-auto flex flex-col justify-center items-center h-full w-full">
                    <h2 className="text-3xl font-bold">Create an account</h2>
                    {type==="signup"?<InputWithLeble leble="Name" placeholder="danish" onChange={(e)=>{
                        setPostInput(c=>({
                            ...c,
                            name:e.target.value
                        }))
                    } }/>:""}
                    <InputWithLeble leble="Username" placeholder="danish@123" onChange={(e)=>{
                        setPostInput(c=>({
                            ...c,
                            username:e.target.value
                        }))
                    } }/>
                    <InputWithLeble 
                    type="password"
                    leble="Password" onChange={(e)=>{
                        setPostInput(c=>({
                            ...c,
                            password:e.target.value
                        }))
                    } }/>
                   <button onClick={sendRequest} type="button" className="w-full mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"sign in"}</button>

                    <h2 className="text-gray-700 font-medium mt-3">{type==="signin"? "Dont have an account?":"Already have an account?"}
                        <Link className="underline pl-2" to={type==="signin"?"/signup":"/signin"}>{type==="signin"?"Signup":"Signin"}</Link>
                    </h2>
                </div>
    </div>
}

interface inputWithLeble {
    leble:string,
    placeholder?:string,
    type?:string,
    onChange:(e:ChangeEvent)=>void
}

const InputWithLeble = ({leble, placeholder, type, onChange}:inputWithLeble) => {
    return <div className="w-full m-3">
    <label htmlFor="first_name" className="block mb-2 text-xl font-medium text-gray-900">{leble}</label>
    <input type={type || "text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder||""} required />
</div>
}