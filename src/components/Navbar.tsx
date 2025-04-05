"use client";

import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet'
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {

  const t = useTranslations('navbar');

  const navLinks = [
    { name: t('gallery'), path: '/paintings' },
    { name: t('about'), path: '/about' },
    { name: t('contacts'), path: '/contacts' }
  ]

  return (
    <nav className={'fixed top-0 w-full z-50 bg-white shadow-md py-4'}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="font-marcellus text-2xl text-navy">JoPF Art Studio</div>

        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <span className="text-xl font-marcellus font-medium cursor-pointer transition-colors duration-200">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <LocaleSwitcher />
          </li>
        </ul>


        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12">
              <div className="font-marcellus text-2xl text-navy px-2">JoPF Art Studio</div>
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <span className="text-xl font-marcellus block">{link.name}</span>
                </Link>
              ))}
              <LocaleSwitcher />
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}
