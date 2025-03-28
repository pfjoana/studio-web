"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {

  const pathname = usePathname();

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="font-serif font-bold text-2xl text-navy">JoPF Art Studio</div>
        <ul className="flex space-x-8">
          {[
            // { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/paintings' },
            // { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' }
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <span className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
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
      <span className="text-sm pl-10 text-red-900">
      This is a temporary but fully functional version of the site. Feel free to use the contact form and navigate without any issues!
      </span>
    </nav>
  );
}
