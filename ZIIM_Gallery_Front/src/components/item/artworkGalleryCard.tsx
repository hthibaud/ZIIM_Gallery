import Coins from '../../assets/icons/coins/coins-32.png'
import ImgTemplate from '../../assets/ArtworkTemplate.jpg'

type ArtworkGalleryCardProps = {
    user_id: string;
    artwork_id: string;
    card_backgound_color: string;
}

type ArtworkGalleryCardData = {
    name: string;
    details?: string;
    price: number;
    datetime: string;
    creator_id: string;
    for_sale: boolean;
}

export default function ArtworkGalleryCard({
    user_id,
    artwork_id,
    card_backgound_color
}: ArtworkGalleryCardProps) {

    const Data: ArtworkGalleryCardData = {
        name:"Test",
        details:"Voici une oeuvre de test",
        price:200,
        datetime:"2026-09-10",
        for_sale:true,
        creator_id:"0" 
    }

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(Data.datetime));

    return (
        <article className={`group overflow-hidden rounded-2xl border border-black bg-[${card_backgound_color}] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}>
            <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-cyan-300 via-blue-600 to-indigo-950">
                <img src={ImgTemplate} alt={`Image de ${Data.name}`} className="w-auto h-auto" />
                <span className="absolute left-4 top-4 rounded-full bg-[#50d71e] px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {Data.for_sale ? "Disponible" : "Archivee"}
                </span>
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <h2 className="truncate text-lg font-bold text-white">{Data.name}</h2>
                    <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-white/90">{Data.details}</p>
                </div>

                <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-slate-100">Ajoutée le</p>
                        <time dateTime={Data.datetime} className="text-sm font-medium text-slate-200">{formattedDate}</time>
                    </div>
                    {Data.for_sale && (
                        <div className="flex items-center gap-2">
                            <p className="text-right text-lg font-bold text-[#ffe644]">
                                {Data.price}
                            </p>
                            <img src={Coins} alt="Image de pieces" className="h-5 w-auto" />
                        </div> 
                    )}
                </div>
            </div>
        </article>
    );
}