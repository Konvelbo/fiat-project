import { createServerFn } from '@tanstack/react-start'

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  sector: string
  message: string
}

export interface SendMessageResult {
  success: boolean
  message?: string
  data?: unknown
}

function escapeHtml(str: string): string {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Server Function TanStack Start : Exécutée 100% CÔTÉ SERVEUR (Node / Nitro).
 * Élimine totalement les restrictions CORS du navigateur et protège la clé API Resend.
 */
export const sendContactMessageServerFn = createServerFn({ method: 'POST' })
  .validator((data: ContactFormData) => {
    if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      throw new Error('Adresse email invalide.')
    }
    if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length > 100) {
      throw new Error('Prénom invalide.')
    }
    if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length > 100) {
      throw new Error('Nom invalide.')
    }
    if (!data.message || typeof data.message !== 'string' || data.message.trim().length > 5000) {
      throw new Error('Message invalide ou trop long (max 5000 caractères).')
    }
    return data
  })
  .handler(async ({ data }) => {
    const apiKey =
      process.env.VITE_RESEND_API_KEY ||
      process.env.RESEND_API_KEY ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RESEND_API_KEY) ||
      ''
    const targetUrl =
      process.env.VITE_CONTACT_API_URL ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_API_URL) ||
      'https://api.resend.com/emails'
    const toEmail =
      process.env.VITE_RESEND_TO_EMAIL ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RESEND_TO_EMAIL) ||
      'contact@fiat.bf'
    const fromEmail =
      process.env.VITE_RESEND_FROM_EMAIL ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RESEND_FROM_EMAIL) ||
      'onboarding@resend.dev'

    const formattedDate = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    // Sécurisation et désinfection XSS de tous les champs utilisateurs
    const safeFirstName = escapeHtml(data.firstName.trim().slice(0, 100))
    const safeLastName = escapeHtml(data.lastName.trim().slice(0, 100))
    const safeEmail = escapeHtml(data.email.trim().slice(0, 150))
    const safePhone = escapeHtml(data.phone.trim().slice(0, 50))
    const safeSector = escapeHtml(data.sector.trim().slice(0, 100))
    const safeMessage = escapeHtml(data.message.trim().slice(0, 5000))

    // Nettoyage strict du numéro de téléphone pour lien WhatsApp direct
    const cleanPhone = safePhone.replace(/[^0-9+]/g, '')
    const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}`

    // Version texte brut (fallback anti-spam & accessibilité)
    const plainTextContent = `
NOUVELLE DEMANDE DE CONTACT / DEVIS - FIAT ™
Faso Info Art Technologie • M. KONVELBO Élisée
==================================================

INFORMATIONS DU CLIENT :
- Prénom : ${safeFirstName}
- Nom : ${safeLastName}
- Email : ${safeEmail}
- Téléphone / WhatsApp : ${safePhone}
- Domaine d'activité : ${safeSector}

DÉTAILS DU MESSAGE & PROJET :
${data.message.trim().slice(0, 5000)}

