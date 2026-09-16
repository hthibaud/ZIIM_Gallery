import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for arts, artists, mood..."
        className="bg-gray-700 rounded-lg m-4 p-2 min-w-2xl text-gray-100"
        value={searchQuery}
        onChange={handleSearchChange}
      ></input>
    </div>
  );
}
