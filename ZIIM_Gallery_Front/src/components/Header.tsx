import SearchBar from "./utils/SearchBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HeaderComponent() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    function updateUserId() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setUserId(null);
        return;
      }

      try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        setUserId(typeof decodedPayload.sub === "string" ? decodedPayload.sub : null);
      } catch {
        setUserId(null);
      }
    }

    updateUserId();
    window.addEventListener("auth-change", updateUserId);

    return () => window.removeEventListener("auth-change", updateUserId);
  }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
                
                <Link 
                    to="/" 
                    className="shrink-0 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md"
                >
                    <span className="text-lg font-bold tracking-tight text-white">
                        ZIIM Gallery
                    </span>
                </Link>

                <div className="flex flex-1 items-center justify-center px-2 sm:px-6 md:max-w-md lg:max-w-lg">
                    <SearchBar />
                </div>
                

                <nav aria-label="Menu principal" className="shrink-0">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link 
                                to="/create" 
                                className="text-xl font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md px-1 py-0.5"
                            >
                                +
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md px-1 py-0.5"
                            >
                                Galerie
                            </Link>
                        
                        </li>
                        {userId ? (
                          <li>
                            <Link
                              to={`/user/${userId}`}
                              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md px-1 py-0.5"
                            >
                              Profil
                            </Link>
                          </li>
                        ) : (
                          <li>
                            <Link
                              to="/login"
                              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md px-1 py-0.5"
                            >
                              Se connecter
                            </Link>
                          </li>
                        )}
                    </ul>
                </nav>
                
            </div>
        </header>
    );
}
