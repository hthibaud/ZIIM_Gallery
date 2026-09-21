import { useState, type FormEvent } from "react";

export default function AuthentificationComponent() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          username: userId,
          email,
          password,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail ?? "Registration failed");
      }

      window.location.href = "/login";
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    }
  }

  return (
    <main className="container mx-auto">
      <section className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
          <h1 className="text-4xl p-4 font-bold text-white">
            Créer votre compte
          </h1>

          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={userId}
                id="username"
                name="username"
                placeholder="pseudo"
                required
                onChange={(event) => setUserId(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder=" mail@email.com"
                required
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
                placeholder=" **********"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-indigo-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-950"
            >
              S'inscrire
            </button>

            {error && <p className="text-red-500">{error}</p>}
          </form>

          <p id="toggleMessage" className="mt-4 text-center text-gray-300">
            Vous avez déjà un compte ?
            <a
              href="/login"
              className="mb-4 font-bold text-indigo-500 hover:text-indigo-600"
            >
              {" "}
              Connectez-vous ici
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
