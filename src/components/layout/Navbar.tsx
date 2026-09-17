import React, { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, X } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'
import { useMobileMenu } from './MobileDrawerLayout'

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero')
  const { toggle, isOpen } = useMobileMenu()

  const navItems = [
    { id: 'hero', label: 'Salu', href: '/#hero' },
    { id: 'about', label: 'Qui somme nous', href: '/#about' },
    { id: 'services', label: 'Services & Projets', href: '/#services' },
    { id: 'faq', label: 'FAQ', href: '/#faq' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'about', 'services', 'faq']
      const scrollPos = window.scrollY + 220

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-6 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-[740px] mx-auto flex items-center justify-between framer-pill-nav rounded-full p-2 pointer-events-auto shadow-sm">
        {/* Logo with magnetic hover */}
        <Link
          to="/"
          hash="hero"
          onClick={() => setActiveSection('hero')}
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105 pl-3 pr-2 py-1"
        >
          <div className="w-6 h-6 rounded-lg bg-[#1c2623] text-white flex items-center justify-center font-black text-[11px] group-hover:bg-[#ea580c] group-hover:rotate-6 transition-all duration-300 shadow-sm">
            F
          </div>
          <span className="font-extrabold text-xs tracking-tight text-[#1c2623]">
            FIAT<span className="text-[#576560] font-normal">™</span>
          </span>
        </Link>

        {/* Dynamic Active Section Links (Targeted / Focused / In View item turns black) */}
        <nav className="hidden sm:flex items-center gap-1 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                onFocus={() => setActiveSection(item.id)}
                className={cn(
                  'relative px-3.5 py-1.5 rounded-full text-xs transition-colors duration-200 focus:outline-none select-none cursor-pointer',
                  isActive ? 'text-white font-semibold' : 'text-[#1c2623]/70 hover:text-[#1c2623]'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#1c2623] rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden sm:block">
          <Link
            to="/contact"
            className="btn-magnetic-primary btn-arrow-upright bg-[#1c2623] text-[#eceae1] text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm"
          >
            <span>Prendre RDV</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Navigation Trigger / Close Button (Morphs seamlessly) */}
        <div className="flex sm:hidden items-center">
          <button
            type="button"
            onClick={toggle}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center shadow-sm active:scale-90 transition-all",
              isOpen
                ? "bg-white border-[#dedcd6] text-[#ff5500] hover:scale-105"
                : "bg-white border-[#dedcd6] text-[#1c2623] hover:text-[#ea580c]"
            )}
          >
            {isOpen ? (
              <X className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-[3.5px]">
                <span className="w-3.5 h-[1.5px] bg-current rounded-full" />
                <span className="w-3.5 h-[1.5px] bg-current rounded-full" />
                <span className="w-3.5 h-[1.5px] bg-current rounded-full" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
