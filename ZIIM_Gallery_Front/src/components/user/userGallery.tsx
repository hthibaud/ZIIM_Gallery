import ArtworkGalleryCard from "../item/artworkGalleryCard";

type UserGalleryProps = {
    userId: string;
    title?: string;
    description?: string;
}

export default function UserGallery({
    userId,
    title = "Ma galerie",
    description = "Découvrez les œuvres de cette galerie.",
}: UserGalleryProps) {

    const backgroundColor = "#180d2e"
    const artworkGalleryCardBackgroundColor = "#7943A1"
    const userName = "Username"

    return (
        <section
            className="px-5 py-16 sm:px-8 lg:px-12"
            style={{ backgroundColor }}
        >
            <div className="mx-auto max-w-7xl">
                <header className="mx-auto mb-12 max-w-2xl text-center text-white">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                        Gallery de {userName}
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
                    <div className="mx-auto mt-5 h-px w-16 bg-[#d4af37]" />
                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70">{description}</p>
                </header>

                <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                    <ArtworkGalleryCard user_id={userId} artwork_id="0" card_backgound_color={artworkGalleryCardBackgroundColor}/>
                </div>
            </div>
        </section>
    )
}