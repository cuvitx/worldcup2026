export function BzgaBanner() {
  return (
    <div className="bg-gray-100 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-500">
          <span className="font-bold text-gray-700">18+</span>
          <span>Glücksspiel kann süchtig machen.</span>
          <a href="https://www.bzga.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
            BZgA Infos
          </a>
          <span>Hilfe-Hotline: <a href="tel:08001372700" className="underline font-semibold">0800 1 37 27 00</a> (kostenlos)</span>
        </div>
      </div>
    </div>
  );
}
