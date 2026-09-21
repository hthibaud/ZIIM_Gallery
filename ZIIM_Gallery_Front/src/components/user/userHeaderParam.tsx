import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Paint from '../../assets/icons/paint/paint-32.png'

type UserSettings = {
    username: string | null;
    bio: string | null;
    profile_picture: string | null;
    profile_banner: string | null;
};

type UserHeaderParamProps = {
    user: UserSettings;
    onUserUpdated: (user: UserSettings) => void;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export default function UserHeaderParam({ user, onUserUpdated }: UserHeaderParamProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(user.username ?? "");
    const [bio, setBio] = useState(user.bio ?? "");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setUsername(user.username ?? "");
        setBio(user.bio ?? "");
    }, [user]);

    function selectImage(event: ChangeEvent<HTMLInputElement>, type: "avatar" | "banner") {
        const file = event.target.files?.[0] ?? null;
        if (file && !file.type.startsWith("image/")) {
            setError("Choisis un fichier image.");
            return;
        }
        if (file && file.size > (type === "avatar" ? 5 : 8) * 1024 * 1024) {
            setError(type === "avatar" ? "La photo doit faire moins de 5 Mo." : "La bannière doit faire moins de 8 Mo.");
            return;
        }
        setError("");
        type === "avatar" ? setAvatar(file) : setBanner(file);
    }

    async function uploadImage(token: string, file: File, endpoint: string) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        if (!response.ok) throw new Error("L'image n'a pas pu être enregistrée.");
        return response.json() as Promise<{ avatar_key?: string; banner_key?: string }>;
    }

    async function saveSettings(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError("Reconnecte-toi pour modifier ton profil.");
            return;
        }

        setIsSaving(true);
        setError("");
        try {
            const profileResponse = await fetch(`${API_URL}/user/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, bio }),
            });
            if (!profileResponse.ok) throw new Error("Les informations du profil n'ont pas pu être enregistrées.");

            let updatedUser = await profileResponse.json() as UserSettings;
            if (avatar) {
                const result = await uploadImage(token, avatar, "/user/avatar");
                updatedUser = { ...updatedUser, profile_picture: result.avatar_key ?? updatedUser.profile_picture };
            }
            if (banner) {
                const result = await uploadImage(token, banner, "/user/banner");
                updatedUser = { ...updatedUser, profile_banner: result.banner_key ?? updatedUser.profile_banner };
            }

            onUserUpdated(updatedUser);
            setAvatar(null);
            setBanner(null);
            setIsOpen(false);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Une erreur est survenue.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <>
        <nav aria-label="Actions de la galerie" className="absolute right-4 top-2 z-10 flex items-center gap-2 rounded-xl border border-white/25 bg-black/25 p-2 shadow-lg backdrop-blur-md sm:right-6 sm:top-6">
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent sm:text-sm"
            >
                Ajouter une oeuvre
            </button>
            <button
                type="button"
                className="rounded-lg border border-white/40 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent sm:text-sm"
            >
                Paramètres
            </button>
            <button
                type="button"
                aria-label="Personnaliser la page profil"
                title="Personnaliser la page profil"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/40 bg-white/10 text-xl text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
                <img src={Paint} alt="" className="h-5 w-auto invert" />
            </button>
        </nav>
        {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
            <form onSubmit={saveSettings} className="w-full max-w-lg space-y-5 rounded-2xl bg-slate-900 p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Paramètres du profil</h2>
                    <button type="button" onClick={() => setIsOpen(false)} aria-label="Fermer" className="text-2xl text-slate-400 hover:text-white">×</button>
                </div>
                <label className="block text-sm font-medium">Nom affiché
                    <input value={username} onChange={(event) => setUsername(event.target.value)} maxLength={100} className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2" />
                </label>
                <label className="block text-sm font-medium">Bio
                    <textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={250} rows={4} className="mt-2 w-full resize-none rounded-lg border border-slate-600 bg-slate-800 px-3 py-2" />
                </label>
                <label className="block text-sm font-medium">Photo de profil
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => selectImage(event, "avatar")} className="mt-2 block w-full text-sm text-slate-300" />
                </label>
                <label className="block text-sm font-medium">Bannière
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => selectImage(event, "banner")} className="mt-2 block w-full text-sm text-slate-300" />
                </label>
                {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg border border-slate-600 px-4 py-2 text-sm">Annuler</button>
                    <button type="submit" disabled={isSaving} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-60">{isSaving ? "Enregistrement..." : "Enregistrer"}</button>
                </div>
            </form>
        </div>}
        </>
    )
}