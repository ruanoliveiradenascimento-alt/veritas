import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veritas - Plataforma de Estudos com IA',
  description: 'Coneximento que acompanha você. Cadernos completos, videoaulas objetivas, simulados e assistência inteligente.',
  keywords: ['educação', 'IA', 'estudos', 'aprendizado'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-dark text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
