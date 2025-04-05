"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {

  const t = useTranslations('navbar');

  return (
    <nav className={'fixed top-0 w-full z-50 bg-white shadow-md py-4'}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="font-marcellus text-2xl text-navy">JoPF Art Studio</div>
        <ul className="flex space-x-8">
          <li>
            <LocaleSwitcher />
          </li>

          {[{ name: t('gallery'), path: '/paintings' },
            { name: t('about'), path: '/about' },
            { name: t('contacts'), path: '/contacts' }
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <span className="text-xl font-marcellus font-medium cursor-pointer transition-colors duration-200">
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
