"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/src/components/ui/sheet'
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LocaleSwitcher from "./LocaleSwitcher";
import { Link, usePathname } from '@/src/i18n/routing';
import Image from 'next/image';

export default function Navbar() {

  const t = useTranslations('navbar');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname)

  const navLinks = [
    { name: t('gallery'), path: '/paintings' },
    { name: t('about'), path: '/about' },
    { name: t('contacts'), path: '/contacts' }
  ]

  const isActive = (path: string) => {
    const currentPath = pathname;

    // // Special case for homepage
    // if (path === '/' && (currentPath === '/' || currentPath === '')) {
    //   return true;
    // }

    return currentPath === path;
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={'fixed top-0 w-full z-50 bg-white shadow-md py-4'}>
      <div className="container mx-auto px-4 flex justify-between items-center">

      <Link href={{ pathname: "/paintings" }} className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
      <div className="font-marcellus text-2xl text-black">Art Studio by</div>
        <Image
          src="/logo.png"
          alt="JoPF Art Studio Logo"
          width={60}
          height={60}
          className="object-contain"
        />
      </Link>



        {/* <div className="font-marcellus text-2xl text-navy">JoPF Art Studio</div> */}

        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={{pathname: link.path as "/paintings" | "/about" | "/contacts" }}>
              <span className={`text-xl font-marcellus font-medium cursor-pointer transition-colors duration-200
                  ${isActive(link.path) ? 'text-navy border-b-2 border-terracotta pb-1' : 'hover:text-terracotta'}`}>
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
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button type="button">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              {navLinks.map((link) => (
                <Link key={link.name}
                  href={{pathname: link.path as "/paintings" | "/about" | "/contacts" }}
                  onClick={handleLinkClick}>
                  <span className={`text-xl font-marcellus block
                    ${isActive(link.path) ? 'text-navy font-semibold border-l-4 border-navy pl-2' : ''}`}>
                    {link.name}
                  </span>
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
