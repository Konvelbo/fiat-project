import React from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { CardContainer, CardBody, CardItem } from '../ui/card-3d'
import { Counter } from '../ui/counter'

export const AboutSection: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768)
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <section id="about" className="py-24 px-4 bg-[#f3f5ee] border-y border-[#dedcd6]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Col : Aceternity 3D Card (Pure fade on mobile, depth entrance on desktop) */}
          <motion.div
            initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -30, scale: 0.96 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: isMobile, amount: 0.15 }}
            transition={{ duration: isMobile ? 0.75 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 lg:col-span-5 flex items-center justify-center w-full mx-auto"
          >
            <CardContainer
              containerClassName="w-full flex items-center justify-center py-2"
              className="inter-var w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] mx-auto flex items-center justify-center"
            >
              <CardBody className="bg-[#141b18] relative group/card border-white/10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] mx-auto h-auto rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 xl:p-8 border shadow-2xl hover:shadow-orange-500/10 transition-shadow">
                {/* Card Header (translateZ: 50) */}
                <CardItem translateZ={50} className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#f97316]">
                    Fondateur &bull; FIAT
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                    M. KONVELBO Élisée
                  </h3>
                  <p className="text-xs text-[#bccad1] mt-1 leading-relaxed">
                    11 ans de maîtrise réseau, sécurité & domotique au Burkina Faso.
                  </p>
                </CardItem>

                {/* Card Image in 3D (translateZ: 90) */}
                <CardItem translateZ={90} className="w-full mt-4">
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-800 to-black border border-white/15 aspect-[4/5] shadow-2xl relative group">
                    <img
                      src="/Photo-pdg-fiat.png"
                      alt="M. KONVELBO Élisée"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141b18] via-transparent to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/90 pointer-events-none">
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        Ouagadougou &bull; BF
                      </span>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Right Col : Company Story & Animated Counters */}
          <motion.div
            initial={isMobile ? { opacity: 0 } : { opacity: 0, x: 20 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: isMobile, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 lg:col-span-7 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c2623] tracking-tight leading-tight">
              Bâtir des infrastructures fiables, pérennes et{' '}
              <span className="font-serif-italic">sécurisées</span> depuis décembre 2015.
            </h2>

            <p className="text-sm sm:text-base text-[#576560] leading-relaxed">
              Créée en <strong>décembre 2015</strong> au Burkina Faso par{' '}
              <strong>M. KONVELBO Élisée</strong>, l'entreprise{' '}
              <strong>Faso Info Art Technologie (FIAT)</strong> s'est développée autour d'un engagement
              simple : apporter une réponse technique infaillible aux défis numériques du pays.
            </p>

            <p className="text-sm sm:text-base text-[#576560] leading-relaxed">
              Qu'il s'agisse d'installer des systèmes de vidéosurveillance intelligente, de concevoir
              des réseaux WiFi haute densité, de sécuriser des données d'entreprises sur serveurs NAS,
              de motoriser des portails d'accès ou de fournir du matériel informatique haut de gamme,
              FIAT intervient pour les particuliers, les PME, les industries et les projets de
              construction dans <strong>toutes les régions du Burkina Faso</strong>.
            </p>

            {/* Animated Number Counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#dedcd6]">
              <Counter target={11} suffix="ans" label="D'expérience terrain" />
              <Counter target={2015} label="Année de création" />
              <Counter target={100} suffix="%" label="Couverture Burkina" />
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="btn-magnetic-primary btn-arrow-right bg-[#1c2623] text-[#eceae1] text-xs font-semibold px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 w-fit"
              >
                <span>Prendre contact avec M. KONVELBO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
