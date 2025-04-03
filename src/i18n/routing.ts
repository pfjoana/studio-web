import {defineRouting} from 'next-intl/routing';
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    "/paintings": {
      "en": "/gallery",
      "pt": "/galeria",
    },
    "/paintings/[id]" : {
      "en": "/gallery/[id]",
      "pt": "/galeria/[id]",
    },
    "/about": {
      "en": "/about",
      "pt": "/sobre",
    },
    "/contacts": {
      "en": "/contacts",
      "pt": "/contatos",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
