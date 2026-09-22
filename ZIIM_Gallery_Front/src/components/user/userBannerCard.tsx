import { useEffect, useState } from "react";
import UserHeaderParam from "./userHeaderParam";
import UserPicture from "./userPicture";

type UserBannerCardProps = {
    id: string;
};

type User = {
    id: number;
    user_id: string;
    username: string | null;
    bio: string | null;
    profile_picture: string | null;
    profile_banner: string | null;
    date: string;
    gallery_id: string | null;
};

function getConnectedUserId() {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).sub as string;
    } catch {
        return null;
    }
}

export default function UserBannerCard({ id }: UserBannerCardProps) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const connectedUserId = getConnectedUserId();
    
    // Constantes à relier à ton backend plus tard
    const gallery_name: string = "";
    const posts_count: number = 0;
    const followers_count: number = 0;
    const following_count: number = 0;
    
    const minioUrl = import.meta.env.VITE_MINIO_URL ?? "http://localhost:9000";
    const bannerUrl = user?.profile_banner ? `${minioUrl}/avatars/${user.profile_banner}` : null;

    useEffect(() => {
        if (!id) return;

        fetch(`${import.meta.env.VITE_API_URL}/user/id/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Utilisateur introuvable");
                }
                return response.json();
            })
            .then(setUser)
            .catch((requestError: Error) => setError(requestError.message));
    }, [id]);

    // État d'erreur épuré
    if (error) {
        return (
            <div className="flex h-48 items-center justify-center border-b border-zinc-200 bg-zinc-50 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
                <p>{error}</p>
            </div>
        );
    }

    // État de chargement professionnel (spinner)
    if (!user) {
        return (
            <div className="flex h-64 items-center justify-center border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white" />
            </div>
        );
    }

    return (
        <section className="overflow-hidden border-b border-zinc-200 bg-white text-left dark:border-zinc-800 dark:bg-zinc-950">
            {/* Zone de la bannière */}
            <div className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 sm:h-52">
                {bannerUrl ? (
                    <img 
                        src={bannerUrl} 
                        alt="Bannière du profil" 
                        className="absolute inset-0 h-full w-full object-cover" 
                    />
                ) : (
                    /* Fallback propre si pas de bannière (dégradé gris très subtil) */
                    <div className="absolute inset-0 bg-linear-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900" />
                )}
                
                {/* Léger voile pour assurer le contraste si tu as des boutons par-dessus */}
                <div className="absolute inset-0 bg-black/10" />

                {connectedUserId === id && (
                    <UserHeaderParam 
                        user={user} 
                        onUserUpdated={(updatedUser) => setUser((currentUser) => currentUser ? { ...currentUser, ...updatedUser } : currentUser)} 
                    />
                )}

                {gallery_name && (
                    <span className="absolute bottom-4 right-5 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {gallery_name}
                    </span>
                )}
            </div>

            {/* Zone des informations utilisateur */}
            <div className="relative px-5 pb-8 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    
                    {/* Avatar et Nom */}
                    <div className="flex items-end gap-5">
                        <div className="-mt-12 inline-block rounded-full border-4 border-white bg-white dark:border-zinc-950 dark:bg-zinc-950 sm:-mt-16">
                            <UserPicture profilePicture={user.profile_picture} size={112} />
                        </div>
                        <div className="mb-1">
                            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                {user.username || id}
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                @{id || "inconnu"}
                            </p>
                        </div>
                    </div>

                    {/* Bouton d'action principal */}
                    {connectedUserId !== id && (
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-white dark:focus:ring-offset-zinc-950 sm:mb-1 sm:w-auto"
                        >
                            Suivre
                        </button>
                    )}
                </div>

                {/* Biographie */}
                {user.bio && (
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {user.bio}
                    </p>
                )}

                {/* Statistiques (Design compact en ligne) */}
                <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    <div className="flex items-center gap-1.5">
                        <dd className="font-semibold text-zinc-900 dark:text-white">{posts_count}</dd>
                        <dt className="text-zinc-500 dark:text-zinc-400">Publications</dt>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <dd className="font-semibold text-zinc-900 dark:text-white">{followers_count}</dd>
                        <dt className="text-zinc-500 dark:text-zinc-400">Abonnés</dt>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <dd className="font-semibold text-zinc-900 dark:text-white">{following_count}</dd>
                        <dt className="text-zinc-500 dark:text-zinc-400">Abonnements</dt>
                    </div>
                </dl>
            </div>
        </section>
    );
}