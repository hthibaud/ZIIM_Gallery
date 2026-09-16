export default function FooterComponent() {

  return (
    <footer className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto h-32 flex justify-between items-center p-4">
        <h1 className="text-white text-4xl font-bold">ZIIM Gallery</h1>

        <p className="text-gray-400">
          Discover and follow art you love!
        </p>

        <ul className="flex space-x-8 font-medium cursor-pointer p-4">
          <li>
            <a className="hover:text-gray-300 text-white" href="/support">
              support
            </a>
          </li>
          <li>
            <a className="hover:text-red-500 text-gray-400" href="/logout">
              logout
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
