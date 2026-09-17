import { createFileRoute } from '@tanstack/react-router'
import { MobileDrawerProvider } from '../components/layout/MobileDrawerLayout'
import { Navbar } from '../components/layout/Navbar'
import { HeroSection } from '../components/sections/HeroSection'
import { AboutSection } from '../components/sections/AboutSection'
import { ServicesBlocksSection } from '../components/sections/ServicesBlocksSection'
import { GlobeSection } from '../components/sections/GlobeSection'
import { FaqSection } from '../components/sections/FaqSection'
import { Footer } from '../components/layout/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <MobileDrawerProvider>
      <div className="min-h-screen bg-[var(--bg-cream)] text-[var(--text-dark)] antialiased selection:bg-[#ea580c]/20 selection:text-[#ea580c]">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesBlocksSection />
          <GlobeSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </MobileDrawerProvider>
  )
}
