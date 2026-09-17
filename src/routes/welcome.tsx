import React, { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { WobbleCard } from '../components/ui/wobble-card'
import { Stepper } from '../components/ui/stepper'
import { cn } from '../lib/utils'

export const Route = createFileRoute('/welcome')({ component: WelcomePage })

function WelcomePage() {
  const navigate = useNavigate()
  const [sourceType, setSourceType] = useState<'bouche-a-oreille' | 'reseaux-sociaux' | null>(null)
  const [selectedSocial, setSelectedSocial] = useState<string>('')
  const [otherText, setOtherText] = useState<string>('')

  const steps = [
    { id: 1, title: '1. Contact', subtitle: 'Transmis' },
    { id: 2, title: '2. Découverte', subtitle: 'Canal' },
    { id: 3, title: '3. Confirmation', subtitle: 'Final' },
  ]

  const handleFinish = () => {
    toast.success('Demande enregistrée avec succès !', {
      description: 'Vous aurez une réponse à votre message dans les dernières 24h.',
      duration: 6000,
    })
    navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] py-8 px-4 sm:px-6">
      <div className="max-w-[1140px] mx-auto">
        {/* Back Link */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xs font-semibold text-[#1c2623] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à l'accueil</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#576560]">
            Page 3 &bull; Welcome Flow
          </span>
        </div>

        {/* Main Split-Screen Container */}
        <div className="bg-white border border-[#dedcd6] rounded-[36px] p-4 sm:p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column : Aceternity Wobble Card */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <WobbleCard containerClassName="h-full min-h-[500px]">
              {/* Radial ambient glows */}
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#f97316]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#ea580c]/25 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Top Tag & Title */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-[#f97316] border border-white/10 mb-4">
                    <span>✦ Wobble Card UI</span>
                    <span className="text-white/60">&bull; FIAT Welcome</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                    L'ingénierie d'élite commence par{' '}
                    <span className="font-serif-italic text-[#f97316]">l'écoute</span>.
                  </h3>
                  <p className="text-xs text-[#bccad1] mt-2 leading-relaxed">
                    "Nous mettons un point d'honneur à comprendre l'origine de votre démarche pour
                    calibrer notre réponse technique."
                  </p>
                </div>

                {/* Middle Visual Badge */}
                <div className="my-6 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f97316] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg">
                      KE
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">M. KONVELBO Élisée</div>
                      <div className="text-[10px] text-white/50">
                        Fondateur & Directeur FIAT &bull; 11 ans exp.
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-[10px] text-[#bccad1]">
                    <div>⚡ Réponse garantie &lt; 24h</div>
                    <div>🇧🇫 Déploiement 13 régions</div>
                  </div>
                </div>

                {/* Bottom Badge */}
                <div className="flex items-center justify-between text-[11px] text-white/60 pt-2 border-t border-white/10">
                  <span>Faso Info Art Technologie</span>
                  <span className="text-[#f97316] font-semibold">Depuis 2015</span>
                </div>
              </div>
            </WobbleCard>
          </div>

          {/* Right Column : Stepper & Discovery Radio Buttons */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-between py-2 sm:px-4">
            <div>
              {/* Stepper Header */}
              <Stepper steps={steps} currentStep={2} />

              {/* Question Body */}
              <div className="mb-5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c2623] tracking-tight">
                  Comment avez-vous entendu parler de <span className="font-serif-italic">FIAT</span> ?
                </h2>
                <p className="text-xs text-[#576560] mt-1">
                  Ces renseignements nous aident à mieux vous accompagner. Tout est{' '}
                  <strong>facultatif</strong>.
                </p>
              </div>

              {/* 2 Main Choices */}
              <div className="space-y-3">
                <label
                  className={cn(
                    'flex items-center gap-3 p-3.5 bg-[#f9f8f4] border border-[#dedcd6] rounded-2xl cursor-pointer hover:border-[#1c2623] transition-all',
                    sourceType === 'bouche-a-oreille' && 'border-[#1c2623] bg-white'
                  )}
                >
                  <input
                    type="radio"
                    name="welcome-source"
                    value="bouche-a-oreille"
                    checked={sourceType === 'bouche-a-oreille'}
                    onChange={() => {
                      setSourceType('bouche-a-oreille')
                      setSelectedSocial('')
                    }}
                    className="w-4 h-4 text-[#1c2623]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1c2623]">Le bouche à oreille</div>
                    <div className="text-[10px] text-[#576560]">
                      Recommandation directe d'un partenaire ou confrère
                    </div>
                  </div>
                </label>

                <label
                  className={cn(
                    'flex items-center gap-3 p-3.5 bg-[#f9f8f4] border border-[#dedcd6] rounded-2xl cursor-pointer hover:border-[#1c2623] transition-all',
                    sourceType === 'reseaux-sociaux' && 'border-[#1c2623] bg-white'
                  )}
                >
                  <input
                    type="radio"
                    name="welcome-source"
                    value="reseaux-sociaux"
                    checked={sourceType === 'reseaux-sociaux'}
                    onChange={() => setSourceType('reseaux-sociaux')}
                    className="w-4 h-4 text-[#1c2623]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1c2623]">
                      Via les réseaux sociaux / le Net
                    </div>
                    <div className="text-[10px] text-[#576560]">
                      YouTube, Facebook, Instagram, LinkedIn, etc.
                    </div>
                  </div>
                </label>
              </div>

              {/* Dynamic Social Network Selector (Single Choice) */}
              {sourceType === 'reseaux-sociaux' && (
                <div className="mt-4 p-4 bg-[#f3f5ee] border border-[#dedcd6] rounded-2xl space-y-3">
                  <div className="text-xs font-bold text-[#1c2623]">
                    Sélectionnez la plateforme principale : (Choix unique)
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {/* YouTube */}
                    <label
                      className={cn(
                        'flex items-center gap-2 p-2.5 bg-white border border-[#dedcd6] rounded-xl cursor-pointer hover:border-[#1c2623] transition-all',
                        selectedSocial === 'youtube' && 'border-[#1c2623] bg-[#eceae1]/50'
                      )}
                    >
                      <input
                        type="radio"
                        name="social-platform"
                        value="youtube"
                        checked={selectedSocial === 'youtube'}
                        onChange={() => setSelectedSocial('youtube')}
                        className="text-[#1c2623]"
                      />
                      <svg
                        className="w-4 h-4 text-[#FF0000] shrink-0 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span className="font-medium text-[11px]">YouTube</span>
                    </label>

                    {/* Twitter / X */}
                    <label
                      className={cn(
                        'flex items-center gap-2 p-2.5 bg-white border border-[#dedcd6] rounded-xl cursor-pointer hover:border-[#1c2623] transition-all',
                        selectedSocial === 'twitter' && 'border-[#1c2623] bg-[#eceae1]/50'
                      )}
                    >
                      <input
                        type="radio"
                        name="social-platform"
                        value="twitter"
                        checked={selectedSocial === 'twitter'}
                        onChange={() => setSelectedSocial('twitter')}
                        className="text-[#1c2623]"
                      />
                      <svg
                        className="w-4 h-4 text-black shrink-0 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="font-medium text-[11px]">Twitter / X</span>
                    </label>

                    {/* Facebook */}
                    <label
                      className={cn(
                        'flex items-center gap-2 p-2.5 bg-white border border-[#dedcd6] rounded-xl cursor-pointer hover:border-[#1c2623] transition-all',
                        selectedSocial === 'facebook' && 'border-[#1c2623] bg-[#eceae1]/50'
                      )}
                    >
                      <input
                        type="radio"
                        name="social-platform"
                        value="facebook"
                        checked={selectedSocial === 'facebook'}
                        onChange={() => setSelectedSocial('facebook')}
                        className="text-[#1c2623]"
                      />
                      <svg
                        className="w-4 h-4 text-[#1877F2] shrink-0 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="font-medium text-[11px]">Facebook</span>
                    </label>

                    {/* Instagram */}
                    <label
                      className={cn(
                        'flex items-center gap-2 p-2.5 bg-white border border-[#dedcd6] rounded-xl cursor-pointer hover:border-[#1c2623] transition-all',
                        selectedSocial === 'instagram' && 'border-[#1c2623] bg-[#eceae1]/50'
                      )}
                    >
                      <input
                        type="radio"
                        name="social-platform"
                        value="instagram"
                        checked={selectedSocial === 'instagram'}
                        onChange={() => setSelectedSocial('instagram')}
                        className="text-[#1c2623]"
                      />
                      <svg
                        className="w-4 h-4 text-[#E4405F] shrink-0 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="font-medium text-[11px]">Instagram</span>
                    </label>

                    {/* Snapchat */}
                    <label
                      className={cn(
                        'flex items-center gap-2 p-2.5 bg-white border border-[#dedcd6] rounded-xl cursor-pointer hover:border-[#1c2623] transition-all',
                        selectedSocial === 'snapchat' && 'border-[#1c2623] bg-[#eceae1]/50'
                      )}
                    >
                      <input
                        type="radio"
                        name="social-platform"
                        value="snapchat"
                        checked={selectedSocial === 'snapchat'}
                        onChange={() => setSelectedSocial('snapchat')}
                        className="text-[#1c2623]"
                      />
                      <svg
                        className="w-4 h-4 text-[#FFFC00] bg-black rounded p-0.5 shrink-0 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.007 0C6.275 0 3.738 4.093 3.738 6.945c0 1.954.887 3.518 1.96 4.673.344.37.52.793.52 1.258 0 .23-.047.452-.136.657-.225.518-.62.868-1.173 1.042-.716.225-1.458.269-2.204.133a.475.475 0 0 0-.54.34.464.464 0 0 0 .193.516c1.127.766 2.378 1.137 3.717 1.103.542-.014 1.05.158 1.472.5a2.53 2.53 0 0 1 .843 1.456c.078.43.082.872.012 1.306-.055.337-.156.66-.301.964-.176.368-.415.69-.711.957-.468.423-.464.808-.008 1.124.62.43 1.348.665 2.164.7.747.03 1.493-.07 2.217-.3.512-.162 1.025-.325 1.543-.483.743-.226 1.488-.226 2.23 0 .52.158 1.033.321 1.544.483.725.23 1.47.33 2.217.3.816-.035 1.544-.27 2.164-.7.456-.316.46-.701-.008-1.124a3.3 3.3 0 0 1-.711-.957 4.23 4.23 0 0 1-.301-.964c-.07-.434-.066-.876.012-1.306.182-.497.472-.99.843-1.456.422-.342.93-.514 1.472-.5 1.339.034 2.59-.337 3.717-1.103a.464.464 0 0 0 .193-.516.475.475 0 0 0-.54-.34c-.746.136-1.488.092-2.204-.133-.553-.174-.948-.524-1.173-1.042a1.86 1.86 0 0 1-.136-.657c0-.465.176-.888.52-1.258 1.073-1.155 1.96-2.719 1.96-4.673C20.276 4.093 17.739 0 12.007 0z" />
                      </svg>
                      <span className="font-medium text-[11px]">Snapchat</span>
                    </label>

                    {/* LinkedIn */}
                    <label
                      className={cn(
                        'flex items-center gap-2 p-2.5 bg-white border border-[#dedcd6] rounded-xl cursor-pointer hover:border-[#1c2623] transition-all',
                        selectedSocial === 'linkedin' && 'border-[#1c2623] bg-[#eceae1]/50'
                      )}
                    >
                      <input
                        type="radio"
                        name="social-platform"
                        value="linkedin"
                        checked={selectedSocial === 'linkedin'}
                        onChange={() => setSelectedSocial('linkedin')}
                        className="text-[#1c2623]"
                      />
                      <svg
                        className="w-4 h-4 text-[#0A66C2] shrink-0 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span className="font-medium text-[11px]">LinkedIn</span>
                    </label>
                  </div>

                  {/* Option Autre */}
                  <div className="pt-2 border-t border-[#dedcd6]">
                    <label
                      className={cn(
                        'flex items-center gap-2 text-xs font-semibold text-[#1c2623] mb-1.5 cursor-pointer',
                        selectedSocial === 'autre' && 'text-[#ea580c]'
                      )}
                    >
                      <input
                        type="radio"
                        name="social-platform"
                        value="autre"
                        checked={selectedSocial === 'autre'}
                        onChange={() => setSelectedSocial('autre')}
                        className="text-[#1c2623]"
                      />
                      <span>➕ Autre canal ou recherche Google</span>
                    </label>
                    {selectedSocial === 'autre' && (
                      <textarea
                        rows={2}
                        placeholder="Précisez votre source ici..."
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        className="w-full bg-white border border-[#dedcd6] rounded-xl p-2.5 text-xs text-[#1c2623] focus:outline-none focus:border-[#1c2623]"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Submit / Skip Footer */}
              <div className="mt-6 pt-5 border-t border-[#dedcd6] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="text-xs font-semibold text-[#576560] hover:text-[#1c2623] cursor-pointer transition-colors"
                >
                  Passer cette étape
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="bg-[#1c2623] hover:bg-[#2b3a35] text-[#eceae1] px-6 py-3 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  <span>Soumettre & Terminer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-[#576560] mt-4 pt-3 border-t border-[#dedcd6]">
              Faso Info Art Technologie &bull; Votre demande est déjà enregistrée sous 24h
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
