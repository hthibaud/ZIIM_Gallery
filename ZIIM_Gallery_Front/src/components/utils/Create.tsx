import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isForSale, setIsForSale] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    return "yoyoyo";
  }

  return (
    <>
      <main className="container mx-auto bg-[url('./assets/bg-gallery.png')] min-w-screen bg-cover bg-center bg-no-repeat">
        <section className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-black p-8 shadow-lg inline:none ring-2 ring-gray-500">
            <h1 className="text-4xl p-4 font-bold text-white">
              Publier une oeuvre
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={title}
                  name="title"
                  placeholder="Titre de votre oeuvre"
                  required
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-gray-200 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  name="oeuvre"
                  placeholder="importer votre oeuvre)"
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-gray-200 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={isForSale}
                    onChange={(event) => setIsForSale(event.target.checked)}
                    name="is_for_sale"
                    className="h-4 w-4 accent-yellow-300"
                  />
                  Vendre cette oeuvre ? 
                </label>
              </div>

              {isForSale && (
                <div className="mb-4">
                  <input
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    name="price"
                    placeholder="Prix de votre oeuvre (€)"
                    min="0"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-white shadow-sm outline-none focus:border-gray-200 focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              )}

              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-gray-200 px-4 py-2 font-semibold text-black transition-colors hover:bg-yellow-300"
              >
                Publier cette oeuvre
              </button>

              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
