export default function AuthentificationComponent(){
    return(
        <main className="container mx-auto">
        
        <section className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
                
                <h1 className="text-4xl p-4 font-bold text-white">Créer votre compte</h1>

                <form method="post" action="/register">
                    
                    <div className="mb-4">
                        <input type="text" id="username" name="username" placeholder="votrePseudo" required
                               className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900" />
                    </div>

                    <div className="mb-4">
                        <input type="email" id="email" name="email" placeholder=" votre@email.com" required
                               className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900" />
                    </div>

                    <div className="mb-4">
                        <input type="password" id="password" name="password" placeholder=" **********" required
                               className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900" />
                    </div>

                    <button type="submit" className="mt-4 w-full rounded-md bg-indigo-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-900">S'inscrire</button>
                </form>

                <p id="toggleMessage" className="mt-4 text-center text-gray-300">
                    Vous avez déjà un compte ? 
                    <a href="/login" className="mb-4 font-bold text-indigo-800 hover:text-indigo-900"> Connectez-vous ici</a>
                </p>

            </div>
        </section>
    </main>
    );
}