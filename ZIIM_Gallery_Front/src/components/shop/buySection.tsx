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
		{ id: 1, author: "Artiste", text: "Bonjour, merci de votre intérêt pour cette œuvre." },
	]);

	function handleSubmitMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const trimmedMessage = message.trim();

		if (!trimmedMessage) {
			return;
		}

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
		<main className="min-h-screen bg-[#180d2e] px-5 py-12 text-white sm:px-8 lg:px-12 lg:py-20">
			<div className="mx-auto max-w-7xl">
				<Link to="/" className="text-sm font-semibold text-[#d4af37] transition hover:text-[#e5c65f]">
					&larr; Retour à la galerie
				</Link>

				<div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
					<section className="rounded-2xl border border-white/10 bg-[#24143d] p-6 shadow-xl sm:p-8">
						<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">Échange direct</p>
								<h1 className="mt-3 text-2xl font-semibold">Discuter avec l'artiste</h1>
							</div>
							<span className="text-sm text-emerald-300">Artiste disponible</span>
						</div>

						<div className="mt-6 min-h-80 max-h-96 space-y-3 overflow-y-auto border-y border-white/10 py-5 pr-2">
							{messages.map((chatMessage) => (
								<div key={chatMessage.id} className={`max-w-xl rounded-xl px-4 py-3 text-sm ${chatMessage.author === "Vous" ? "ml-auto bg-[#7943a1]" : "bg-white/10"}`}>
									<p className="mb-1 text-xs font-semibold text-[#ffe644]">{chatMessage.author}</p>
									<p className="leading-6 text-white/85">{chatMessage.text}</p>
								</div>
							))}
						</div>

						<form onSubmit={handleSubmitMessage} className="mt-6 flex flex-col gap-3 sm:flex-row">
							<label className="sr-only" htmlFor="message">Votre message</label>
							<input
								id="message"
								value={message}
								onChange={(event) => setMessage(event.target.value)}
								placeholder="Écrire un message..."
								className="min-w-0 flex-1 rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
							/>
							<button type="submit" className="rounded-lg border border-[#d4af37] px-5 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#180d2e]">
								Envoyer
							</button>
						</form>
					</section>

					<section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl sm:p-8">
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">Paiement</p>
						<h2 className="mt-3 text-2xl font-semibold">Acheter cette œuvre</h2>

						<div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/15 p-4">
							<div>
								<p className="font-semibold">Œuvre Test</p>
								<p className="mt-1 text-sm text-white/55">Référence #{id}</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-xl font-bold text-[#ffe644]">{artworkPrice}</span>
								<img src={Coins} alt="Pièces" className="h-5 w-auto" />
							</div>
						</div>

						<div className="mt-6 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-4">
							<p className="text-sm leading-6 text-white/70">
								Le montant sera directement débité de ton portefeuille de coins.
							</p>
							<div className="mt-4 flex items-center justify-between border-t border-[#d4af37]/20 pt-4">
								<span className="text-white/70">À payer</span>
								<span className="flex items-center gap-2 text-xl font-bold text-[#ffe644]">
									{artworkPrice}
									<img src={Coins} alt="Coins" className="h-5 w-auto" />
								</span>
							</div>
						</div>

						<form onSubmit={handlePurchase} className="mt-6">
							<button type="submit" disabled={isPurchased} className="w-full rounded-lg bg-[#d4af37] px-5 py-3 font-semibold text-[#180d2e] transition hover:bg-[#e5c65f] disabled:cursor-not-allowed disabled:opacity-60">
								{isPurchased ? "Œuvre achetée" : `Payer ${artworkPrice} coins`}
							</button>
						</form>
						{isPurchased && <p className="mt-4 text-center text-sm text-emerald-300">Ton achat a bien été enregistré.</p>}
					</section>
				</div>
			</div>
		</main>
	);
}
