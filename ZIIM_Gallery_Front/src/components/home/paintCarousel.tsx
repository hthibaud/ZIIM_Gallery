import ArtworkGalleryCard from '../item/artworkGalleryCard';

export default function PaintCarousel() {
  const artworks = Array.from({ length: 5 }, (_, index) => ({
    id: String(index),
    userId: '0',
  }));
  return (
    <section id="recent-artworks" className="bg-[#180d2e] px-5 pb-24 pt-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">Sélection</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Œuvres récentes</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/60">Un aperçu des créations qui donnent vie à la communauté ZIIM.</p>
        </header>

        <div className="flex gap-5 overflow-x-auto py-4 no-scrollbar">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="w-80 shrink-0">
              <ArtworkGalleryCard
                user_id={artwork.userId}
                artwork_id={artwork.id}
                card_backgound_color="#7943A1"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}