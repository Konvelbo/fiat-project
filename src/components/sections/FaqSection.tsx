import React from 'react'
import { motion } from 'motion/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion'

export const FaqSection: React.FC = () => {
  const faqData = [
    {
      id: 'item-1',
      question: 'Dans quelles régions du Burkina Faso FIAT intervient-elle ?',
      answer:
        "FIAT intervient dans l'ensemble des 13 régions du Burkina Faso (Ouagadougou, Bobo-Dioulasso, Koudougou, Ouahigouya, Fada N'Gourma, etc.). Nos équipes mobiles se déplacent sur vos sites industriels, résidences ou chantiers de construction.",
    },
    {
      id: 'item-2',
      question: 'Quels types de clients accompagne M. KONVELBO Élisée ?',
      answer:
        "Avec 11 ans d'expérience, M. KONVELBO et son équipe accompagnent les particuliers (villas, résidences de standing), les PME, les grandes entreprises et institutions, ainsi que les industries et chantiers BTP.",
    },
    {
      id: 'item-3',
      question: 'Comment se déroule la demande de devis et l\'étude technique ?',
      answer:
        "Vous pouvez remplir directement notre formulaire de réservation ou nous contacter par téléphone. Nous analysons vos besoins et votre domaine d'activité afin de vous fournir une proposition technique et financière sous 24h.",
    },
    {
      id: 'item-4',
      question: 'Le matériel informatique et les installations sont-ils sous garantie ?',
      answer:
        "Oui, l'ensemble du matériel (caméras IP 4K, serveurs NAS Synology, bornes WiFi, automatismes de portails, ordinateurs et onduleurs) est certifié d'origine constructeur avec une garantie et un service après-vente (SAV) réactif.",
    },
    {
      id: 'item-5',
      question: 'Peut-on consulter les caméras et contrôler les accès à distance ?',
      answer:
        "Absolument. Nos systèmes de vidéosurveillance et de motorisation de portails intègrent des applications mobiles sécurisées vous permettant de visualiser en temps réel vos caméras et d'ouvrir vos accès à distance où que vous soyez.",
    },
  ]

  return (
    <section id="faq" className="py-24 px-4 bg-[#f3f5ee] border-t border-[#dedcd6]">
      <div className="max-w-[760px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#576560] mb-2">
            04 &bull; Foire Aux Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1c2623]">
            Questions fréquentes sur nos <span className="font-serif-italic">services</span>.
          </h2>
          <p className="text-xs sm:text-sm text-[#576560] mt-2">
            Tout ce que vous devez savoir avant de confier vos projets à FIAT.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Accordion defaultOpen={['item-1']}>
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
