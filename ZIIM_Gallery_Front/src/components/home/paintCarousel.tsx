import React from 'react';
import { PaintCard } from './paintCard';

export default function paintCarousel() {
  const paints: { id: string | number; src: string; title: string }[] = [];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 no-scrollbar">
        {paints.map((paint) => (
          <PaintCard
            key={paint.id}
            src={paint.src}
            alt={paint.title}
            title={paint.title}
          />
        ))}
      </div>
    </div>
  );
}