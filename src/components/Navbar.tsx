"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navbar() {

  const pathname = usePathname();
  const t = useTranslations('navbar');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={'fixed top-0 w-full z-50 bg-white shadow-md py-4'}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="font-marcellus text-2xl text-navy">JoPF Art Studio</div>
        <ul className="flex space-x-8">
          {[
            { name: t('gallery'), path: '/paintings' },
            { name: t('about'), path: '/about' },
            { name: t('contacts'), path: '/contacts' }
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <span className={`text-xl font-marcellus font-medium cursor-pointer transition-colors duration-200 ${
                    pathname === link.path
                      ? 'text-[#c06d59] border-b-2 border-gold pb-1'
                      : 'text-charcoal hover:text-blue-500'
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
