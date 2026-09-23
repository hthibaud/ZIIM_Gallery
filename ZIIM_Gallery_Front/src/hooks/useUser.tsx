import { useState, useEffect } from 'react';

const API_URL = (import.meta as ImportMeta & { env: { VITE_API_URL?: string } }).env.VITE_API_URL;

export interface UserData {
    user_id: string;
    username: string | null
    bio: string | null
    profile_picture: string | null
    profile_banner: string | null
    date: string
    gallery_id: number | null
}

interface UseUserReturn {
    user: UserData | null;
    isLoading: boolean;
    error: string | null;
}

export function useUser(userId: string | undefined): UseUserReturn {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        const controller = new AbortController();
        
        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_URL}/user/id/${userId}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
                }

                const data: UserData = await response.json();
                setUser(data);
            } catch (err: unknown) {
                // On ignore l'erreur si elle est causée par l'annulation volontaire de la requête
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError(err.message || "Une erreur inconnue est survenue");
                    setUser(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();

        return () => {
            controller.abort();
        };
    }, [userId]);

    return { user, isLoading, error };
}