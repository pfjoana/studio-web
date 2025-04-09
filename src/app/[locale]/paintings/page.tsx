import { prisma } from '@/lib/client'
import Link from 'next/link'
import Image from 'next/image'
import {getTranslations} from 'next-intl/server';
import { getCloudinaryUrl } from '@/lib/cloudinary';

export default async function PaintingsPage() {

  const paintings = await prisma.painting.findMany({
    include: {
      images: {
        take: 1,
      },
      colors: true,
      techniques: true,
    },
    orderBy: {
    year: 'desc',
    },
  })

  if (!paintings || paintings.length === 0) {
    return <div>No paintings found</div>
  }

  const tGallery = await getTranslations("gallery");
  const tAvailable = await getTranslations("available");
  const tPainting = await getTranslations("painting");

  return (
    <div className="container mx-auto py-12 px-4">
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
                  src={getCloudinaryUrl(painting.images[0].url)}
                  alt={painting.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  fill
                  priority
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
                {painting.available ? tAvailable("available") : tAvailable("sold") }
              </span>

            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
