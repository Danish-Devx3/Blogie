import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Form = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInput);
            const { jwt } = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e: any) {
            console.error("Auth error:", e);
            if (e.response && e.response.data && e.response.data.error) {
                setError(e.response.data.error);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-center">
                            {type === "signup" ? "Create an account" : "Sign in"}
                        </div>
                        <div className="text-slate-500 text-center pb-4 mt-2">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="underline pl-2 text-slate-700 hover:text-slate-900" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" ? (
                            <InputWithLabel
                                label="Name"
                                placeholder="John Doe"
                                onChange={(e) => {
                                    setPostInput((c) => ({
                                        ...c,
                                        name: e.target.value
                                    }));
                                }}
                            />
                        ) : null}
                        <InputWithLabel
                            label="Username"
                            placeholder="user@example.com"
                            onChange={(e) => {
                                setPostInput((c) => ({
                                    ...c,
                                    username: e.target.value
                                }));
                            }}
                        />
                        <InputWithLabel
                            label="Password"
                            type="password"
                            placeholder="••••••"
                            onChange={(e) => {
                                setPostInput((c) => ({
                                    ...c,
                                    password: e.target.value
                                }));
                            }}
                        />
                        
                        {error && (
                            <div className="text-red-500 text-sm font-semibold pt-2 text-center">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={sendRequest}
                            type="button"
                            disabled={loading}
                            className={`mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Processing..." : (type === "signup" ? "Sign up" : "Sign in")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface InputWithLabelProps {
    label: string;
    placeholder?: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputWithLabel = ({ label, placeholder, type, onChange }: InputWithLabelProps) => {
    return (
        <div className="pt-4">
            <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
};
