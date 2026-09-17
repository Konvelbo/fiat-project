import React, { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { TypewriterText } from '../ui/typewriter-text'

export const HeroSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacityImage = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.85, 0.3])

  const typewriterWords = [
    'réseau & sécurité',
    'vidéosurveillance IP 4K',
    'serveurs NAS & data',
    'domotique de pointe',
    'infrastructures IT d\'élite',
  ]

  return (
    <section
      id="hero"
      ref={targetRef}
      className="min-h-screen flex items-center justify-center pt-24 pb-12 lg:py-8 px-4 sm:px-6 xl:px-10 max-w-[1440px] mx-auto relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch w-full min-h-[calc(100vh-100px)]">
        {/* Left Column : Texts, Animated Title with Typewriter effect, CTA, Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-7 py-6"
        >
          {/* Top Tag */}
          <div className="inline-block w-fit max-w-full text-center border border-[#dedcd6] bg-white/80 px-3.5 sm:px-4 py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-semibold text-[#1c2623] tracking-wide shadow-sm">
            Faso Info Art Technologie &bull; Fondé en 2015 par M. KONVELBO Élisée
          </div>

          {/* Big Display Headline with Typewriter Typing Effect */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-[66px] font-extrabold tracking-tight text-[#1c2623] leading-[1.12] sm:leading-[1.08] text-center lg:text-left">
            L'ingénierie{' '}
            <span className="font-serif-italic text-[#ea580c] block sm:inline">
              <TypewriterText words={typewriterWords} typingSpeed={75} deletingSpeed={40} pauseDuration={1900} />
            </span>{' '}
            au service des leaders du Burkina Faso.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-[#576560] leading-relaxed font-normal max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            Avec 11 ans d'expérience, <strong>M. KONVELBO Élisée</strong> et son entreprise{' '}
            <strong>FIAT</strong> conçoivent, déploient et sécurisent les infrastructures
            technologiques des particuliers, grandes entreprises, industries et chantiers à travers
            tout le pays.
          </p>

          {/* Action Buttons & Social Icons */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
            <Link
              to="/contact"
              className="btn-magnetic-primary btn-arrow-upright bg-[#1c2623] text-[#eceae1] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-md"
            >
              <span>Démarrer un projet</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="#about"
              className="btn-magnetic-secondary border border-[#dedcd6] bg-white/80 hover:bg-white text-[#1c2623] px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-semibold shadow-sm text-center"
            >
              Découvrir l'histoire
            </a>

            {/* Social Media Icons in Hero (Facebook, LinkedIn, Twitter/X) */}
            <div className="flex items-center justify-center gap-2.5 sm:pl-3 sm:border-l border-[#dedcd6] mt-1 sm:mt-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
                className="social-icon-bubble w-9 h-9 rounded-full bg-white border border-[#dedcd6] flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white shadow-sm transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="social-icon-bubble w-9 h-9 rounded-full bg-white border border-[#dedcd6] flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white shadow-sm transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter / X"
                aria-label="Twitter / X"
                className="social-icon-bubble w-9 h-9 rounded-full bg-white border border-[#dedcd6] flex items-center justify-center text-black hover:bg-black hover:text-white shadow-sm transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column : Founder Image Enriched & Scaled to fill the red defined region (Hidden on Mobile) */}
        <motion.div
          style={{ y: yImage, opacity: opacityImage }}
          className="hidden lg:flex lg:col-span-6 xl:col-span-5 items-end justify-center h-full relative"
        >
          <div className="relative w-full max-w-[560px] xl:max-w-[640px] h-full flex items-end justify-center select-none">
            {/* Seamless portrait taking the full height and width defined in the red box */}
            <img
              src="/Photo-pdg-fiat.png"
              alt="M. KONVELBO Élisée - Fondateur FIAT"
              className="w-full h-auto max-h-[86vh] xl:max-h-[92vh] object-contain object-bottom drop-shadow-2xl scale-110 xl:scale-120 origin-bottom"
            />

            {/* Minimal floating badges directly over the image */}
            <div className="absolute bottom-3 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
              <span className="text-[11px] font-bold text-[#1c2623] bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#dedcd6] shadow-md">
                M. KONVELBO Élisée
              </span>
              <span className="text-[10px] font-semibold text-[#1c2623] bg-[#f97316]/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#f97316]/30 shadow-md">
                Fondateur FIAT (11 ans exp.)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
