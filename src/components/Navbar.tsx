"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { routing } from "@/src/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {

  const pathname = usePathname();
  const t = useTranslations('navbar');

  const currentLocale = pathname.split('/')[1];

  const getNormalizedPathname = (pathname: string) => {
    const segments = pathname.split('/');
    const normalizedPathname = '/' + segments.slice(2).join('/');
    return normalizedPathname;
  };

  const getLocalizedPath = (path: string) => {
    return routing.pathnames[path]?.[currentLocale]
  };

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
                <span className={`text-xl font-marcellus font-medium cursor-pointer transition-colors duration-200 ${
                    getNormalizedPathname(pathname) === getLocalizedPath(link.path)
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
