import {defineRouting} from 'next-intl/routing';

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
    "about": {
      "en": "/about",
      "pt": "/sobre",
    },
    "/contacts": {
      "en": "/contacts",
      "pt": "/conctatos",
    },
  },
});
