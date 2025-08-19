import type { Metadata } from "next"
import { Playfair_Display, Raleway, Marcellus} from 'next/font/google'
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/src/i18n/routing';
import "@/src/app/globals.css"
import Navbar from "../../components/Navbar"
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

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  display: 'swap',
  variable: "--font-marcellus",
})



export const metadata: Metadata = {
  title: "JoPF Art Studio",
  description: "Showcasing unique paintings and art services.",
  icons: `/favicon.ico`,
};

export default async function LocaleLayout({    children,
    params
  }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
  }) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }

  return (
    <html lang={locale} className={`${playfair.variable} ${raleway.variable} ${marcellus.variable}`}>
      <body className="font-sans text-charcoal bg-stone min-h-screen">
      <NextIntlClientProvider>
        <Navbar/>
        <main className="pt-20">
          {children}
        </main>
        <Toaster />
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
