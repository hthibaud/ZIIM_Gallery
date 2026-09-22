import ArtworkGalleryCard from "../item/artworkGalleryCard";
import { useUser } from '../../hooks/useUser';

type UserGalleryProps = {
    userId: string;
    title?: string;
    description?: string;
    customBgColor?: string; 
    customCardColor?: string;
}

export default function UserGallery({
    userId,
    title = "Ma galerie",
    description = "Découvrez les œuvres de cette galerie.",
    customBgColor,
    customCardColor,
}: UserGalleryProps) {
    const { user, isLoading, error } = useUser(userId);
    
    const userName = user?.username || "Artiste inconnu";
    const dummyArtworks = Array.from({ length: 11 }, (_, i) => String(i));

    if (isLoading) {
        return <div className="p-12 text-center text-zinc-400">Chargement de la galerie...</div>;
    }

    if (error) {
        return <div className="p-12 text-center text-red-500">Erreur : {error}</div>;
    }

    return (
        <section
            className={`px-5 py-12 sm:px-8 sm:py-20 lg:px-12 ${!customBgColor && "bg-zinc-950"}`}
            style={customBgColor ? { backgroundColor: customBgColor } : undefined}
        >
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 border-b border-zinc-800/60 pb-8 sm:mb-16">
                    <p className="mb-2 text-sm font-medium text-zinc-500">
                        Galerie de {userName}
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
                            {description}
                        </p>
                    )}
                </header>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-12">
                    {dummyArtworks.map((id) => (
                        <ArtworkGalleryCard 
                            key={id} 
                            user_id={userId} 
                            artwork_id={id} 
                            card_backgound_color={customCardColor ?? "#18181b"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}