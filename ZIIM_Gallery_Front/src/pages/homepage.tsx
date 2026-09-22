import Hero from '../components/home/hero';
import PaintCarousel from '../components/home/paintCarousel';

export default function Homepage() {
    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
                <div className="h-160 w-7xl flex-none rounded-full bg-zinc-900/30 blur-[120px]" />
            </div>
            <div className="relative z-10 flex w-full flex-col">
                <Hero />
                <PaintCarousel />
            </div>
            
        </main>
    );
}