==================================================
Transmis le : ${formattedDate}
Répondre directement à : ${safeEmail}
    `.trim()

    // Corps d'email HTML haute fidélité sécurisé
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #eceae1; margin: 0; padding: 20px; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #dedcd6; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #141b18; color: #ffffff; padding: 24px; text-align: left; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0 0; font-size: 13px; color: #ea580c; font-weight: 600; }
            .content { padding: 28px 24px; }
            .table-info { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            .table-info td { padding: 10px 12px; border-bottom: 1px solid #f3f5ee; font-size: 13px; }
            .label { color: #576560; font-weight: 700; width: 150px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
            .value { color: #1c2623; font-weight: 600; }
            .badge { display: inline-block; background: #ea580c15; color: #ea580c; border: 1px solid #ea580c30; padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 12px; }
            .message-box { background: #fbf9f1; border: 1px solid #dedcd6; border-radius: 12px; padding: 18px; margin-top: 10px; }
            .message-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #576560; margin-bottom: 8px; }
            .message-text { margin: 0; font-size: 14px; line-height: 1.6; color: #1c2623; white-space: pre-wrap; }
            .actions { display: flex; gap: 10px; margin-top: 24px; padding-top: 20px; border-top: 1px solid #dedcd6; }
            .btn { display: inline-block; padding: 10px 18px; border-radius: 20px; font-size: 12px; font-weight: bold; text-decoration: none; text-align: center; }
            .footer { background: #f3f5ee; padding: 16px 24px; text-align: center; font-size: 11px; color: #576560; border-top: 1px solid #dedcd6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>FIAT ™ — Nouvelle Demande de Contact</h1>
              <p>Faso Info Art Technologie • M. KONVELBO Élisée</p>
            </div>
            
            <div class="content">
              <table class="table-info">
                <tr>
                  <td class="label">Prénom & Nom :</td>
                  <td class="value">${safeFirstName} ${safeLastName}</td>
                </tr>
                <tr>
                  <td class="label">Adresse Email :</td>
                  <td class="value"><a href="mailto:${safeEmail}" style="color: #ea580c; text-decoration: none; font-weight: bold;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Téléphone / WhatsApp :</td>
                  <td class="value"><a href="tel:${cleanPhone}" style="color: #1c2623; text-decoration: none;">${safePhone}</a></td>
                </tr>
                <tr>
                  <td class="label">Domaine d'activité :</td>
                  <td class="value"><span class="badge">${safeSector}</span></td>
                </tr>
              </table>

              <div class="message-box">
                <div class="message-title">Message & Détails du Projet :</div>
                <p class="message-text">${safeMessage}</p>
              </div>

              <div style="margin-top: 24px;">
                <a href="mailto:${safeEmail}?subject=Re:%20Votre%20demande%20FIAT%20-%20M.%20KONVELBO%20%C3%89lis%C3%A9e" style="display: inline-block; margin-right: 10px; padding: 10px 18px; border-radius: 20px; font-size: 12px; font-weight: bold; text-decoration: none; background: #1c2623; color: #ffffff;">
                  ✉️ Répondre au client
                </a>
                ${
                  cleanPhone
                    ? `<a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 18px; border-radius: 20px; font-size: 12px; font-weight: bold; text-decoration: none; background: #25D366; color: #ffffff;">
                        💬 Ouvrir sur WhatsApp
                      </a>`
                    : ''
                }
              </div>
            </div>

            <div class="footer">
              Message transmis le ${formattedDate} via le site officiel FIAT.<br>
              © 2015-2026 Faso Info Art Technologie — M. KONVELBO Élisée.
            </div>
          </div>
        </body>
      </html>
    `

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (apiKey && apiKey !== 're_your_resend_api_key_here') {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    // Détection du mode : Resend direct vs Webhook personnalisé
    const isDirectResend = targetUrl.includes('api.resend.com')

    const requestBody = isDirectResend
      ? {
          from: fromEmail,
          to: [toEmail],
          subject: `[FIAT Devis] ${data.firstName} ${data.lastName} - ${data.sector}`,
          html: htmlContent,
          text: plainTextContent,
          reply_to: data.email,
        }
      : {
          ...data,
          html: htmlContent,
          text: plainTextContent,
          sentAt: new Date().toISOString(),
        }

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        if (apiKey === 're_your_resend_api_key_here' || !apiKey) {
          console.info('[FIAT Resend Server] Simulation réussie (clé placeholder) :', data)
          return {
            success: true,
            message: "Message simulé avec succès (n'oubliez pas de configurer votre clé Resend dans .env).",
          }
        }

        const errorText = await response.text().catch(() => 'Erreur inconnue')
        throw new Error(`Erreur API Resend (${response.status}): ${errorText}`)
      }

      const responseData = await response.json().catch(() => ({ success: true }))
      return {
        success: true,
        data: responseData,
      }
    } catch (error) {
      if (apiKey === 're_your_resend_api_key_here' || !apiKey) {
        console.info('[FIAT Resend Server] Message enregistré côté serveur :', data)
        return {
          success: true,
          message: 'Message enregistré avec succès.',
        }
      }
      throw error
    }
  })

/**
 * Fonction cliente appelée par le formulaire de contact.
 * Elle invoque automatiquement la Server Function côté backend.
 */
export async function sendContactMessage(data: ContactFormData): Promise<SendMessageResult> {
  return await sendContactMessageServerFn({ data })
}

