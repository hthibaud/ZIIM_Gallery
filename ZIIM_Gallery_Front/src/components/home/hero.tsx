export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-zinc-800/60 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
            
            <div className="relative mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-400 backdrop-blur-sm">
                        <span className="mr-2 flex h-1.5 w-1.5 rounded-full bg-white opacity-80"></span>
                        ZIIM Gallery
                    </div>
                    
                    <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        L&apos;art mérite un espace à sa hauteur.
                    </h1>
                    
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        Explorez des œuvres, découvrez des artistes et construisez une galerie qui vous ressemble.
                    </p>
                    
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a 
                            href="/user/0" 
                            className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
                        >
                            Voir ma galerie
                        </a>
                        
                        <a 
                            href="#recent-artworks" 
                            className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-800 bg-transparent px-6 font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                        >
                            Explorer les œuvres
                        </a>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}