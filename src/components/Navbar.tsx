const links = [
  { href: "#sorun", label: "Belirtiler" },
  { href: "#cozum", label: "Tedavi Modeli" },
  { href: "#ispat", label: "Neden Biz" },
  { href: "#teklif", label: "Check-Up Teklifi" },
  { href: "#sss", label: "SSS" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <a href="#" className="flex flex-none items-center gap-2">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-teal-600 text-base text-white">
            🩺
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-900 sm:text-[17px]">
            dijital<span className="text-teal-600">şirketim</span>
            <span className="hidden text-slate-400 sm:inline">.com.tr</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-[13px] font-medium tracking-tight text-slate-600 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-slate-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#teklif"
          className="flex-none whitespace-nowrap rounded-full bg-teal-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm shadow-teal-600/20 transition-transform duration-300 ease-[var(--ease-apple)] hover:scale-[1.03] active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:px-4 sm:text-sm"
        >
          <span className="sm:hidden">Başvuru</span>
          <span className="hidden sm:inline">Check-Up Başvurusu</span>
        </a>
      </nav>
    </header>
  );
}
