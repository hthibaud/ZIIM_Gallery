import { useState } from "react";
import UserHeaderParam from "./userHeaderParam";
import UserPicture from "./userPicture";
import { useUser } from "../../hooks/useUser";

type UserBannerCardProps = {
    id: string;
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
    const { user: fetchedUser, isLoading, error } = useUser(id);
    const [updatedUser, setUpdatedUser] = useState<typeof fetchedUser>(null);
    const user = updatedUser ?? fetchedUser;
    const connectedUserId = getConnectedUserId();
    
    const gallery_name: string = "";
    const posts_count: number = 0;
    const followers_count: number = 0;
    const following_count: number = 0;
    
    const minioUrl = import.meta.env.VITE_MINIO_URL ?? "http://localhost:9000";
    const bannerUrl = user?.profile_banner ? `${minioUrl}/avatars/${user.profile_banner}` : null;

    if (error) {
        return (
            <div className="flex h-48 items-center justify-center border-b border-zinc-200 bg-zinc-50 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
                <p>{error}</p>
            </div>
        );
    }

    if (isLoading || !user) {
        return (
            <div className="flex h-64 items-center justify-center border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white" />
            </div>
        );
    }

    return (
        <section className="overflow-hidden border-b border-zinc-200 bg-white text-left dark:border-zinc-800 dark:bg-zinc-950">
            <div className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 sm:h-52">
                {bannerUrl ? (
                    <img 
                        src={bannerUrl} 
                        alt="Bannière du profil" 
                        className="absolute inset-0 h-full w-full object-cover" 
                    />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900" />
                )}
                
                <div className="absolute inset-0 bg-black/10" />

                {connectedUserId === id && (
                    <UserHeaderParam 
                        user={user} 
                        onUserUpdated={(profileUpdate) => setUpdatedUser((currentUser) => ({ ...user, ...currentUser, ...profileUpdate }))} 
                    />
                )}

                {gallery_name && (
                    <span className="absolute bottom-4 right-5 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {gallery_name}
                    </span>
                )}
            </div>

            <div className="relative px-5 pb-8 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    
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

                    {connectedUserId !== id && (
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-white dark:focus:ring-offset-zinc-950 sm:mb-1 sm:w-auto"
                        >
                            Suivre
                        </button>
                    )}
                </div>

                {user.bio && (
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {user.bio}
                    </p>
                )}

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