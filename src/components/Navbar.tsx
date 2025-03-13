"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('/');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Set active link based on current path
    setActiveLink(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="font-bold text-xl text-gray-800">JoPF Art Studio</div>

        <ul className="flex space-x-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/paintings' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' }
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <span
                  className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                    activeLink === link.path
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-600 hover:text-blue-500'
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
