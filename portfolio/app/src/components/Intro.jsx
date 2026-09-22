import { motion } from 'framer-motion'

export default function Intro() {
  return (
    <section id="intro" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#71717a] mb-4">
            / Sobre FixIT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Arquitectura de software <span className="text-gradient-primary">para negocios reales</span>
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-2xl mx-auto leading-relaxed">
            Diseñamos y desarrollamos plataformas SaaS, sistemas operativos empresariales 
            y software operacional para negocios que necesitan operar con mayor control, 
            estabilidad y claridad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {[
            {
              title: 'Plataformas SaaS',
              desc: 'Arquitectura escalable, APIs limpias, paneles de administración y modelos de suscripción listos para producción.',
            },
            {
              title: 'Sistemas operativos',
              desc: 'Módulos administrativos, inventarios, facturación, control de obra y trazabilidad operativa para negocios.',
            },
            {
              title: 'Automatización empresarial',
              desc: 'Herramientas operativas, monitoreo, seguridad y flujos de automatización para empresas.',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,170,0.1)] flex items-center justify-center text-[#00d4aa] text-sm font-bold mb-3">
                0{i + 1}
              </div>
              <h3 className="text-sm font-semibold text-[#fafafa] mb-2">{item.title}</h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#71717a]">
              Filosofía de desarrollo
            </span>
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
          </div>
          <p className="text-[#a1a1aa] text-base max-w-xl mx-auto leading-relaxed mb-8">
            No desarrollamos software inflado ni plataformas llenas de funciones innecesarias. 
            Diseñamos sistemas enfocados en estabilidad, claridad operativa, automatización, 
            mantenibilidad y rendimiento real. Cada módulo existe para resolver un problema concreto.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
