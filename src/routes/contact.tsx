import React, { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle2, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../lib/utils'
import { sendContactMessage } from '../lib/resend'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  const [selectedSector, setSelectedSector] = useState<string>('Entreprises & Sièges')
  const [isOtherSector, setIsOtherSector] = useState<boolean>(false)
  const [otherSectorText, setOtherSectorText] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  })

  const sectors = [
    { id: 'entreprises', label: '🏢 Entreprises & Sièges' },
    { id: 'industries', label: '🏭 Industries & Mines' },
    { id: 'btp', label: '🏗️ BTP & Chantiers' },
    { id: 'residences', label: '🏡 Résidences & Particuliers' },
    { id: 'sante', label: '🏥 Santé & Éducation' },
    { id: 'autre', label: '⚡ Autre domaine', isOther: true },
  ]

  const handleSectorSelect = (sector: { id: string; label: string; isOther?: boolean }) => {
    setSelectedSector(sector.label)
    if (sector.isOther) {
      setIsOtherSector(true)
    } else {
      setIsOtherSector(false)
      setOtherSectorText('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const finalSector = isOtherSector && otherSectorText.trim() ? otherSectorText.trim() : selectedSector

    try {
      await sendContactMessage({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        sector: finalSector,
        message: formData.message,
      })

      setIsSubmitted(true)
      toast.success('Votre demande a bien été transmise à M. KONVELBO Élisée et à l’équipe FIAT.', {
        description: 'Vous recevrez une réponse technique & commerciale sous 24 heures.',
        duration: 6000,
      })
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue lors de l'envoi."
      toast.error("Erreur lors de l'envoi du message", {
        description: errorMsg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      agree: false,
    })
    setIsOtherSector(false)
    setOtherSectorText('')
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-[#cbd5d7] text-[#161f1c] p-3 sm:p-5 lg:p-6 flex flex-col justify-between font-sans antialiased selection:bg-[#161f1c] selection:text-white relative">
      {/* Top Bar / Navigation Link */}
      <div className="w-full max-w-[1480px] mx-auto mb-2 sm:mb-3 flex items-center justify-between px-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#485955] hover:text-[#161f1c] transition-all duration-200 py-1.5 px-3.5 rounded-full bg-white/50 hover:bg-white/90 backdrop-blur-sm border border-black/5 hover:scale-105 active:scale-95 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l'accueil</span>
        </Link>
        <div className="text-[11px] font-bold uppercase tracking-widest text-[#556763] hidden sm:block">
          FIAT &bull; Consultation & Déploiement
        </div>
      </div>

      {/* Main 2-Column Split Container */}
      <div className="w-full max-w-[1480px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch my-auto">
        {/* Left Column : Editorial Stacked Hands Photography + Founder Testimonial Badge */}
        <div className="lg:col-span-6 relative rounded-[24px] sm:rounded-[30px] overflow-hidden min-h-[500px] sm:min-h-[580px] lg:min-h-[760px] bg-[#1a221f] shadow-sm flex flex-col justify-end p-5 sm:p-7 lg:p-8">
          <img
            src="/hands-stack-team.jpg"
            alt="FIAT - Travail d'équipe et engagement au Burkina Faso"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle natural shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

          {/* Dark Floating Founder Testimonial Card in Bottom Left */}
          <div className="relative z-10 max-w-[420px] bg-[#161d1b] text-white p-5 sm:p-6 rounded-[22px] shadow-2xl border border-white/10 space-y-4">
            <p className="text-[12.5px] sm:text-[13px] leading-[1.5] text-[#d6dfdc] font-normal tracking-tight">
              “FIAT et M. KONVELBO Élisée ont su structurer, sécuriser et moderniser l'intégralité
              de nos réseaux et systèmes de sécurité avec une fiabilité sans faille au Burkina Faso.
              Le plus grand changement n’était pas seulement la rapidité — c'était la confiance absolue.”
            </p>
            <div className="flex items-center gap-3 pt-1 border-t border-white/10">
              <img
                src="/Photo-pdg-fiat.png"
                alt="M. KONVELBO Élisée - Fondateur FIAT"
                className="w-10 h-10 rounded-xl object-cover object-top border border-white/20 bg-neutral-800 shrink-0 shadow-md"
              />
              <div>
                <div className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-tight">
                  M. KONVELBO Élisée
                </div>
                <div className="text-[10.5px] sm:text-[11px] text-[#8ea09c] leading-tight mt-0.5">
                  Fondateur & Directeur Général, FIAT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column : Minimalist Form with Domaine d'activité */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2 sm:py-4 px-2 sm:px-6 lg:px-8 max-w-[580px] w-full mx-auto lg:mx-0">
          {isSubmitted ? (
            <div className="my-auto py-16 px-6 text-center space-y-5 bg-white/40 backdrop-blur-sm rounded-[24px] border border-white/60 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#161f1c] tracking-tight">
                  Message envoyé avec succès !
                </h3>
                <p className="text-xs sm:text-sm text-[#4f605c] max-w-sm mx-auto leading-relaxed">
                  Merci pour votre confiance. <strong>M. KONVELBO Élisée</strong> et l'équipe technique
                  de <strong>FIAT</strong> ont bien reçu votre demande et prendront contact avec vous
                  sous 24 heures.
                </p>
              </div>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className="btn-magnetic-primary bg-[#161f1c] hover:bg-[#283632] text-white px-7 py-3 rounded-full text-xs font-semibold shadow-sm"
                >
                  Retour à l'accueil
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-magnetic-secondary border border-[#b8c6c8] bg-white hover:bg-[#f3f5ee] text-[#161f1c] px-7 py-3 rounded-full text-xs font-semibold shadow-xs"
                >
                  Envoyer un autre message
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Brand Header */}
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg sm:text-xl tracking-tight text-[#161f1c]">
                  FIAT<span className="text-[12px] align-super font-semibold">™</span>
                </div>
                <div className="text-[11px] font-semibold text-[#52635f] bg-white/40 px-3 py-1 rounded-full border border-black/5">
                  Faso Info Art Technologie
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2">
                <h1 className="text-[40px] sm:text-[48px] lg:text-[52px] font-normal text-[#161f1c] tracking-[-0.03em] leading-[1.05]">
                  <span className="font-sans font-semibold">Démarrer une </span>
                  <span className="font-serif-italic font-normal">conversation</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-[#4f605c] leading-relaxed max-w-md font-normal pt-0.5">
                  Transmettez-nous quelques détails sur votre organisation et vos besoins. M. KONVELBO
                  Élisée et notre équipe vous répondront sous 24 heures.
                </p>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                {/* First Name & Last Name Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10.5px] font-bold tracking-[0.08em] text-[#556763] uppercase mb-1.5">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Élisée"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#f3f7f7] hover:bg-white focus:bg-white border-0 ring-1 ring-black/5 focus:ring-2 focus:ring-[#161f1c]/25 rounded-[14px] px-3.5 py-3 text-xs sm:text-[13.5px] text-[#161f1c] placeholder:text-[#9bb0ac] transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-bold tracking-[0.08em] text-[#556763] uppercase mb-1.5">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ouédraogo"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#f3f7f7] hover:bg-white focus:bg-white border-0 ring-1 ring-black/5 focus:ring-2 focus:ring-[#161f1c]/25 rounded-[14px] px-3.5 py-3 text-xs sm:text-[13.5px] text-[#161f1c] placeholder:text-[#9bb0ac] transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.08em] text-[#556763] uppercase mb-1.5">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@entreprise.bf"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f3f7f7] hover:bg-white focus:bg-white border-0 ring-1 ring-black/5 focus:ring-2 focus:ring-[#161f1c]/25 rounded-[14px] px-3.5 py-3 text-xs sm:text-[13.5px] text-[#161f1c] placeholder:text-[#9bb0ac] transition-all outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.08em] text-[#556763] uppercase mb-1.5">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+226 70 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#f3f7f7] hover:bg-white focus:bg-white border-0 ring-1 ring-black/5 focus:ring-2 focus:ring-[#161f1c]/25 rounded-[14px] px-3.5 py-3 text-xs sm:text-[13.5px] text-[#161f1c] placeholder:text-[#9bb0ac] transition-all outline-none"
                  />
                </div>

                {/* Domaine d'activité (Sector Chips Selection) */}
                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.08em] text-[#556763] uppercase mb-1.5">
                    Domaine d'Activité
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {sectors.map((sector) => {
                      const isSelected = selectedSector === sector.label
                      return (
                        <button
                          key={sector.id}
                          type="button"
                          onClick={() => handleSectorSelect(sector)}
                          className={cn(
                            'text-[11.5px] font-medium py-2 px-2.5 rounded-[12px] text-left transition-all duration-200 cursor-pointer shadow-2xs',
                            isSelected
                              ? 'bg-[#161f1c] text-white shadow-sm scale-[1.02]'
                              : 'bg-[#f3f7f7] hover:bg-white text-[#2c3d38] border border-black/5 hover:border-black/15'
                          )}
                        >
                          {sector.label}
                        </button>
                      )
                    })}
                  </div>

                  {/* Textarea dynamique pour Autre Secteur */}
                  {isOtherSector && (
                    <div className="mt-2.5">
                      <textarea
                        rows={2}
                        placeholder="Précisez votre domaine d'activité particulier..."
                        value={otherSectorText}
                        onChange={(e) => setOtherSectorText(e.target.value)}
                        className="w-full bg-[#f3f7f7] hover:bg-white focus:bg-white border-0 ring-1 ring-black/5 focus:ring-2 focus:ring-[#161f1c]/25 rounded-[14px] p-3 text-xs sm:text-[13px] text-[#161f1c] placeholder:text-[#9bb0ac] transition-all outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.08em] text-[#556763] uppercase mb-1.5">
                    Message & Détails du Projet *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Présentez votre infrastructure, vos besoins en réseau WiFi, vidéosurveillance ou serveurs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#f3f7f7] hover:bg-white focus:bg-white border-0 ring-1 ring-black/5 focus:ring-2 focus:ring-[#161f1c]/25 rounded-[14px] p-3.5 text-xs sm:text-[13.5px] text-[#161f1c] placeholder:text-[#9bb0ac] transition-all outline-none leading-relaxed resize-none"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms-agree"
                    required
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="w-4 h-4 rounded-[4px] border border-[#9bb0ac] bg-white text-[#161f1c] focus:ring-0 cursor-pointer accent-[#161f1c]"
                  />
                  <label
                    htmlFor="terms-agree"
                    className="text-[12px] text-[#556763] cursor-pointer select-none"
                  >
                    J'accepte le traitement de mes données pour l'établissement de mon devis / contact.
                  </label>
                </div>

                {/* Send Message Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-magnetic-primary bg-[#161f1c] hover:bg-[#2b3a35] text-white disabled:opacity-60 px-8 py-3.5 rounded-full font-semibold text-xs sm:text-[13px] flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />
                        <span>Transmission en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer le message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Bottom Footer Note (No Framer Badge) */}
          <div className="pt-6 border-t border-black/5 text-[11px] text-[#697b77] mt-4 flex items-center justify-between">
            <span>FIAT &bull; Faso Info Art Technologie</span>
            <span>Réponse assurée sous 24h &bull; Burkina Faso</span>
          </div>
        </div>
      </div>
    </div>
  )
}
