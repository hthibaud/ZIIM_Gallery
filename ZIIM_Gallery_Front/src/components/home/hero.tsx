export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-white/10 bg-[#180d2e] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(121,67,161,0.45),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(212,175,55,0.18),transparent_30%)]" />
            <div className="relative mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">ZIIM Gallery</p>
                    <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                        L&apos;art mérite un espace à sa hauteur.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                        Explorez des œuvres, découvrez des artistes et construisez une galerie qui vous ressemble.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="/user/0" className="rounded-lg bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#180d2e] transition hover:bg-[#e5c65f]">
                            Voir ma galerie
                        </a>
                        <a href="#recent-artworks" className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                            Explorer les œuvres
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}