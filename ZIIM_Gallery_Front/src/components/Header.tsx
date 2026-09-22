import SearchBar from "./utils/SearchBar";
import { Link } from "react-router-dom";

export default function HeaderComponent() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
            {/* 
              h-16 définit une hauteur standard de 64px. 
              gap-4 empêche les éléments de se chevaucher sur petit écran. 
            */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
                
                {/* 1. Logo / Marque (shrink-0 l'empêche d'être écrasé par la barre de recherche) */}
                <Link 
                    to="/" 
                    className="shrink-0 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md"
                >
                    <span className="text-lg font-bold tracking-tight text-white">
                        ZIIM Gallery
                    </span>
                </Link>

                {/* 2. Barre de recherche (Centrée et flexible) */}
                <div className="flex flex-1 items-center justify-center px-2 sm:px-6 md:max-w-md lg:max-w-lg">
                    {/* On part du principe que ton SearchBar gère sa propre largeur interne 100% */}
                    <SearchBar />
                </div>
                

                {/* 3. Navigation */}
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
                                to="/Gallery" 
                                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md px-1 py-0.5"
                            >
                                Galerie
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/user/0" 
                                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-md px-1 py-0.5"
                            >
                                Profil
                            </Link>
                        </li>
                    </ul>
                </nav>
                
            </div>
        </header>
    );
}
