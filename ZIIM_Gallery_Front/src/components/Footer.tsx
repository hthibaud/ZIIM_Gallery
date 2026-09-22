export default function FooterComponent() {
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
                      <li>
                          {/* Le bouton de déconnexion utilise la même harmonie, pas de rouge vif inutile */}
                          <a 
                              href="/authentification" 
                              className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200"
                          >
                              Se déconnecter
                          </a>
                      </li>
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