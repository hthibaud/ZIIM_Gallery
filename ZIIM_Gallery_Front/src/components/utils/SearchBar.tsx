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
        placeholder="⌕ Cherche des oeuvres, des artistes, un mood..."
        className="m-4 min-w-2xl rounded-lg bg-gray-700 p-2 text-gray-100 outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900"
        value={searchQuery}
        onChange={handleSearchChange}
      ></input>
    </div>
  );
}
