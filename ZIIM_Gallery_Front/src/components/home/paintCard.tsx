import React from 'react';

export interface PaintCardProps {
  src: string;
  alt: string;
  title?: string;
}

export const PaintCard: React.FC<PaintCardProps> = ({ src, alt, title }) => {
  return (
    <div className="relative shrink-0 snap-center w-64 aspect-square overflow-hidden rounded-2xl bg-neutral-900 shadow-lg group">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {title && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
          <p className="text-white text-sm font-medium truncate">{title}</p>
        </div>
      )}
    </div>
  );
};