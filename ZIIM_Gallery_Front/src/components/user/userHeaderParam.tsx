import Paint from '../../assets/icons/paint/paint-32.png'

export default function UserHeaderParam() {
    return (
        <nav
            aria-label="Actions de la galerie"
            className="absolute right-4 top-2 z-10 flex items-center gap-2 rounded-xl border border-white/25 bg-black/25 p-2 shadow-lg backdrop-blur-md sm:right-6 sm:top-6"
        >
            <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent sm:text-sm"
            >
                Ajouter une oeuvre
            </button>
            <button
                type="button"
                className="rounded-lg border border-white/40 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent sm:text-sm"
            >
                Paramètres
            </button>
            <button
                type="button"
                aria-label="Personnaliser la page profil"
                title="Personnaliser la page profil"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/40 bg-white/10 text-xl text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
                <img src={Paint} alt="" className="h-5 w-auto invert" />
            </button>
        </nav>
    )
}