import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-15 border-b-1 border-gray-400 py-4">
      <Link to={"/blogs"}>
        <div>
          <h1 className="text-3xl font-medium">Blogie</h1>
        </div>
      </Link>
      <div className="flex items-center">
        <Link to={"/publish"}>
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1.5 text-center me-4 mb- dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          New
        </button>
        </Link>
        <div>

        <Avatar name="danish" />
        </div>

      </div>
    </div>
  );
};
