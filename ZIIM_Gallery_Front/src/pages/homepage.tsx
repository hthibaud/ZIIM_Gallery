import Hero from '../components/home/hero';
import PaintCarousel from '../components/home/paintCarousel';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <PaintCarousel />
    </main>
  );
}