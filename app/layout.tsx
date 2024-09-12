// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Algorithm and Data Structure Visualizer',
  description: 'Interactive visualizations of common algorithms and data structures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}