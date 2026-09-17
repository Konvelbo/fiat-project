import React from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

// Infinite Marquee Row Component for Mobile
const MobileMarqueeRow: React.FC<{
  children: React.ReactNode
  direction?: 'left' | 'right'
  duration?: number
}> = ({ children, direction = 'left', duration = 35 }) => {
  return (
    <div className="relative w-full overflow-hidden py-2 select-none">
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex gap-3.5 w-max shrink-0 items-stretch"
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export const ServicesBlocksSection: React.FC = () => {
  return (
    <section id="services" className="py-20 lg:py-36 px-3 sm:px-4 overflow-hidden relative">
      {/* MOBILE ONLY TITLE (< lg) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="block lg:hidden max-w-[760px] mx-auto text-center mb-8 px-2"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1c2623] leading-tight">
          Toutes nos expertises & blocs technologiques.
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-[#ea580c] mt-2">
          À déployer selon vos besoins.
        </p>
        <div className="mt-5">
          <Link
            to="/contact"
            className="btn-magnetic-primary btn-arrow-upright group inline-flex items-center gap-3 bg-[#1c2623] text-[#eceae1] px-6 py-3.5 rounded-full text-xs font-bold shadow-xl"
          >
            <span>Demander une étude sur-mesure</span>
            <span className="w-6 h-6 rounded-full bg-[#f97316] text-white flex items-center justify-center text-[10px] group-hover:scale-110 group-hover:bg-[#ea580c] transition-all">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </motion.div>

      {/* ================= MOBILE ONLY: INFINITE DUAL MARQUEE (SCROLL LEFT & RIGHT) ================= */}
      <div className="block lg:hidden relative w-full overflow-hidden my-4 space-y-2">
        {/* Left & Right subtle edge fade gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-cream)] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-cream)] to-transparent z-10" />

        {/* Row 1: Infinite Scroll to LEFT */}
        <MobileMarqueeRow direction="left" duration={32}>
          {/* Card 1: Vision Fondateur */}
          <div className="w-[270px] bg-[#fbf9f1] p-4 rounded-[22px] shadow-md border border-[#dedcd6] shrink-0 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-[#576560] mb-1 font-semibold">💡 Vision du Dirigeant</div>
              <p className="font-serif-italic text-xs text-[#1c2623] leading-snug">
                "Le meilleur moment pour sécuriser vos infrastructures, c'était hier. Le deuxième, c'est maintenant."
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#dedcd6] flex items-center justify-between text-[10px] text-[#576560]">
              <span className="font-bold text-[#1c2623]">M. KONVELBO Élisée</span>
              <span>Fondateur FIAT</span>
            </div>
          </div>

          {/* Card 2: WiFi 6 Mesh */}
          <div className="w-[270px] bg-[#18221f] text-white p-3.5 rounded-[22px] shadow-lg shrink-0 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
              <span className="text-[#e3f21a] text-[10px] font-bold">● FIAT-WIFI-6-MESH</span>
              <span className="text-white/40 text-[9px]">10Gbps</span>
            </div>
            <div className="h-20 rounded-xl overflow-hidden mb-2 bg-neutral-800">
              <img src="/wifi-networking.jpg" alt="WiFi 6" className="w-full h-full object-cover" />
            </div>
            <div className="text-xs font-bold">Réseaux WiFi Haute Performance</div>
            <div className="text-[10px] text-[#bccad1]">Bureaux, usines & chantiers BTP</div>
          </div>

          {/* Card 3: Vidéosurveillance IP & IA */}
          <div className="w-[270px] bg-white p-3 rounded-[22px] shadow-md border border-[#dedcd6] shrink-0 flex flex-col justify-between">
            <div className="h-20 rounded-xl overflow-hidden bg-neutral-100 mb-2">
              <img src="/cctv-surveillance.jpg" alt="Vidéosurveillance" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs text-[#1c2623]">Vidéosurveillance IP & IA</span>
                <span className="text-[9px] bg-[#ea580c]/15 text-[#ea580c] px-2 py-0.5 rounded-full font-bold">4K UHD</span>
              </div>
              <p className="text-[10px] text-[#576560] leading-tight">Détection IA & vision nocturne mobile.</p>
            </div>
          </div>

          {/* Card 4: Serveurs NAS */}
          <div className="w-[270px] bg-[#1c2623] text-white p-3.5 rounded-[22px] shadow-lg shrink-0 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#f97316] flex items-center justify-center font-bold text-[10px]">KE</div>
              <div>
                <div className="text-xs font-bold">M. KONVELBO Élisée</div>
                <div className="text-[9px] text-white/50">@elisee_fiat &bull; NAS Pro</div>
              </div>
            </div>
            <p className="text-[10px] text-[#bccad1] leading-relaxed mb-2">
              Centralisation de données & sauvegardes automatiques répliquées 100% blindées.
            </p>
            <div className="text-[9px] font-mono text-white/40">Depuis 2015 &bull; Burkina Faso</div>
          </div>

          {/* Card 5: Domotique */}
          <div className="w-[270px] bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white p-3.5 rounded-[22px] shadow-md shrink-0 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Domotique</span>
              <span className="text-[10px] font-bold">BFT / CAME</span>
            </div>
            <div className="h-20 rounded-xl overflow-hidden mb-2">
              <img src="/smart-gate.jpg" alt="Portails Automatisés" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-xs">Portails & Portes Automatisés</h4>
            <p className="text-[10px] text-white/80">Motorisation et contrôle d'accès.</p>
          </div>

          {/* Card 6: Couverture 13 Régions */}
          <div className="w-[240px] bg-[#ea580c] text-white p-4 rounded-[22px] shadow-lg shrink-0 flex flex-col justify-between">
            <div className="text-[9px] uppercase font-bold tracking-wider opacity-80">Couverture Nationale</div>
            <div className="text-sm font-extrabold mt-1">13 Régions du Burkina</div>
            <div className="text-[10px] opacity-90 mt-1">Déploiement sous 48h partout au pays</div>
          </div>
        </MobileMarqueeRow>

        {/* Row 2: Infinite Scroll to RIGHT */}
        <MobileMarqueeRow direction="right" duration={36}>
          {/* Card 7: Matériel Informatique */}
          <div className="w-[270px] bg-white p-3 rounded-[22px] shadow-md border border-[#dedcd6] shrink-0 flex flex-col justify-between">
            <div className="h-20 rounded-xl overflow-hidden bg-neutral-100 mb-2">
              <img src="/it-hardware.jpg" alt="Matériel Informatique" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs text-[#1c2623]">Matériel & Bureautique</span>
                <span className="text-[9px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Certifié</span>
              </div>
              <p className="text-[10px] text-[#576560] leading-tight">Laptops, ordinateurs de bureau & onduleurs.</p>
            </div>
          </div>

          {/* Card 8: Onduleurs APC */}
          <div className="w-[260px] bg-[#141b18] text-white p-3.5 rounded-[22px] shadow-lg border border-white/10 shrink-0 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="text-xs font-bold">Onduleurs & Énergie</span>
            </div>
            <div className="text-[10px] text-[#bccad1] mt-1">Protection contre les surtensions & coupures électriques.</div>
            <div className="text-[9px] font-mono text-[#f97316] mt-2">APC & Schneider Electric</div>
          </div>

          {/* Card 9: Fibre & Câblage */}
          <div className="w-[260px] bg-white p-3.5 rounded-[22px] shadow-md border border-[#dedcd6] shrink-0 flex flex-col justify-between">
            <div className="text-[9px] font-bold text-[#ea580c] uppercase tracking-wider">Fibre & Baies IT</div>
            <div className="text-xs font-extrabold text-[#1c2623] mt-0.5">Câblage structuré</div>
            <div className="text-[10px] text-[#576560] mt-0.5">Cat 6A / 7 & Fibre optique haute vitesse.</div>
          </div>

          {/* Card 10: Biométrie & Badges */}
          <div className="w-[260px] bg-[#f3f5ee] p-3.5 rounded-[22px] shadow-md border border-[#dedcd6] shrink-0 flex flex-col justify-between">
            <div className="text-[9px] font-bold text-[#1c2623] uppercase tracking-wider">Sécurité Accès</div>
            <div className="text-xs font-extrabold text-[#1c2623] mt-0.5">Biométrie & RFID</div>
            <div className="text-[10px] text-[#576560] mt-0.5">Pointeuses biométriques & tourniquets sécurisés.</div>
          </div>

          {/* Card 11: Interphonie Vidéo */}
          <div className="w-[260px] bg-[#1c2623] text-white p-3.5 rounded-[22px] shadow-md shrink-0 flex flex-col justify-between">
            <div className="text-[9px] font-mono text-[#f97316]">● SMART-INTERCOM</div>
            <div className="text-xs font-bold text-white mt-0.5">Interphonie Vidéo IP</div>
            <div className="text-[10px] text-[#bccad1] mt-0.5">Appels smartphones & ouverture à distance.</div>
          </div>

          {/* Card 12: Maintenance & Infogérance */}
          <div className="w-[260px] bg-amber-50 p-3.5 rounded-[22px] shadow-md border border-amber-200 shrink-0 flex flex-col justify-between">
            <div className="text-[9px] font-bold text-amber-800 uppercase tracking-wider">Maintenance Pro</div>
            <div className="text-xs font-extrabold text-[#1c2623] mt-0.5">Infogérance & Audit</div>
            <div className="text-[10px] text-[#576560] mt-0.5">Assistance technique réactive sous 24h.</div>
          </div>
        </MobileMarqueeRow>
      </div>

      {/* DESKTOP CONTAINER WITH FLOATING SURROUNDING CARDS & CENTERED TEXT */}
      <div className="hidden lg:flex max-w-[1440px] mx-auto relative lg:min-h-[1120px] lg:items-center lg:justify-center">
        {/* ================= CENTER TITLE & CTA PILL (DESKTOP) ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 text-center max-w-[580px] mx-auto px-4 py-8 pointer-events-auto"
        >
          <h2 className="text-5xl xl:text-6xl font-extrabold tracking-tight text-[#1c2623] leading-[1.08]">
            Toutes nos expertises & blocs technologiques.
          </h2>
          <p className="text-2xl xl:text-3xl font-bold text-[#ea580c] mt-4">
            À déployer selon vos besoins.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="btn-magnetic-primary btn-arrow-upright group inline-flex items-center gap-3 bg-[#1c2623] text-[#eceae1] px-8 py-4 rounded-full text-xs font-bold shadow-2xl"
            >
              <span>Demander une étude sur-mesure</span>
              <span className="w-6 h-6 rounded-full bg-[#f97316] text-white flex items-center justify-center text-[11px] group-hover:scale-110 group-hover:bg-[#ea580c] transition-all">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* ================= SURROUNDING FLOATING CARDS (16 BLOCS THÉMATIQUES FIAT) ================= */}
        <div className="w-full h-full absolute inset-0 pointer-events-none">
          {/* Bloc 1 : Citation Fondateur (Top-Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="block-card pointer-events-auto bg-[#fbf9f1] p-5 xl:p-6 rounded-[24px] xl:rounded-[28px] shadow-md absolute top-2 left-4 w-[260px] xl:w-[320px] 2xl:w-[345px] -rotate-3"
          >
            <div className="text-[11px] xl:text-xs text-[#576560] mb-2 font-medium">💡 Vision du Dirigeant</div>
            <p className="font-serif-italic text-xs sm:text-sm xl:text-base text-[#1c2623] leading-snug">
              "Le meilleur moment pour sécuriser vos données et vos infrastructures, c'était hier. Le deuxième, c'est maintenant."
            </p>
            <div className="mt-3 pt-2 border-t border-[#dedcd6] flex items-center justify-between text-[10px] xl:text-xs text-[#576560]">
              <span className="font-bold text-[#1c2623]">M. KONVELBO Élisée</span>
              <span>Fondateur FIAT</span>
            </div>
          </motion.div>

          {/* Bloc 2 : Matrice Réseau WiFi 6 (Top-Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block-card pointer-events-auto bg-[#18221f] text-white p-4 xl:p-5 rounded-[24px] xl:rounded-[28px] shadow-xl absolute top-0 right-4 w-[280px] xl:w-[340px] 2xl:w-[365px] rotate-2"
          >
            <div className="flex items-center justify-between mb-2 text-xs xl:text-sm">
              <span className="font-mono text-[#e3f21a] text-[11px] xl:text-xs font-bold">● FIAT-WIFI-6-MESH</span>
              <span className="text-white/40 text-[10px] xl:text-xs font-mono">10Gbps</span>
            </div>
            <div className="h-24 xl:h-32 rounded-xl overflow-hidden mb-2">
              <img src="/wifi-networking.jpg" alt="Réseaux WiFi" className="w-full h-full object-cover" />
            </div>
            <div className="text-xs xl:text-sm font-bold">Réseaux WiFi Haute Performance</div>
            <div className="text-[10px] xl:text-xs text-[#bccad1] mt-0.5">Bureaux, usines et chantiers BTP</div>
          </motion.div>

          {/* Bloc 3 : Vidéosurveillance IP 4K (Middle-Left) */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block-card pointer-events-auto bg-white rounded-[24px] xl:rounded-[28px] p-2.5 xl:p-3.5 shadow-md lg:absolute lg:top-[38%] lg:-translate-y-1/2 lg:left-2 lg:w-[250px] xl:w-[310px] 2xl:w-[335px] lg:-rotate-2"
          >
            <div className="h-28 xl:h-36 rounded-xl overflow-hidden bg-neutral-100 mb-2">
              <img src="/cctv-surveillance.jpg" alt="Vidéosurveillance" className="w-full h-full object-cover" />
            </div>
            <div className="px-2 pb-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-extrabold text-xs xl:text-sm text-[#1c2623]">Vidéosurveillance IP & IA</span>
                <span className="text-[9px] xl:text-[10px] bg-[#ea580c]/15 text-[#ea580c] px-2 py-0.5 rounded-full font-bold">
                  4K UHD
                </span>
              </div>
              <p className="text-[10px] xl:text-xs text-[#576560] leading-tight">
                Détection IA & vision nocturne mobile.
              </p>
            </div>
          </motion.div>

          {/* Bloc 4 : Serveurs NAS & Sauvegardes (Middle-Right) */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block-card pointer-events-auto bg-[#1c2623] text-white p-4 xl:p-5 rounded-[24px] xl:rounded-[28px] shadow-lg lg:absolute lg:top-[38%] lg:-translate-y-1/2 lg:right-2 lg:w-[260px] xl:w-[325px] 2xl:w-[350px] lg:rotate-3"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 xl:w-9 xl:h-9 rounded-full bg-[#f97316] flex items-center justify-center font-bold text-xs xl:text-sm shrink-0">
                KE
              </div>
              <div>
                <div className="text-xs xl:text-sm font-bold">M. KONVELBO Élisée</div>
                <div className="text-[9px] xl:text-[10px] text-white/50">@elisee_fiat &bull; NAS Pro</div>
              </div>
            </div>
            <p className="text-[11px] xl:text-xs text-[#bccad1] leading-relaxed mb-2">
              Centralisation de données & sauvegardes automatiques répliquées 100% blindées.
            </p>
            <div className="text-[9px] xl:text-[10px] font-mono text-white/40">Depuis 2015 &bull; Burkina Faso</div>
          </motion.div>

          {/* Bloc 5 : Domotique & Portes Automatiques (Bottom-Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="block-card pointer-events-auto bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white p-4 xl:p-5 rounded-[24px] xl:rounded-[28px] shadow-md lg:absolute lg:bottom-4 lg:left-6 lg:w-[250px] xl:w-[315px] 2xl:w-[340px] lg:rotate-2"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] xl:text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Domotique
              </span>
              <span className="text-[10px] xl:text-xs font-bold">BFT / CAME</span>
            </div>
            <div className="h-22 xl:h-28 rounded-xl overflow-hidden mb-2">
              <img src="/smart-gate.jpg" alt="Portes Automatiques" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-xs xl:text-sm">Portails & Portes Automatisés</h4>
            <p className="text-[10px] xl:text-xs text-white/80 mt-0.5">Motorisation et contrôle d'accès.</p>
          </motion.div>

          {/* Bloc 6 : Vente Matériel Informatique (Bottom-Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block-card pointer-events-auto bg-white rounded-[24px] xl:rounded-[28px] p-2.5 xl:p-3.5 shadow-md lg:absolute lg:bottom-4 lg:right-6 lg:w-[250px] xl:w-[315px] 2xl:w-[340px] lg:-rotate-2"
          >
            <div className="h-24 xl:h-32 rounded-xl overflow-hidden bg-neutral-100 mb-2">
              <img src="/it-hardware.jpg" alt="Matériel Informatique" className="w-full h-full object-cover" />
            </div>
            <div className="px-2 pb-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-extrabold text-xs xl:text-sm text-[#1c2623]">Matériel & Bureautique</span>
                <span className="text-[9px] xl:text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
                  Certifié
                </span>
              </div>
              <p className="text-[10px] xl:text-xs text-[#576560] leading-tight">
                Laptops, ordinateurs de bureau & onduleurs.
              </p>
            </div>
          </motion.div>

          {/* Bloc 7 : Badge 13 Régions Couvertes (Top-Center-Left) */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-[#ea580c] text-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-lg lg:absolute lg:top-6 lg:left-[23%] lg:w-[185px] xl:w-[240px] 2xl:w-[260px] lg:rotate-1"
          >
            <div className="text-[9px] xl:text-[10px] uppercase font-bold tracking-wider opacity-80">Couverture Nationale</div>
            <div className="text-xs xl:text-sm font-extrabold mt-0.5">13 Régions du Burkina</div>
            <div className="text-[9px] xl:text-xs opacity-90 mt-0.5">Déploiement sous 48h</div>
          </motion.div>

          {/* Bloc 8 : Sécurité & Onduleurs APC (Bottom-Center-Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-[#141b18] text-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-lg lg:absolute lg:bottom-6 lg:right-[23%] lg:w-[200px] xl:w-[255px] 2xl:w-[275px] lg:-rotate-1 border border-white/10"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-[#10b981]" />
              <span className="text-xs xl:text-sm font-bold">Onduleurs & Énergie</span>
            </div>
            <div className="text-[10px] xl:text-xs text-[#bccad1] mt-1">Protection contre les surtensions & coupures</div>
          </motion.div>

          {/* Bloc 9 : Câblage Réseau & Fibre (Middle-Left-Bottom) */}
          <motion.div
            initial={{ opacity: 0, x: -35, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:top-[66%] lg:left-[12%] lg:w-[190px] xl:w-[245px] 2xl:w-[270px] lg:-rotate-2 border border-[#dedcd6]"
          >
            <div className="text-[9px] xl:text-[10px] font-bold text-[#ea580c] uppercase tracking-wider">Fibre & Baies IT</div>
            <div className="text-xs xl:text-sm font-extrabold text-[#1c2623] mt-0.5">Câblage structuré</div>
            <div className="text-[9px] xl:text-xs text-[#576560] mt-0.5">Cat 6A / 7 & Fibre optique</div>
          </motion.div>

          {/* Bloc 10 : Biométrie & Badges RFID (Middle-Right-Top) */}
          <motion.div
            initial={{ opacity: 0, x: 35, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-[#f3f5ee] p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:top-[14%] lg:right-[22%] lg:w-[185px] xl:w-[240px] 2xl:w-[265px] lg:rotate-3 border border-[#dedcd6]"
          >
            <div className="text-[9px] xl:text-[10px] font-bold text-[#1c2623] uppercase tracking-wider">Sécurité Accès</div>
            <div className="text-xs xl:text-sm font-extrabold text-[#1c2623] mt-0.5">Biométrie & RFID</div>
            <div className="text-[9px] xl:text-xs text-[#576560] mt-0.5">Pointeuses & tourniquets</div>
          </motion.div>

          {/* Bloc 11 : Interphonie Vidéo IP (Top-Center-Right) */}
          <motion.div
            initial={{ opacity: 0, y: -35, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-[#1c2623] text-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:top-5 lg:right-[38%] lg:w-[180px] xl:w-[235px] 2xl:w-[260px] lg:-rotate-1"
          >
            <div className="text-[9px] xl:text-[10px] font-mono text-[#f97316]">● SMART-INTERCOM</div>
            <div className="text-xs xl:text-sm font-bold text-white mt-0.5">Interphonie Vidéo IP</div>
            <div className="text-[9px] xl:text-xs text-[#bccad1] mt-0.5">Appels smartphones & déverrouillage</div>
          </motion.div>

          {/* Bloc 12 : Sécurité Incendie SSI (Bottom-Center-Left) */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:bottom-6 lg:left-[24%] lg:w-[195px] xl:w-[250px] 2xl:w-[275px] lg:rotate-2 border border-[#dedcd6]"
          >
            <div className="flex items-center gap-1.5 text-[9px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">
              <span>🔥</span> Sécurité Incendie
            </div>
            <div className="text-xs xl:text-sm font-extrabold text-[#1c2623] mt-0.5">Détection de Fumée</div>
            <div className="text-[9px] xl:text-xs text-[#576560] mt-0.5">Centrales SSI & alarmes sonores</div>
          </motion.div>

          {/* Bloc 13 : Téléphonie VoIP & Télécoms (Middle-Left-Top) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-[#2b3a35] text-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:top-[15%] lg:left-[20%] lg:w-[185px] xl:w-[240px] 2xl:w-[265px] lg:-rotate-2"
          >
            <div className="text-[9px] xl:text-[10px] uppercase font-bold tracking-wider text-[#38bdf8]">Télécoms VoIP</div>
            <div className="text-xs xl:text-sm font-bold text-white mt-0.5">Standard IP PBX</div>
            <div className="text-[9px] xl:text-xs text-[#bccad1] mt-0.5">Flottes d'entreprise & interconnexion</div>
          </motion.div>

          {/* Bloc 14 : Audit & Infogérance 24/7 (Middle-Right-Bottom) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-amber-50 p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:top-[66%] lg:right-[12%] lg:w-[190px] xl:w-[245px] 2xl:w-[270px] lg:rotate-2 border border-amber-200"
          >
            <div className="text-[9px] xl:text-[10px] font-bold text-amber-800 uppercase tracking-wider">Maintenance Pro</div>
            <div className="text-xs xl:text-sm font-extrabold text-[#1c2623] mt-0.5">Infogérance & Audit</div>
            <div className="text-[9px] xl:text-xs text-[#576560] mt-0.5">Assistance réactive sous 24h</div>
          </motion.div>

          {/* Bloc 15 : Barrières Infrarouges & Anti-Intrusion (Left Edge) */}
          <motion.div
            initial={{ opacity: 0, x: -45, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-[#0f172a] text-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:top-[56%] lg:left-[2%] lg:w-[180px] xl:w-[235px] 2xl:w-[260px] lg:rotate-3 border border-slate-700"
          >
            <div className="text-[9px] xl:text-[10px] font-mono text-emerald-400">● PERIMETRIC-GUARD</div>
            <div className="text-xs xl:text-sm font-bold text-white mt-0.5">Alarmes & Infrarouge</div>
            <div className="text-[9px] xl:text-xs text-slate-300 mt-0.5">Protection périmétrique usines</div>
          </motion.div>

          {/* Bloc 16 : Mines & Grands Chantiers BTP (Right Edge) */}
          <motion.div
            initial={{ opacity: 0, x: 45, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block block-card pointer-events-auto bg-[#ea580c] text-white p-3 xl:p-4 rounded-2xl xl:rounded-3xl shadow-md lg:absolute lg:top-[56%] lg:right-[2%] lg:w-[180px] xl:w-[235px] 2xl:w-[260px] lg:-rotate-3"
          >
            <div className="text-[9px] xl:text-[10px] uppercase font-bold tracking-wider opacity-80">Mines & Chantiers</div>
            <div className="text-xs xl:text-sm font-extrabold text-white mt-0.5">Réseaux Déportés</div>
            <div className="text-[9px] xl:text-xs opacity-90 mt-0.5">Liaisons radio & ponts WiFi</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
