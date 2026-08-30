const links = [
  { href: "#sorun", label: "Belirtiler" },
  { href: "#cozum", label: "Tedavi Modeli" },
  { href: "#ispat", label: "Neden Biz" },
  { href: "#teklif", label: "Check-Up Teklifi" },
  { href: "#sss", label: "SSS" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-lg text-white">
            🩺
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            dijital<span className="text-teal-600">şirketim</span>
            <span className="text-slate-400">.com.tr</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-teal-700">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#teklif"
          className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-600/20 transition hover:bg-teal-700"
        >
          Check-Up Başvurusu
        </a>
      </nav>
    </header>
  );
}
