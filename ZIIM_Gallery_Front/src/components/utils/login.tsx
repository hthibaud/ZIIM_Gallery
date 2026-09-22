
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login as authenticate } from "../../api/auth";

export default function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            await authenticate({
                user_id: userId,
                password,
            });
            navigate("/");
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Authentication failed",
            );
        }
    }

    return (
        <main className="container mx-auto bg-[url('./assets/bg-gallery.png')] min-w-screen bg-cover bg-center bg-no-repeat">
            <section className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md rounded-lg bg-black p-8 shadow-lg inline:none ring-2 ring-gray-200">
                    <h1 className="text-4xl p-4 font-bold text-white">
                        Se connecter
                    </h1>

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

                        <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-gray-200 px-4 py-2 font-semibold text-black transition-colors hover:bg-yellow-300"
                        >
                            Se connecter
                        </button>

                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </div>
            </section>
        </main>
    );
}
