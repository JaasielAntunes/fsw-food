import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { CartProvider } from './_context/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FSW Food',
  description: 'Projeto em desenvolvimento.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
