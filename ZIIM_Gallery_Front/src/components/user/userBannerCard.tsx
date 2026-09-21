import { useEffect, useState } from "react";
import UserHeaderParam from "./userHeaderParam";
import UserPicture from "./userPicture";

type UserBannerCardProps = {
    id: string;
};

type User = {
    id: number;
    user_id:string;
    username: string;
    bio: string;
    date: string;
    gallery_id: string | null;
};


export default function UserBannerCard({ id }: UserBannerCardProps) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const connectedUserId = "0"
    
    const gallery_name: string = ""
    const posts_count: number = 0
    const followers_count: number = 0
    const following_count: number = 0

    console.log(`${import.meta.env.VITE_API_URL}/user/id/${id}`)

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

    if (error) return <p>{error}</p>;
    if (!user) return <p>Chargement...</p>;

    return (
        <section className="overflow-hidden border-b border-slate-200 bg-white text-left shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="relative h-40 overflow-hidden bg-slate-950 sm:h-52">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#0ea5e9_0,transparent_35%),radial-gradient(circle_at_80%_80%,#f97316_0,transparent_40%)] opacity-90" />
                <div className="absolute inset-0 bg-slate-950/30" />
                {connectedUserId === id && <UserHeaderParam />}
                <span className="absolute bottom-4 right-5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {gallery_name}
                </span>
            </div>

            <div className="relative px-5 pb-5 sm:px-8 sm:pb-6">
                <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-end gap-4 mt-2">
                        <div className="rounded-full bg-white p-1 shadow-lg dark:bg-slate-900">
                            <UserPicture id={id} size={96} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-950 dark:text-white">{user.username}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">@{id || "inconnu"}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Suivre
                    </button>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {user.bio}
                </p>

                <dl className="mt-5 flex gap-6 text-sm">
                    <div>
                        <dt className="text-slate-500 dark:text-slate-400">Publications</dt>
                        <dd className="font-semibold text-slate-950 dark:text-white">{posts_count}</dd>
                    </div>
                    <div>
                        <dt className="text-slate-500 dark:text-slate-400">Abonnés</dt>
                        <dd className="font-semibold text-slate-950 dark:text-white">{followers_count}</dd>
                    </div>
                    <div>
                        <dt className="text-slate-500 dark:text-slate-400">Abonnements</dt>
                        <dd className="font-semibold text-slate-950 dark:text-white">{following_count}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}