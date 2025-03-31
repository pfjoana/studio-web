import type { Metadata } from "next"
import { Playfair_Display, Raleway } from 'next/font/google'
import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Toaster } from "@/src/components/ui/toaster"

// Load fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: "JoPF Art Studio",
  description: "Showcasing unique paintings and art services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${raleway.variable}`}>
      <body className="font-sans text-charcoal bg-stone min-h-screen">
        <Navbar/>
        <main className="pt-20">
          {children}
        </main>
        <Toaster />
        <Footer/>
      </body>
    </html>
  );
}
