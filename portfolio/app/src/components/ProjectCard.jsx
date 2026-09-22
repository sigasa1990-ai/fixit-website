import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ProjectCard({ project, index }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      {!isEven && <div className="lg:hidden" />}
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#71717a] text-xs font-mono">0{index + 1}</span>
          <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#fafafa] mb-2 tracking-tight">
          {project.name}
        </h3>
        <p className="text-[#00d4aa] text-sm font-medium mb-4">
          {project.tagline}
        </p>
        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] mb-3">
          <div className="text-[#71717a] text-xs font-medium uppercase tracking-wider mb-2">
            Problema real
          </div>
          <p className="text-[#a1a1aa] text-sm leading-relaxed">
            {project.problem}
          </p>
        </div>

        {project.result && (
          <div className="p-4 rounded-xl bg-[rgba(0,212,170,0.03)] border border-[rgba(0,212,170,0.08)] mb-6">
            <div className="text-[#00d4aa] text-xs font-medium uppercase tracking-wider mb-2">
              Resultado operativo
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {project.result}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-lg text-xs font-medium text-[#a1a1aa] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
            >
              {t}
            </span>
          ))}
        </div>

        {project.isPrivate ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[#f59e0b] bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Proyecto privado — demo bajo solicitud
            </span>
            <a
              href="mailto:hola@fixitsoluciones.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#fafafa] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] transition-all duration-300 group"
            >
              Solicitar demo
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#fafafa] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] transition-all duration-300 group"
          >
            Visitar sitio
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="perspective-1000">
          <motion.a
            href={project.isPrivate ? 'mailto:hola@fixitsoluciones.com' : project.url}
            target={project.isPrivate ? undefined : '_blank'}
            rel={project.isPrivate ? undefined : 'noopener noreferrer'}
            whileHover={{
              rotateX: -6,
              rotateY: isEven ? 6 : -6,
              scale: 1.02,
              z: 30,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="group relative block preserve-3d cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"
              style={{
                background: `radial-gradient(ellipse at center, ${project.subtle} 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${project.subtle} 0%, transparent 50%)`,
              }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.15)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.08)]" />
                <div className="ml-4 px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[#71717a] text-xs flex-1 max-w-[200px] text-left truncate">
                  {project.isPrivate ? project.url.replace('https://', '') : project.url.replace('https://www.', '').replace('https://', '').replace(/\/$/, '')}
                </div>
                {project.isPrivate && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium text-[#f59e0b] bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
                    Privado
                  </span>
                )}
              </div>
              <div className="relative overflow-hidden bg-[#09090b]">
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[rgba(255,255,255,0.08)] border-t-[#00d4aa] animate-spin" />
                  </div>
                )}
                <img
                  src={project.image}
                  alt={`${project.name} — ${project.tagline}`}
                  loading="lazy"
                  onLoad={() => setImgLoaded(true)}
                  className={`w-full ${
                    project.name === 'FixIT Soluciones' || project.name === 'FixIT ERP'
                      ? 'h-64 sm:h-72 md:h-96 object-contain'
                      : 'h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-top'
                  } transition-all duration-700 ${
                    imgLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
