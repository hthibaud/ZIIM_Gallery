export default function HeaderComponent() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto h-32 flex justify-between items-center p-4">
        <h1 className="text-white text-4xl font-bold">ZIIM Gallery</h1>

        <ul className="flex space-x-8 text-white text-lg font-medium hover:text-blue cursor-pointer">
          <li>
            <a href="/user/0">profile</a>
          </li>
          <li>
            <a href="/mainGallery">Main Gallery</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
