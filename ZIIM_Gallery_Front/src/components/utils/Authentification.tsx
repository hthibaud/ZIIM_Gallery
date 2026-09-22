import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type UserResponse = {
    id: number;
    user_id: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export default function AuthentificationComponent() {
    const [userId, setUserId] = useState("");
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!avatar) {
            setAvatarPreview(null);
            return;
        }
        const previewUrl = URL.createObjectURL(avatar);
        setAvatarPreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [avatar]);

    useEffect(() => {
        if (!banner) {
            setBannerPreview(null);
            return;
        }
        const previewUrl = URL.createObjectURL(banner);
        setBannerPreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [banner]);

    function selectAvatar(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        if (file && !file.type.startsWith("image/")) {
            setError("Veuillez choisir un fichier image.");
            return;
        }
        if (file && file.size > 5 * 1024 * 1024) {
            setError("La photo doit faire moins de 5 Mo.");
            return;
        }
        setError("");
        setAvatar(file);
    }

    function selectBanner(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        if (file && !file.type.startsWith("image/")) {
            setError("Veuillez choisir un fichier image pour la bannière.");
            return;
        }
        if (file && file.size > 8 * 1024 * 1024) {
            setError("La bannière doit faire moins de 8 Mo.");
            return;
        }
        setError("");
        setBanner(file);
    }

    function nextStep() {
        setError("");

        if (step === 1) {
            const userIdRegex = /^(?=.{3,20}$)[a-z0-9]+([_-][a-z0-9]+)*$/;
            const emailRegex = /^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,64}$/;
            
            if (!userId || !email || !password) {
                setError("Veuillez renseigner tous les champs.");
                return;
            }
            if (!userIdRegex.test(userId)) {
                setError("L'identifiant ne peut contenir que des minuscules et chiffres (tirets/underscores autorisés entre les caractères).");
                return;
            }
            if (!emailRegex.test(email)) {
                setError("Veuillez renseigner une adresse e-mail valide.");
                return;
            }
            if (!passwordRegex.test(password)) {
                setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
                return;
            }
        }

        if (step === 2) {
            const usernameRegex = /^[^\r\n]{2,12}$/;
            const bioRegex = /^[\s\S]{2,150}$/;
            
            if (username && !usernameRegex.test(username)) {
                setError("Le nom affiché doit comporter entre 2 et 12 caractères.");
                return;
            }
            if (bio && !bioRegex.test(bio)) {
                setError("La bio doit comporter entre 2 et 150 caractères.");
                return;
            }
        }

        setStep((currentStep) => Math.min(currentStep + 1, 3));
    }

    async function register() {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                username: username || userId,
                bio: bio || null,
                email,
                password,
                date: new Date().toISOString(),
                gallery_id: null,
            }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            const detail = Array.isArray(data?.detail)
                ? data.detail.map((item: { msg?: string }) => item.msg).filter(Boolean).join(" ")
                : data?.detail;
            throw new Error(detail ?? `Impossible de créer le compte (${response.status}).`);
        }
        return response.json() as Promise<UserResponse>;
    }

    async function login() {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, password }),
        });

        if (!response.ok) {
            throw new Error("Compte créé, mais la connexion automatique a échoué.");
        }
        const token: string = await response.json();
        localStorage.setItem("access_token", token);
        return token;
    }

    async function uploadAvatar(token: string) {
        if (!avatar) return;
        const formData = new FormData();
        formData.append("file", avatar);
        const response = await fetch(`${API_URL}/user/avatar`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        if (!response.ok) throw new Error("Compte créé, mais la photo n'a pas pu être envoyée.");
    }

    async function uploadBanner(token: string) {
        if (!banner) return;
        const formData = new FormData();
        formData.append("file", banner);
        const response = await fetch(`${API_URL}/user/banner`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        if (!response.ok) throw new Error("Compte créé, mais la bannière n'a pas pu être envoyée.");
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (step !== 3) return;

        setError("");
        setIsSubmitting(true);

        try {
            const user = await register();
            const token = await login();
            await uploadAvatar(token);
            await uploadBanner(token);
            window.location.href = `/user/${user.user_id}`;
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Une erreur est survenue.");
            setIsSubmitting(false); // Ajouté ici pour réactiver le bouton en cas d'erreur
        }
    }

    return (
        <main className="bg-[url('./assets/bg-gallery.png')] bg-cover bg-center bg-no-repeat flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <section className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                
                {/* Barre de progression minimaliste */}
                <div className="flex h-1 w-full bg-zinc-900">
                    <div 
                        className="h-full bg-white transition-all duration-300 ease-in-out" 
                        style={{ width: `${(step / 3) * 100}%` }} 
                    />
                </div>

                <div className="px-6 py-8 sm:px-8 sm:py-10">
                    {/* En-tête dynamique dynamique selon l'étape */}
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-white">
                            {step === 1 && "Créer un compte"}
                            {step === 2 && "Votre profil public"}
                            {step === 3 && "Identité visuelle"}
                        </h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            {step === 1 && "Rejoignez ZIIM Gallery et partagez votre univers."}
                            {step === 2 && "Ces informations seront visibles par la communauté."}
                            {step === 3 && "Ajoutez un avatar et une bannière (facultatif)."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* ÉTAPE 1 : Identifiants */}
                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="space-y-1.5">
                                    <label htmlFor="userId" className="block text-sm font-medium text-zinc-300">Identifiant</label>
                                    <input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500" placeholder="ex. marie.art" />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Adresse e-mail</label>
                                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500" placeholder="vous@exemple.com" />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Mot de passe</label>
                                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500" placeholder="8 caractères minimum" />
                                </div>
                            </div>
                        )}

                        {/* ÉTAPE 2 : Informations publiques */}
                        {step === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="space-y-1.5">
                                    <label htmlFor="username" className="block text-sm font-medium text-zinc-300">Nom affiché</label>
                                    <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500" placeholder={userId || "Votre nom d'artiste"} />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="bio" className="block text-sm font-medium text-zinc-300">Biographie</label>
                                        <span className="text-xs text-zinc-500">{bio.length}/150</span>
                                    </div>
                                    <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} maxLength={150} className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500" placeholder="Quelques mots sur votre univers..." />
                                </div>
                            </div>
                        )}

                        {/* ÉTAPE 3 : Médias */}
                        {step === 3 && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <label className="group mx-auto flex h-28 w-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-zinc-700 bg-zinc-900/50 transition-all hover:border-zinc-500 hover:bg-zinc-800">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Aperçu avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="text-center text-zinc-400 group-hover:text-white transition-colors">
                                            <svg className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            <span className="mt-1 block text-xs font-medium">Avatar</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectAvatar} className="sr-only" />
                                </label>

                                <label className="group flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 transition-all hover:border-zinc-500 hover:bg-zinc-800">
                                    {bannerPreview ? (
                                        <img src={bannerPreview} alt="Aperçu bannière" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="text-center text-zinc-400 group-hover:text-white transition-colors">
                                            <svg className="mx-auto mb-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <span className="block text-sm font-medium">Bannière du profil</span>
                                            <span className="mt-1 block text-xs text-zinc-500">JPG, PNG, WEBP (Max 8 Mo)</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectBanner} className="sr-only" />
                                </label>
                            </div>
                        )}

                        {/* Gestion des erreurs */}
                        {error && (
                            <div role="alert" className="flex items-center gap-3 rounded-lg border border-red-900/50 bg-red-900/10 px-4 py-3 text-sm text-red-400">
                                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-8 flex gap-3 pt-2">
                            {step > 1 && (
                                <button 
                                    type="button" 
                                    onClick={() => { setError(""); setStep((s) => s - 1); }} 
                                    className="flex w-full items-center justify-center rounded-lg border border-zinc-800 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                                >
                                    Retour
                                </button>
                            )}
                            
                            {step < 3 ? (
                                <button 
                                    type="button" 
                                    onClick={nextStep} 
                                    className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
                                >
                                    Continuer
                                </button>
                            ) : ""}

                            {step === 3 ? (
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="mr-2 h-4 w-4 animate-spin text-zinc-950" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                            Création...
                                        </>
                                    ) : (
                                        "Créer mon compte"
                                    )}
                                </button>
                            ) : ""}
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-500">
                        Vous avez déjà un compte ?{' '}
                        <a href="/login" className="font-medium text-white transition-colors hover:text-zinc-300">
                            Connectez-vous
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}