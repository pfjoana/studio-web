'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'


type Painting = {
  id: string;
  title: string;
  size: string;
  year: number;
  available: boolean;
  colors: { id: string; name: string }[];
  techniques: { id: string; name: string }[];
  images: {
    id: string;
    publicId: string;
    url: string;
  }[]
}

type PaintingsGalleryProps = {
  paintings: Painting[];
}

export default function PaintingsGallery({ paintings }: PaintingsGalleryProps) {

  const tGallery = useTranslations("gallery");
  const tAvailable = useTranslations("available");
  const tPainting = useTranslations("painting");


  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-12 text-center">
        <h1 className="heading">{tGallery("heading")}</h1>
        <p className="text-charcoal max-w-2xl mx-auto">
        {tGallery("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paintings.map((painting) => (
          <Link
            href={`/paintings/${painting.id}`}
            key={painting.id}
            className="group border border-stone rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative h-64 w-full overflow-hidden">

              {painting.images.length > 0 ? (
                <Image
                  src={painting.images[0].url}
                  alt={painting.title}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-stone flex items-center justify-center">
                  <span className="text-gray-500">{tGallery("noImage")}</span>
                </div>
              )}
            </div>

            <div className="p-5 pt-3 bg-white relative">
              <h2 className="text-xl font-serif underline text-medium text-navy">{painting.title}</h2>
              <p className="text-sm text-charcoal mt-1">{painting.year}</p>
              <p className="text-sm  text-charcoal mt-1">{painting.size} </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {painting.techniques.slice(0, 2).map((technique) => (
                    <span key={technique.id} className="text-sm text-charcoal italic">
                      {tPainting(technique.name)}
                    </span>
                  ))}
                </div>

              <span className={`absolute bottom-5 right-5 text-sm
              ${painting.available ? 'text-terracotta border-b border-terracotta font-medium' : 'text-charcoal'}`}>

                {painting.available ? tAvailable("available") : tAvailable("sold") } </span>

                {/* <div className="flex flex-wrap gap-1 mt-3">
                  {painting.colors.slice(0, 3).map((color) => (
                    <span key={color.id} className="text-sm bg-stone px-2 mx-1 py-1 rounded text-charcoal">
                      {color.name}
                    </span>
                  ))}
                </div> */}

            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
