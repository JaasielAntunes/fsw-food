import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import { CartProvider } from './_context/cart'
import AuthProvider from './_providers/auth'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'FSW Food',
  description:
    'Projeto desenvolvido durante o evento FSW promovido pela Full Stack Club.',
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
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
