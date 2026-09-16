import SearchBar from "./utils/SearchBar";

export default function HeaderComponent() {

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto h-32 flex justify-between items-center p-4">
        <h1 className="text-white  text-6xl font-bold m-4 p-4">
          ZIIM Gallery
        </h1>
          <SearchBar 
          />
        <ul className="flex space-x-8 text-white text-lg font-medium cursor-pointer p-4">
          <li></li>
          <li>
            <a className="hover:text-gray-300" href="/mainGallery">Main Gallery</a>
          </li>
          <li>
            <a className="hover:text-gray-300" href="/user/0">profile</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
