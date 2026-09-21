import SearchBar from "./utils/SearchBar";
import { Link } from "react-router-dom";

export default function HeaderComponent() {

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto h-20 flex justify-between items-center p-4">
        <h1 className="text-white  text-4xl font-bold m-4 p-4">
          ZIIM Gallery
        </h1>
          <SearchBar 
          />
        <ul className="flex space-x-8 text-white text-lg font-medium cursor-pointer p-4">
          <li>
            <Link to={"create"} className="flex h-10 w-10 items-center justify-center hover:text-indigo-900 hover:bg-gray-100 rounded-lg bg-gray-700 p-2 text-gray-100 outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900">
            +
            </Link> 
          </li>
          <li>
            <Link to={"/gallery"} className="hover:text-gray-300">
            Gallery
            </Link>          
          </li>
          <li>
            <Link to={`/user/ziim`} className="hover:text-gray-300">
            profil
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
