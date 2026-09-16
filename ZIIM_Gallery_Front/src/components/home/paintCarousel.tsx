import ArtworkGalleryCard from '../item/artworkGalleryCard';

export default function paintCarousel() {
  const artworks = Array.from({ length: 5 }, (_, index) => ({
    id: String(index),
    userId: '0',
  }));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 no-scrollbar">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="w-80 shrink-0 snap-start">
            <ArtworkGalleryCard
              user_id={artwork.userId}
              artwork_id={artwork.id}
              card_backgound_color="#7943A1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}