import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-zinc-950 px-5 py-24 text-center sm:px-8 lg:px-12">
            
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-120 w-120 rounded-full bg-zinc-900/40 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-400 backdrop-blur-sm">
                    Erreur 404
                </span>
                
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Cette salle n&apos;existe pas.
                </h1>
                
                <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
                    L&apos;œuvre ou la page que tu recherches semble avoir disparu, ou bien elle n&apos;a jamais fait partie de la galerie.
                </p>
                
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        to="/"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950 sm:w-auto"
                    >
                        Retour à l&apos;accueil
                    </Link>
                    <Link
                        to="/Gallery"
                        className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-800 bg-transparent px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 sm:w-auto"
                    >
                        Explorer la galerie
                    </Link>
                </div>
            </div>
        </main>
    );
}