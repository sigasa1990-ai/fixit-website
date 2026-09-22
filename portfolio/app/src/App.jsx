import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Projects from './components/Projects'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#09090b] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
      </div>
      <Navbar />
      <Hero />
      <Intro />
      <Projects />
      <CTA />
      <Footer />
    </div>
  )
}
