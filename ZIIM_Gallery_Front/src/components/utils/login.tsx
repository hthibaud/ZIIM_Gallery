import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as authenticate } from "../../api/auth";

export default function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await authenticate({
                user_id: userId,
                password,
            });
            navigate("/");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Échec de l'authentification.");
            setIsLoading(false);
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center bg-[url('./assets/bg-gallery.png')] bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-6 lg:px-8">
            
            {/* Voile sombre pour assombrir l'image de fond et faire ressortir le formulaire */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            {/* Lueur d'ambiance au centre, par-dessus l'image assombrie */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-120 w-120 rounded-full bg-zinc-900/40 blur-[120px]" />
            </div>

            {/* Le formulaire (z-10 pour être au-dessus du fond et du voile) */}
            <section className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/95 shadow-2xl backdrop-blur-md">
                <div className="px-6 py-8 sm:px-8 sm:py-10">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-white">
                            Bon retour
                        </h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            Connectez-vous pour accéder à votre galerie.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={userId}
                                id="user_id"
                                name="user_id"
                                placeholder="Identifiant"
                                required
                                onChange={(event) => setUserId(event.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                id="password"
                                name="password"
                                placeholder="Mot de passe"
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900"
                            />
                        </div>

                        {error && (
                            <div role="alert" className="flex items-center gap-3 rounded-lg border border-red-900/50 bg-red-900/10 px-4 py-3 text-sm text-red-400">
                                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="mr-2 h-4 w-4 animate-spin text-zinc-950" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Connexion...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-500">
                        Vous n'avez pas de compte ?{' '}
                        <Link to="/register" className="font-medium text-white transition-colors hover:text-zinc-300">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}