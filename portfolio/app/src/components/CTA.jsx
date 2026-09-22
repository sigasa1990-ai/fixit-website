import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section id="contacto" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-[#00d4aa] bg-[rgba(0,212,170,0.08)] border border-[rgba(0,212,170,0.15)] mb-8">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Conversemos
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
        >
          ¿Necesitas una plataforma <span className="text-gradient-primary">para tu operación</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[#a1a1aa] text-lg max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Diseñamos sistemas enfocados en operación, estabilidad y crecimiento real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:hola@fixitsoluciones.com"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#00d4aa] text-[#09090b] hover:brightness-110 transition-all duration-300 shadow-lg shadow-[rgba(0,212,170,0.2)]"
          >
            hola@fixitsoluciones.com
          </a>
          <a
            href="https://wa.me/526861959581"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-sm font-medium text-[#a1a1aa] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:text-[#fafafa] transition-all duration-300"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
