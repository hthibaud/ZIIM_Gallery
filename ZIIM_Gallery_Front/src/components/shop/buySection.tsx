import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import Coins from "../../assets/icons/coins/coins-32.png";

const artworkPrice = 200;

type ChatMessage = {
    id: number;
    author: "Vous" | "Artiste";
    text: string;
};

export default function BuySection() {
    const { id = "0" } = useParams<{ id: string }>();
    const [isPurchased, setIsPurchased] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, author: "Artiste", text: "Bonjour, merci de votre intérêt pour cette œuvre. Avez-vous des questions ?" },
    ]);

    function handleSubmitMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;

        setMessages((currentMessages) => [
            ...currentMessages,
            { id: Date.now(), author: "Vous", text: trimmedMessage },
        ]);
        setMessage("");
    }

    function handlePurchase(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPurchased(true);
    }

    return (
        <main className="min-h-screen bg-zinc-950 px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-7xl">
                
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour à la galerie
                </Link>

                <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                    
                    <section className="flex h-[500px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-2xl lg:h-[600px]">
                        
                        <div className="flex items-center justify-between border-b border-zinc-800/60 bg-zinc-900/50 px-6 py-4 backdrop-blur-md">
                            <div>
                                <h1 className="text-lg font-semibold tracking-tight text-white">L'Artiste</h1>
                                <div className="mt-1 flex items-center gap-2 text-xs font-medium text-zinc-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                    </span>
                                    En ligne
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
                            {messages.map((chatMessage) => {
                                const isMe = chatMessage.author === "Vous";
                                return (
                                    <div 
                                        key={chatMessage.id} 
                                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                                    >
                                        <div 
                                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
                                                isMe 
                                                ? "rounded-br-sm bg-white text-zinc-950" 
                                                : "rounded-bl-sm border border-zinc-800 bg-zinc-900 text-zinc-200"
                                            }`}
                                        >
                                            {chatMessage.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <form onSubmit={handleSubmitMessage} className="border-t border-zinc-800/60 bg-zinc-950/50 p-4">
                            <label className="sr-only" htmlFor="message">Votre message</label>
                            <div className="flex gap-3">
                                <input
                                    id="message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder="Écrire un message..."
                                    className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-zinc-500 focus:bg-zinc-900 focus:ring-1 focus:ring-zinc-500"
                                />
                                <button 
                                    type="submit" 
                                    disabled={!message.trim()}
                                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 sm:p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold tracking-tight text-white">Finaliser l'acquisition</h2>
                            <p className="mt-2 text-sm text-zinc-400">Vérifiez les détails avant de confirmer la transaction.</p>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-4">
                            <div>
                                <p className="font-medium text-white">Œuvre originale</p>
                                <p className="mt-1 text-sm text-zinc-500">Référence #{id}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5">
                                <span className="text-lg font-bold text-white">{artworkPrice}</span>
                                <img src={Coins} alt="Pièces" className="h-4 w-auto object-contain drop-shadow-sm" />
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5">
                            <ul className="space-y-3 text-sm text-zinc-400">
                                <li className="flex justify-between">
                                    <span>Sous-total</span>
                                    <span className="text-zinc-300">{artworkPrice}</span>
                                </li>
                            </ul>
                            
                            <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-4">
                                <span className="text-sm font-medium text-zinc-300">Total à payer</span>
                                <span className="flex items-center gap-2 text-xl font-bold text-white">
                                    {artworkPrice}
                                    <img src={Coins} alt="Coins" className="h-5 w-auto drop-shadow-sm" />
                                </span>
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-zinc-500 text-center">
                            Le montant sera directement débité de votre portefeuille sécurisé.
                        </p>

                        <form onSubmit={handlePurchase} className="mt-8">
                            <button 
                                type="submit" 
                                disabled={isPurchased} 
                                className="flex w-full items-center justify-center rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isPurchased ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Transaction validée
                                    </span>
                                ) : (
                                    `Confirmer le paiement de ${artworkPrice} coins`
                                )}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}