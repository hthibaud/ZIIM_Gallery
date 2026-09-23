import { useState } from "react";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="group relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 transition-colors group-focus-within:text-zinc-300">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <input
                type="text"
                placeholder="Rechercher des œuvres, artistes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-12 text-sm text-white placeholder-zinc-500 outline-none transition-all hover:bg-zinc-900 focus:border-zinc-500 focus:bg-zinc-900 focus:ring-1 focus:ring-zinc-500"
            />
        </div>
    );
}