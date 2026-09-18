import React, { createContext, useContext, useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowUpRight } from 'lucide-react'

interface MobileMenuContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
  toggle: () => {},
})

export const useMobileMenu = () => useContext(MobileMenuContext)

export const MobileDrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scrolling when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  const toggle = () => setIsOpen((prev) => !prev)

  const navLinks = [
    { label: 'Qui sommes-nous', href: '/#about' },
    { label: 'Services & Projets', href: '/#services' },
    { label: 'FAQ', href: '/#faq' },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Exact SVG plus crosshair pattern from reference
  const plusGridSvg = `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 11V21M11 16H21' stroke='rgba(255,255,255,0.28)' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {/* Normal Website Content Flow */}
      <div className="relative min-h-screen w-full bg-[var(--bg-cream)]">
        {children}
      </div>

      {/* ================= DEDICATED 3D MOBILE DRAWER MODAL ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 overflow-hidden bg-[#ff5500] pointer-events-auto select-none"
            style={{
              backgroundImage: plusGridSvg,
              backgroundSize: '32px 32px',
            }}
          >
            {/* ================= LEFT SECTION: 3D PERSPECTIVE CARD (WIDER 46% DISPLAY) ================= */}
            <div
              className="absolute left-0 top-[8%] bottom-[8%] w-[52%] flex items-center justify-start pointer-events-none"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                initial={{ x: '-100%', rotateY: 14, opacity: 0.7 }}
                animate={{ x: '-18%', rotateY: 5, opacity: 1 }}
                exit={{ x: '-100%', rotateY: 14, opacity: 0.7 }}
                transition={{ type: 'spring', damping: 27, stiffness: 230 }}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'right center',
                }}
                onClick={() => setIsOpen(false)}
                className="w-[82vw] max-w-[350px] h-full bg-[#f4f6f4] rounded-[36px] border border-white/40 shadow-[-20px_20px_50px_rgba(0,0,0,0.38)] overflow-hidden relative cursor-pointer flex flex-col justify-between p-5 sm:p-6 pointer-events-auto"
              >
                {/* Top orange gradient glow inside card */}
                <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#ff5e00]/28 via-[#ff5e00]/5 to-transparent pointer-events-none z-10" />

                {/* Top Header inside the 3D card */}
                <div className="relative z-20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-white/95 border border-black/5 px-2.5 py-1 rounded-full shadow-xs -ml-1">
                    <div className="w-5 h-5 rounded-md bg-[#1c2623] text-white flex items-center justify-center font-bold text-[10px]">
                      F
                    </div>
                    <span className="font-extrabold text-[11px] text-[#1c2623]">FIAT™</span>
                  </div>

                  {/* Close button X inside top right of the card */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsOpen(false)
                    }}
                    aria-label="Fermer le menu"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white shadow-md border border-neutral-200/80 flex items-center justify-center text-[#ff5500] hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Simulated Screen Content Preview */}
                <div className="relative z-20 my-auto space-y-3 pr-2">
                  <div className="inline-block border border-black/10 bg-white/90 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold text-[#1c2623]">
                    FIAT™ &bull; 11 ans exp.
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c2623] leading-tight tracking-tight">
                    L'ingénierie <span className="text-[#ea580c] font-serif-italic">sécurisée</span> au Burkina.
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#576560] leading-snug line-clamp-3">
                    Vidéosurveillance 4K, réseaux WiFi haute densité, serveurs NAS & domotique.
                  </p>
                  <div className="pt-1.5">
                    <div className="bg-[#1c2623] text-white text-[10px] sm:text-[11px] font-bold px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 shadow-md">
                      <span>Démarrer un projet</span>
                      <ArrowUpRight className="w-3 h-3 text-[#f97316]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="relative z-20 text-[10px] sm:text-[11px] text-[#576560] font-medium border-t border-black/5 pt-3 flex items-center justify-between">
                  <span>M. KONVELBO Élisée</span>
                  <span className="text-[9px] sm:text-[10px] bg-black/5 px-2 py-0.5 rounded-full font-semibold">Ouaga &bull; BF</span>
                </div>
              </motion.div>
            </div>

            {/* ================= RIGHT SECTION: FLAT 2D CRISP MENU ================= */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="absolute right-0 top-0 bottom-0 w-[52%] max-w-[260px] pr-4 sm:pr-8 flex flex-col items-center justify-center text-center space-y-4 z-20"
            >
              {/* White Pill Button: Prendre RDV */}
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="w-full max-w-[200px] bg-white text-[#ff5500] font-bold text-[15px] py-3.5 px-6 rounded-full shadow-lg shadow-black/10 hover:scale-105 active:scale-95 transition-all text-center block"
              >
                Prendre RDV
              </Link>

              {/* Discreet Horizontal Divider */}
              <div className="w-10 h-[1.5px] bg-white/40 my-3 rounded-full" />

              {/* Stacked Navigation Menu Items */}
              <nav className="flex flex-col items-center space-y-4 w-full">
                {navLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="text-white font-bold text-[18px] tracking-tight hover:opacity-85 active:scale-95 transition-all cursor-pointer py-0.5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileMenuContext.Provider>
  )
}
