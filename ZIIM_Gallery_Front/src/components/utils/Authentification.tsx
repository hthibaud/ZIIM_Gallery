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
      setError("Choisis un fichier image.");
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
      setError("Choisis un fichier image pour la bannière.");
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

    if (step === 1 ) {
      const userIdRegex = /^(?=.{3,20}$)[a-z0-9]+([_-][a-z0-9]+)*$/;
      const emailRegex = /^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,64}$/;
      if (!userIdRegex.test(userId)) {
        setError("Le champ ne peut contenir que des lettres minuscules et des chiffres. Les tirets ( - ) et underscores ( _ ) sont autorisés uniquement entre deux caractères, sans être collés ni répétés.")
        return;
      } else if (!emailRegex.test(email)) {
        setError("Veuillez renseigner une adresse e-mail valide (ex. : nom@domaine.fr).")
        return;
      } else if (!passwordRegex.test(password)) {
        setError("Le mot de passe doit comporter au moins 8 caractères et inclure au moins une majuscule, une minuscule, un chiffre et un caractère spécial.")
        return;
      } else if (!userId || !email || !password){
        setError("Renseigne tous les champs.");
        return;
      }
    }

    if (step === 2) {
      const usernameRegex = /^[^\r\n]{2,12}$/;
      const bioRegex = /^[\s\S]{2,150}$/;
      if (!usernameRegex.test(username) && username) {
        setError("Le nom afficher doit comporter entre 2 et 12 caractères.")
        return;
      } else if (!bioRegex.test(bio) && bio) {
        setError("La bio doit comporter entre 2 et 150 caractères.")
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
      throw new Error("Le compte a été créé, mais la connexion automatique a échoué.");
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

    if (!response.ok) {
      throw new Error("Le compte est créé, mais la photo n'a pas pu être envoyée.");
    }
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

    if (!response.ok) {
      throw new Error("Le compte est créé, mais la bannière n'a pas pu être envoyée.");
    }
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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111827] px-4 py-12">
      <section className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#1f2937] shadow-2xl shadow-black/30">
        <div className="border-b border-white/10 bg-linear-to-r from-cyan-500 to-orange-400 px-6 py-8 text-slate-950 sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em]">ZIIM Gallery</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Construis ton univers.</h1>
          <p className="mt-2 max-w-lg text-sm text-slate-900/75">Encore quelques détails et ta galerie prendra vie.</p>
        </div>

        <div className="px-6 py-6 sm:px-10">
          <div className="mb-8 flex items-center gap-2" aria-label={`Étape ${step} sur 3`}>
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-1 items-center gap-2">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${item <= step ? "bg-cyan-400 text-slate-950" : "bg-slate-700 text-slate-400"}`}>
                  {item}
                </span>
                {item < 3 && <span className={`h-1 flex-1 rounded-full ${item < step ? "bg-cyan-400" : "bg-slate-700"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-white">Commençons par toi</h2>
                  <p className="mt-1 text-sm text-slate-400">Tes identifiants pour accéder à ta galerie.</p>
                </div>
                <label className="block text-sm font-medium text-slate-200">Identifiant
                  <input value={userId} onChange={(event) => setUserId(event.target.value)} required className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="ex. marie.art" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Email
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="toi@email.com" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Mot de passe
                  <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="8 caractères minimum" />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-white">Présente-toi</h2>
                  <p className="mt-1 text-sm text-slate-400">Ces informations seront visibles sur ton profil.</p>
                </div>
                <label className="block text-sm font-medium text-slate-200">Nom affiché
                  <input value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder={userId || "Ton nom d'artiste"} />
                </label>
                <label className="block text-sm font-medium text-slate-200">Bio
                  <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={5} maxLength={150} className="mt-2 w-full resize-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Quelques mots sur ton univers artistique..." />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-white">Personnalise ton profil</h2>
                  <p className="mt-1 text-sm text-slate-400">Ajoute une photo et une bannière, tu pourras les changer plus tard.</p>
                </div>
                <label className="mx-auto flex aspect-square w-40 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-cyan-400/60 bg-slate-800 text-center transition hover:border-cyan-300 hover:bg-slate-700">
                  {avatarPreview ? <img src={avatarPreview} alt="Aperçu de la photo de profil" className="h-full w-full object-cover" /> : <span className="px-5 text-sm text-slate-300">Choisir une image<br /><span className="text-xs text-slate-500">JPG, PNG, WEBP · 5 Mo max</span></span>}
                  <input type="file" accept="image/*" onChange={selectAvatar} className="sr-only" />
                </label>
                <label className="flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-orange-400/60 bg-slate-800 text-center transition hover:border-orange-300 hover:bg-slate-700">
                  {bannerPreview ? <img src={bannerPreview} alt="Aperçu de la bannière" className="h-full w-full object-cover" /> : <span className="text-sm text-slate-300">Choisir une bannière<br /><span className="text-xs text-slate-500">JPG, PNG, WEBP · 8 Mo max</span></span>}
                  <input type="file" accept="image/*" onChange={selectBanner} className="sr-only" />
                </label>
                <p className="text-center text-xs text-slate-500">Les deux images sont facultatives.</p>
              </div>
            )}

            {error && <p role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}

            <div className="mt-8 flex justify-between gap-3">
              {step > 1 ? <button type="button" onClick={() => { setError(""); setStep((currentStep) => currentStep - 1); }} className="rounded-xl border border-slate-600 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-700">Retour</button> : <span />}
              {step < 3 ? <button type="button" onClick={nextStep} className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Continuer</button> : <span/> }
              {step === 3 ? <button type="submit" disabled={isSubmitting} className="rounded-xl bg-orange-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-orange-300 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Création..." : "Créer ma galerie"}</button> : ""}
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">Tu as déjà un compte ? <a href="/login" className="font-bold text-cyan-300 hover:text-cyan-200">Connecte-toi</a></p>
        </div>
      </section>
    </main>
  );

}
