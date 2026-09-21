import Hero from '../components/home/hero';
import PaintCarousel from '../components/home/paintCarousel';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-[#180d2e]">
      <Hero />
      <PaintCarousel />
    </main>
  );
}