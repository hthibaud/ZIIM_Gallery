import { useRef, useEffect, useState } from 'react';
import ArtworkGalleryCard from '../item/artworkGalleryCard';

export default function PaintCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const artworks = [
        { id: "1", userId: "leo", name: "Lueur marine", details: "Une étude lumineuse entre écume et ciel d'orage.", price: 240, datetime: "2026-09-18", creator_id: "leo", for_sale: true },
        { id: "2", userId: "maya", name: "Après la pluie", details: "Des couleurs calmes et saturées dans une ville qui respire.", price: 180, datetime: "2026-09-16", creator_id: "maya", for_sale: true },
        { id: "3", userId: "noah", name: "Silence végétal", details: "Une composition organique dessinée à l'encre et au fusain.", price: 320, datetime: "2026-09-14", creator_id: "noah", for_sale: false },
        { id: "4", userId: "ines", name: "Mouvement", details: "Une forme abstraite qui cherche son équilibre dans l'espace.", price: 275, datetime: "2026-09-12", creator_id: "ines", for_sale: true },
        { id: "5", userId: "eliot", name: "Nuit électrique", details: "Fragments de lumière urbaine dans une palette nocturne.", price: 410, datetime: "2026-09-10", creator_id: "eliot", for_sale: true },
        { id: "6", userId: "sara", name: "Matière brute", details: "Une recherche tactile autour de la pierre, du sable et du métal.", price: 195, datetime: "2026-09-08", creator_id: "sara", for_sale: false },
        { id: "7", userId: "theo", name: "Signal 07", details: "Une exploration graphique inspirée des interfaces et des néons.", price: 150, datetime: "2026-09-06", creator_id: "theo", for_sale: true },
        { id: "8", userId: "lina", name: "Horizon doux", details: "Un paysage suspendu entre souvenir, brume et lumière rose.", price: 360, datetime: "2026-09-04", creator_id: "lina", for_sale: true },
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -320 : 320;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (isPaused) return;

        const intervalId = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                }
            }
        }, 3500);

        return () => clearInterval(intervalId);
    }, [isPaused]);

    return (
        <section 
            id="recent-artworks" 
            className="relative py-16 sm:py-24"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                <header className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-zinc-800/60 pb-8 md:flex-row md:items-end">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-zinc-500">Sélection</p>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Œuvres récentes
                        </h2>
                        <p className="max-w-sm pt-2 text-sm leading-relaxed text-zinc-400">
                            Un aperçu des créations qui donnent vie à la communauté ZIIM.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button 
                            onClick={() => scroll('left')}
                            aria-label="Voir les œuvres précédentes"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            aria-label="Voir les œuvres suivantes"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </header>
            </div>

            <div className="relative w-full">
                <div 
                    ref={carouselRef}
                    className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-12 pt-4 sm:px-8 lg:px-12 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {artworks.map((artwork, index) => (
                        <div 
                            key={artwork.id} 
                            className="w-70 shrink-0 snap-start animate-fade-in-up opacity-0 sm:w-80"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <ArtworkGalleryCard
                                user_id={artwork.userId}
                                artwork_id={artwork.id}
                                artwork={artwork}
                            />
                        </div>
                    ))}
                </div>
                
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-16 bg-linear-to-l from-zinc-950 to-transparent sm:w-32" />
            </div>
        </section>
    );
}