import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { useState } from "react";
import { useEffect } from "react";

export default function FooterComponent() {

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
      <footer className="border-t border-zinc-800/60 bg-zinc-950 px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              
              {/* Section Marque & Slogan */}
              <div className="space-y-2">
                  <span className="text-xl font-bold tracking-tight text-white">
                      ZIIM Gallery
                  </span>
                  <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                      Découvrez et suivez l'art que vous aimez.
                  </p>
              </div>

              {/* Section Navigation */}
              <nav aria-label="Menu du pied de page">
                  <ul className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                      <li>
                          <a 
                              href="/support" 
                              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                          >
                              Support
                          </a>
                      </li>
                    {userId ? (
                      <li>
                        
                          <Link
                              to="/register"
                              onClick={logout}
                              className="text-sm font-medium text-zinc-400 transition-colors hover:text-red-500"
                          >
                              Se déconnecter
                          </Link>
                      </li>
                    ):(
                        <li>
                        <Link
                              to="/login"
                              className="text-sm font-medium text-zinc-400 transition-colors hover:text-green-500"
                          >
                              Se connecter
                          </Link>
                      </li>
                     )}
                  </ul>
              </nav>
              
          </div>

          {/* Section Copyright */}
          <div className="mx-auto mt-12 max-w-7xl border-t border-zinc-800/60 pt-8">
              <p className="text-xs text-zinc-600 md:text-center">
                  &copy; {new Date().getFullYear()} ZIIM Gallery. Tous droits réservés.
              </p>
          </div>
      </footer>
  );
}