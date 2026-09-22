import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const categories = [
  {
    name: 'Plataformas SaaS',
    projects: [
      {
        name: 'QRobra',
        tagline: 'Control operativo y trazabilidad para constructoras',
        description: 'Plataforma que centraliza asistencia por QR, geofencing, control multiobra, nómina, reportes y cumplimiento IMSS/SAT. Un solo sistema para la operación completa de construcción.',
        problem: 'Las constructoras manejan asistencia y nómina con procesos manuales, hojas de cálculo y poca trazabilidad. Esto genera errores administrativos, riesgo operativo y falta de control en tiempo real.',
        result: 'Centralización operativa, automatización administrativa y trazabilidad completa de personal en obra.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Geolocation API', 'QR'],
        url: 'https://www.qrobra.mx/',
        image: '/portfolio/portadas/qrobra-portada.png',
        subtle: 'rgba(0,212,170,0.15)',
      },
      {
        name: 'LicenseCore',
        tagline: 'Infraestructura SaaS de licenciamiento para software moderno',
        description: 'Sistema de activación, control por dispositivo, suscripciones y revenue tracking para productos digitales. Dashboard en tiempo real con métricas de licencias empresariales.',
        problem: 'Desarrolladores y empresas necesitan controlar acceso, activaciones y monetización de productos digitales sin construir infraestructura de licenciamiento desde cero.',
        result: 'Control centralizado de licencias, activación automatizada y monetización escalable para productos digitales.',
        tech: ['React', 'Python', 'FastAPI', 'Docker', 'MySQL'],
        url: 'https://www.licensecore.dev/',
        image: '/portfolio/portadas/licensecore-portada.png',
        subtle: 'rgba(99,102,241,0.15)',
      },
      {
        name: 'FixIT Soluciones',
        tagline: 'Plataforma RMM de monitoreo, seguridad y automatización TI',
        description: 'Infraestructura completa de monitoreo 24/7, alertas inteligentes, backups automatizados, hardening de equipos y soporte remoto. Dashboard unificado para gestión de parque tecnológico.',
        problem: 'Pequeñas y medianas empresas no tienen presupuesto para un departamento de TI interno, pero necesitan estabilidad operativa, monitoreo de equipos y protección contra fallas técnicas.',
        result: 'Infraestructura supervisada, reducción de riesgos operativos y soporte técnico automatizado sin intervención diaria.',
        tech: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
        url: 'https://www.fixitsoluciones.com/',
        image: '/portfolio/portadas/fixit-portada.png',
        subtle: 'rgba(0,212,170,0.15)',
      },
    ],
  },
  {
    name: 'Plataformas Operativas',
    projects: [
      {
        name: 'FixIT ERP',
        tagline: 'Sistema ERP modular para administración empresarial',
        description: 'Plataforma operativa modular en desarrollo activo. Dashboard financiero, control de técnicos, clientes, servicios, inventarios, compras, órdenes, cotizaciones, recibos, pagos, facturación, reportes, punto de venta y ajustes.',
        problem: 'Muchos negocios manejan compras, inventario, órdenes y operación diaria en procesos separados, hojas de cálculo o sistemas improvisados sin integración real.',
        result: 'Centralización operativa y control administrativo desde un solo sistema con módulos integrados.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'REST API'],
        url: 'https://app.fixitsoluciones.com/',
        image: '/portfolio/portadas/fixit-erp-portada.png',
        subtle: 'rgba(245,158,11,0.15)',
        isPrivate: true,
      },
    ],
  },
  {
    name: 'Ecommerce & Experiencias Web',
    projects: [
      {
        name: 'Boutique Lupita',
        tagline: 'Ecommerce moderno para marca de ropa local',
        description: 'Tienda en línea con catálogo dinámico, carrito de compras, pagos integrados, experiencia móvil y panel de administración. Diseñada para crecer con el negocio sin perder identidad visual.',
        problem: 'Negocios de moda local necesitan vender en línea con presencia digital profesional, sin complicarse con tecnología ni perder la esencia de su marca.',
        result: 'Presencia digital moderna, ventas centralizadas y administración autónoma del catálogo.',
        tech: ['Next.js', 'Tailwind', 'MongoDB', 'Stripe', 'Vercel'],
        url: 'https://boutiquelupita.com/',
        image: '/portfolio/portadas/boutique-lupita-portada.png',
        subtle: 'rgba(236,72,153,0.15)',
      },
    ],
  },
]

export default function Projects() {
  return (
    <section id="proyectos" className="relative py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#71717a] mb-4">
            / Proyectos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Lo que hemos <span className="text-gradient-primary">construido</span>
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto leading-relaxed">
            Plataformas, sistemas operativos e infraestructura digital para negocios reales.
          </p>
        </motion.div>

        {categories.map((category, catIndex) => (
          <div key={category.name} className="mb-20 lg:mb-32 last:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-3 mb-14"
            >
              <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
              <span className="text-xs font-medium tracking-widest uppercase text-[#71717a]">
                {category.name}
              </span>
              <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
            </motion.div>

            <div className="flex flex-col gap-24">
              {category.projects.map((project, i) => {
                const globalIndex = categories
                  .slice(0, catIndex)
                  .reduce((acc, c) => acc + c.projects.length, 0) + i
                return (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    index={globalIndex}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
