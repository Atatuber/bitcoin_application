export default function Footer() {
  return (
    <footer className="bg-white shadow m-0 p-4">
      <div className="w-full p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2025{" "}
          <a href="/" className="hover:underline">
            ChainVault™
          </a>
          . Alle Rechten Voorbehouden.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Over mij
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacybeleid
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Rechten en voorwaarden
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
