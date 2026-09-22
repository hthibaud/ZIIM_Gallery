import type { ChangeEvent, FormEvent } from "react";

type UserParamProps = {
    username: string;
    bio: string;
    avatar: File | null;
    banner: File | null;
    error: string;
    isSaving: boolean;
    onClose: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onUsernameChange: (username: string) => void;
    onBioChange: (bio: string) => void;
    onImageChange: (event: ChangeEvent<HTMLInputElement>, type: "avatar" | "banner") => void;
};

export default function UserParam({
    username,
    bio,
    avatar,
    banner,
    error,
    isSaving,
    onClose,
    onSubmit,
    onUsernameChange,
    onBioChange,
    onImageChange,
}: UserParamProps) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity sm:p-6" 
            role="presentation" 
            onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
            <form 
                onSubmit={onSubmit} 
                className="flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl"
            >
                {/* En-tête */}
                <div className="flex items-center justify-between border-b border-zinc-800/60 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight text-white">Paramètres du profil</h2>
                        <p className="mt-1 text-sm text-zinc-400">Gérez vos informations publiques et votre apparence.</p>
                    </div>
                    <button 
                        type="button" 
                        onClick={onClose} 
                        aria-label="Fermer" 
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenu défilant */}
                <div className="space-y-8 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-zinc-800">
                    
                    {/* Section : Informations publiques */}
                    <section className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="username" className="block text-sm font-medium text-zinc-300">
                                Nom affiché
                            </label>
                            <input 
                                id="username"
                                value={username} 
                                onChange={(event) => onUsernameChange(event.target.value)} 
                                maxLength={100} 
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                                placeholder="Votre nom d'utilisateur"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="bio" className="block text-sm font-medium text-zinc-300">
                                    Biographie
                                </label>
                                <span className="text-xs font-medium text-zinc-500">{bio.length}/250</span>
                            </div>
                            <textarea 
                                id="bio"
                                value={bio} 
                                onChange={(event) => onBioChange(event.target.value)} 
                                maxLength={250} 
                                rows={3} 
                                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                                placeholder="Quelques mots sur vous..."
                            />
                        </div>
                    </section>

                    {/* Section : Identité visuelle */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-medium text-zinc-300">Images du profil</h3>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Upload Avatar */}
                            <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-zinc-800 bg-zinc-900/20 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-900/50">
                                <div className="rounded-full bg-zinc-800 p-2.5 text-zinc-400 group-hover:text-white transition-colors">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <span className="block text-sm font-medium text-zinc-200">Avatar</span>
                                    <span className="mt-1 block max-w-35 truncate text-xs text-zinc-500">
                                        {avatar?.name ?? "JPG, PNG (Max 5 Mo)"}
                                    </span>
                                </div>
                                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => onImageChange(event, "avatar")} className="sr-only" />
                            </label>

                            {/* Upload Bannière */}
                            <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-zinc-800 bg-zinc-900/20 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-900/50">
                                <div className="rounded-md bg-zinc-800 p-2.5 text-zinc-400 group-hover:text-white transition-colors">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <span className="block text-sm font-medium text-zinc-200">Bannière</span>
                                    <span className="mt-1 block max-w-35 truncate text-xs text-zinc-500">
                                        {banner?.name ?? "JPG, PNG (Max 8 Mo)"}
                                    </span>
                                </div>
                                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => onImageChange(event, "banner")} className="sr-only" />
                            </label>
                        </div>
                    </section>

                    {/* Gestion des erreurs */}
                    {error && (
                        <div role="alert" className="flex items-center gap-3 rounded-lg border border-red-900/50 bg-red-900/10 px-4 py-3 text-sm text-red-400">
                            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                {/* Pied de page / Actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-zinc-800/60 bg-zinc-900/30 px-6 py-4 sm:flex-row sm:justify-end">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    >
                        Annuler
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSaving} 
                        className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-all hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSaving ? (
                            <>
                                <svg className="mr-2 h-4 w-4 animate-spin text-zinc-950" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Enregistrement...
                            </>
                        ) : (
                            "Enregistrer les modifications"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}