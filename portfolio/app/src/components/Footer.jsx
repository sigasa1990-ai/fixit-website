export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#00d4aa] flex items-center justify-center text-[#09090b] font-extrabold text-[10px]">
            F
          </div>
          <span className="text-xs text-[#71717a]">
            FixIT Soluciones — Portfolio
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://fixitsoluciones.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors duration-200"
          >
            fixitsoluciones.com
          </a>
          <span className="text-[#71717a] text-[10px]">&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
