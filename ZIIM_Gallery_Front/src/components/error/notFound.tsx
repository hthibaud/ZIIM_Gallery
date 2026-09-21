import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <main className="relative flex min-h-[calc(100vh-16rem)] items-center overflow-hidden border-b border-white/10 bg-[#180d2e] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(121,67,161,0.45),transparent_35%),radial-gradient(circle_at_82%_75%,rgba(212,175,55,0.2),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            ZIIM Gallery
          </p>
          <p className="text-8xl font-semibold leading-none tracking-tight text-white/15 sm:text-[10rem]">
            404
          </p>
          <h2 className="-mt-4 text-4xl font-semibold leading-tight tracking-tight sm:-mt-6 sm:text-6xl">
            Cette salle n&apos;existe pas.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            L&apos;œuvre ou la page que tu recherches semble avoir disparu de la galerie.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-lg bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#180d2e] transition hover:bg-[#e5c65f]"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
};

export default notFound;
