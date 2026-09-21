import Coins from '../../assets/icons/coins/coins-32.png';
import ImgTemplate from '../../assets/ArtworkTemplate.jpg';

type ArtworkGalleryCardProps = {
    user_id: string;
    artwork_id: string;
    card_backgound_color?: string; // Rendu optionnel pour la flexibilité
};

type ArtworkGalleryCardData = {
    name: string;
    details?: string;
    price: number;
    datetime: string;
    creator_id: string;
    for_sale: boolean;
};

export default function ArtworkGalleryCard({
    user_id,
    artwork_id,
    card_backgound_color
}: ArtworkGalleryCardProps) {
    
    // Données fictives
    const Data: ArtworkGalleryCardData = {
        name: "Test",
        details: "Voici une œuvre de test avec une description qui peut s'étaler sur plusieurs lignes pour voir le rendu.",
        price: 200,
        datetime: "2026-09-10",
        for_sale: true,
        creator_id: "0" 
    };

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(Data.datetime));

    return (
        <article 
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50"
            // On utilise 'style' pour la couleur dynamique, et un fallback Tailwind classique si non fourni
            style={{ backgroundColor: card_backgound_color }}
            {...(!card_backgound_color && { className: "bg-zinc-900/50" })}
        >
            {/* Zone de l'image */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-800">
                <img 
                    src={ImgTemplate} 
                    alt={`Image de ${Data.name}`} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Badge de disponibilité (Design "Glassmorphism" discret) */}
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <span className={`h-1.5 w-1.5 rounded-full ${Data.for_sale ? "bg-emerald-400" : "bg-zinc-400"}`} />
                    {Data.for_sale ? "Disponible" : "Archivée"}
                </span>
            </div>

            {/* Contenu */}
            <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-1">
                    <h2 className="truncate text-lg font-bold tracking-tight text-white" title={Data.name}>
                        {Data.name}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
                        {Data.details}
                    </p>
                </div>

                {/* Pied de carte (Date et Prix) */}
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-zinc-800/60 pt-4">
                    <div>
                        <p className="text-[11px] font-medium text-zinc-500">
                            Ajoutée le
                        </p>
                        <time dateTime={Data.datetime} className="mt-0.5 block text-sm font-medium text-zinc-300">
                            {formattedDate}
                        </time>
                    </div>

                    {Data.for_sale && (
                        <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5">
                            <span className="text-base font-bold text-white">
                                {Data.price}
                            </span>
                            {/* Assure-toi que ton icône "Coins" a un fond transparent, sinon ça jurera */}
                            <img src={Coins} alt="Pièces" className="h-4 w-auto object-contain drop-shadow-sm" />
                        </div> 
                    )}
                </div>
            </div>
        </article>
    );
}