import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-[#00d4aa] bg-[rgba(0,212,170,0.08)] border border-[rgba(0,212,170,0.15)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
            Portfolio — Arquitectura SaaS
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
        >
          <span className="text-gradient">Sistemas reales</span>
          <br />
          <span className="text-gradient-primary">para operaciones reales</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[#a1a1aa] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Plataformas SaaS, automatización operativa y sistemas empresariales 
          diseñados para negocios que necesitan estabilidad real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#proyectos"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#00d4aa] text-[#09090b] hover:brightness-110 transition-all duration-300 shadow-lg shadow-[rgba(0,212,170,0.2)]"
          >
            Ver proyectos
          </a>
          <a
            href="#intro"
            className="px-6 py-3 rounded-xl text-sm font-medium text-[#a1a1aa] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:text-[#fafafa] transition-all duration-300"
          >
            Sobre FixIT
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent pointer-events-none z-10" />
          <div className="perspective-1000">
            <motion.div
              whileHover={{ rotateX: -4, rotateY: 4, scale: 1.01, z: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative preserve-3d"
            >
              <div className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.06) 0%, transparent 70%)' }} />
              <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] shadow-2xl">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.15)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.08)]" />
                  <div className="ml-4 px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[#71717a] text-xs flex-1 max-w-[200px] text-left truncate">
                    fixitsoluciones.com/portfolio
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-px bg-[rgba(255,255,255,0.04)]">
                  <div className="hidden md:block col-span-3 p-4 border-r border-[rgba(255,255,255,0.04)] bg-[rgba(0,0,0,0.15)]">
                    {['Dashboard', 'Proyectos', 'Operación', 'Equipo'].map((item) => (
                      <div key={item} className="px-3 py-2 rounded-lg text-xs text-[#71717a] hover:text-[#fafafa] hover:bg-[rgba(255,255,255,0.04)] transition-colors mb-0.5 cursor-pointer">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="col-span-12 md:col-span-9 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                      <div className="text-xs font-medium text-[#a1a1aa]">Plataformas activas</div>
                      <div className="flex gap-1">
                        {['SaaS', 'Operativo', 'Web'].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] text-[#71717a] bg-[rgba(255,255,255,0.04)]">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'QRobra', color: '#00d4aa', type: 'SaaS' },
                        { name: 'LicenseCore', color: '#6366f1', type: 'SaaS' },
                        { name: 'FixIT ERP', color: '#f59e0b', type: 'Operativo' },
                        { name: 'FixIT RMM', color: '#00d4aa', type: 'SaaS' },
                      ].map((p) => (
                        <div key={p.name} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                            <span className="text-xs font-medium text-[#fafafa]">{p.name}</span>
                          </div>
                          <div className="flex items-end justify-between">
                            <span className="text-[10px] text-[#71717a]">{p.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-[#71717a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
