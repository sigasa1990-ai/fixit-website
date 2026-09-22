import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#intro', label: 'Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(9,9,11,0.85)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/portfolio" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#00d4aa] flex items-center justify-center text-[#09090b] font-extrabold text-sm transition-transform duration-300 group-hover:scale-105">
            F
          </div>
          <span className="font-semibold text-sm tracking-tight">
            FixIT <span className="text-[#a1a1aa] font-normal">Portfolio</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://fixitsoluciones.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-1.5 rounded-lg bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] text-[#00d4aa] hover:bg-[rgba(0,212,170,0.15)] transition-all duration-300"
          >
            fixitsoluciones.com
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-6 h-5 flex flex-col justify-center gap-1.5"
          aria-label="Menú"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-full bg-[#fafafa] rounded-full"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[2px] w-full bg-[#fafafa] rounded-full"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-full bg-[#fafafa] rounded-full"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-strong mx-4 mb-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://fixitsoluciones.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 mx-4 mb-2 px-4 py-2.5 rounded-xl text-sm font-medium text-center text-[#00d4aa] bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)]"
                onClick={() => setOpen(false)}
              >
                fixitsoluciones.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
