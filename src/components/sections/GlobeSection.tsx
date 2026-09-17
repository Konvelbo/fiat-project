import React from 'react'
import { motion } from 'motion/react'
import { Globe } from '../ui/globe'

export const GlobeSection: React.FC = () => {
  return (
    <section
      id="globe-section"
      className="py-24 px-4 bg-gradient-to-b from-[#eceae1] via-[#f3f5ee] to-[#eceae1] border-t border-[#dedcd6] relative overflow-hidden text-center"
    >
      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-[#dedcd6] bg-white/90 px-4 py-1.5 rounded-full text-[11px] font-semibold text-[#1c2623] tracking-wide shadow-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse" />
          <span>🇧🇫 Burkina Faso &bull; Horizon International</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1c2623] leading-[1.08] max-w-3xl mx-auto"
        >
          Née au Burkina Faso,
          <br />
          <span className="font-serif-italic text-[#ea580c]">ouverte sur le monde.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#576560] max-w-2xl mx-auto mt-4 leading-relaxed font-normal"
        >
          Ouagadougou, Bobo-Dioulasso, Koudougou, Abidjan, Dakar, Paris : <strong>FIAT</strong> et{' '}
          <strong>M. KONVELBO Élisée</strong> bâtissent aujourd'hui les architectures réseaux et de
          sécurité les plus fiables du Burkina Faso, avec une rigueur prête pour l'expansion
          sous-régionale et internationale.
        </motion.p>

        {/* Interactive 3D Dotted Canvas Globe */}
        <div className="mt-8">
          <Globe />
        </div>
      </div>
    </section>
  )
}
