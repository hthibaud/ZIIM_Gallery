import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import UserParam from "./userParam";
import Paint from "../../assets/icons/paint/paint-32.png";

type UserSettings = {
    username: string | null;
    bio: string | null;
    profile_picture: string | null;
    profile_banner: string | null;
};

type UserData = {
    isParamOpen: boolean;
    username: string;
    bio: string;
    avatar: File | null;
    banner: File | null;
    error: string;
    isSaving: boolean;
};

type UserHeaderParamProps = {
    user: UserSettings;
    onUserUpdated: (user: UserSettings) => void;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export default function UserHeaderParam({ user, onUserUpdated }: UserHeaderParamProps) {
    const [userData, setUserData] = useState<UserData>({
        isParamOpen: false,
        username: user.username ?? "",
        bio: user.bio ?? "",
        avatar: null,
        banner: null,
        error: "",
        isSaving: false,
    });

    useEffect(() => {
        setUserData((currentData) => ({
            ...currentData,
            username: user.username ?? "",
            bio: user.bio ?? "",
        }));
    }, [user]);

    function setError(error: string) {
        setUserData((currentData) => ({ ...currentData, error }));
    }

    function selectImage(event: ChangeEvent<HTMLInputElement>, type: "avatar" | "banner") {
        const file = event.target.files?.[0] ?? null;
        if (file && !file.type.startsWith("image/")) {
            setError("Veuillez choisir un fichier image.");
            return;
        }
        if (file && file.size > (type === "avatar" ? 5 : 8) * 1024 * 1024) {
            setError(type === "avatar" ? "L'avatar doit faire moins de 5 Mo." : "La bannière doit faire moins de 8 Mo.");
            return;
        }
        setError("");
        setUserData((currentData) => ({
            ...currentData,
            avatar: type === "avatar" ? file : currentData.avatar,
            banner: type === "banner" ? file : currentData.banner,
        }));
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
            setError("Reconnectez-vous pour modifier votre profil.");
            return;
        }

        setUserData((currentData) => ({ ...currentData, isSaving: true }));
        setError("");
        
        try {
            const profileResponse = await fetch(`${API_URL}/user/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username: userData.username, bio: userData.bio }),
            });
            
            if (!profileResponse.ok) throw new Error("Les informations du profil n'ont pas pu être enregistrées.");

            let updatedUser = await profileResponse.json() as UserSettings;
            
            if (userData.avatar) {
                const result = await uploadImage(token, userData.avatar, "/user/avatar");
                updatedUser = { ...updatedUser, profile_picture: result.avatar_key ?? updatedUser.profile_picture };
            }
            if (userData.banner) {
                const result = await uploadImage(token, userData.banner, "/user/banner");
                updatedUser = { ...updatedUser, profile_banner: result.banner_key ?? updatedUser.profile_banner };
            }

            onUserUpdated(updatedUser);
            setUserData((currentData) => ({
                ...currentData,
                avatar: null,
                banner: null,
                isParamOpen: false,
            }));
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Une erreur est survenue.");
        } finally {
            setUserData((currentData) => ({ ...currentData, isSaving: false }));
        }
    }

    return (
        <>
            {/* Barre d'outils flottante type "Pilule" */}
            <nav 
                aria-label="Actions de la galerie" 
                className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-950/50 p-1.5 shadow-lg backdrop-blur-md sm:right-6 sm:top-6"
            >
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                    Ajouter une œuvre
                </button>
                
                <button
                    type="button"
                    onClick={() => setUserData((currentData) => ({ ...currentData, isParamOpen: true }))}
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                    Paramètres
                </button>
                
                <button
                    type="button"
                    aria-label="Personnaliser la page profil"
                    title="Personnaliser la page profil"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-zinc-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                    {/* Opacité ajustée pour fondre l'icône dans l'UI sombre, au lieu d'un 'invert' trop brutal */}
                    <img src={Paint} alt="" className="h-4 w-4 opacity-75 invert transition-opacity hover:opacity-100" />
                </button>
            </nav>

            {userData.isParamOpen && (
                <UserParam
                    username={userData.username}
                    bio={userData.bio}
                    avatar={userData.avatar}
                    banner={userData.banner}
                    error={userData.error}
                    isSaving={userData.isSaving}
                    onClose={() => setUserData((currentData) => ({ ...currentData, isParamOpen: false }))}
                    onSubmit={saveSettings}
                    onUsernameChange={(username) => setUserData((currentData) => ({ ...currentData, username }))}
                    onBioChange={(bio) => setUserData((currentData) => ({ ...currentData, bio }))}
                    onImageChange={selectImage}
                />
            )}
        </>
    );
}