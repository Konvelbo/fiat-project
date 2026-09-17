import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'FIAT ™ — Faso Info Art Technologie | M. KONVELBO Élisée',
      },
      {
        name: 'description',
        content:
          "FIAT ™ - Entreprise d'ingénierie réseau, vidéosurveillance 4K, serveurs NAS, sécurité et domotique au Burkina Faso fondée par M. KONVELBO Élisée.",
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-right" richColors />
        <Scripts />
      </body>
    </html>
  )
}
