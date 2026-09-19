import React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

export const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-8 px-4 relative overflow-hidden text-white ultime-footer-bg">
      <div className="max-w-[1100px] mx-auto">
        {/* Top Footer Container (Fade in + Slide Up with reverse scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 'some', margin: '60px 0px 0px 0px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-16"
        >
          {/* Logo Capsule */}
          <div className="bg-white text-[#1c2623] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
            <div className="w-8 h-8 rounded-xl bg-[#ea580c] text-white flex items-center justify-center font-black text-sm">
              F
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-[#1c2623]">
                FIAT<span className="text-[#ea580c]">.bf</span>
              </div>
              <div className="text-[9px] text-[#576560] uppercase tracking-wider font-semibold">
                Faso Info Art Technologie
              </div>
            </div>
          </div>

          {/* Right Links, Tagline & Social Icons */}
          <div className="text-left md:text-right space-y-3">
            <p className="text-xs sm:text-sm text-white font-medium max-w-md md:ml-auto leading-relaxed drop-shadow-sm">
              Fait pour le Burkina Faso et la sous-région, avec rigueur, intégrité et passion technologique.
            </p>

            <div className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 text-xs font-semibold text-white">
              <a href="/#hero" className="hover:text-[#ffedd5] hover:-translate-y-0.5 transition-all">
                Salu
              </a>
              <a href="/#about" className="hover:text-[#ffedd5] hover:-translate-y-0.5 transition-all">
                Qui somme nous
              </a>
              <a href="/#services" className="hover:text-[#ffedd5] hover:-translate-y-0.5 transition-all">
                Services & Projets
              </a>
              <a href="/#faq" className="hover:text-[#ffedd5] hover:-translate-y-0.5 transition-all">
                FAQ
              </a>
              <Link to="/contact" className="btn-arrow-right hover:text-white text-[#ffedd5] font-bold flex items-center gap-1.5 transition-all hover:-translate-y-0.5">
                <span>Créer mon projet</span>
                <ArrowRight className="w-3.5 h-3.5 inline" />
              </Link>
            </div>

            {/* Social Media SVGs */}
            <div className="flex items-center md:justify-end gap-2.5 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
                className="social-icon-bubble w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#1877F2] shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="social-icon-bubble w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#0A66C2] shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter / X"
                aria-label="Twitter / X"
                className="social-icon-bubble w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <div className="text-[11.5px] text-white/90 font-medium">
              Ouagadougou &bull; Contact direct M. KONVELBO Élisée :{' '}
              <a href="tel:+22678331306" className="font-bold underline hover:text-[#ffedd5] transition-colors">
                (+226) 78331306
              </a>
              {' / '}
              <a href="tel:+22647331306" className="font-bold underline hover:text-[#ffedd5] transition-colors">
                74331306
              </a>
            </div>
          </div>
        </motion.div>

        {/* GIANT TYPOGRAPHY AT BOTTOM (Reverse scroll animation on scroll down & up for mobile & desktop) */}
        <div className="w-full text-center border-t border-white/20 pt-6 pb-2 overflow-hidden select-none">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 'some', margin: '80px 0px 0px 0px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="giant-footer-text text-white"
          >
            FIAT
          </motion.div>
        </div>

        {/* Micro Copyright Bar (Smooth scroll down & up animation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 'some', margin: '80px 0px 0px 0px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/80 gap-2"
        >
          <div>© 2015-2026 Faso Info Art Technologie (FIAT). Tous droits réservés.</div>
          <div>Fondateur : Mr. KONVELBO Élisée</div>
        </motion.div>
      </div>
    </footer>
  )
}
