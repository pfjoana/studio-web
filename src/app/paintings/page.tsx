import { prisma } from '@/lib/client'
import Link from 'next/link'
import Image from 'next/image'


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


  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">Art Gallery</h1>
        <p className="text-charcoal max-w-2xl mx-auto">
          Explore our curated collection of artworks in a variety of styles and techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paintings.map((painting) => (
          <Link
            href={`/paintings/${painting.id}`}
            key={painting.id}
            className="group border border-stone rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-64 w-full overflow-hidden">
              {painting.images.length > 0 ? (
                <Image
                  src={painting.images[0].url}
                  alt={painting.title}
                  // placeholder="blur"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-stone flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            <div className="p-5 bg-white">
              <h2 className="text-xl font-serif text-navy">{painting.title}</h2>
              <p className="text-charcoal/80 mt-1">{painting.size}, {painting.year}</p>

              {/* Display up to 3 colors */}
              {painting.colors.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {painting.colors.slice(0, 3).map((color) => (
                    <span key={color.id} className="text-xs bg-white px-2 py-1 rounded text-charcoal">
                      {color.name}
                    </span>
                  ))}
                  {painting.colors.length > 3 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-charcoal">
                      +{painting.colors.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Display up to 2 techniques */}
              {painting.techniques.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {painting.techniques.slice(0, 2).map((technique) => (
                    <span key={technique.id} className="text-xs text-terracotta italic">
                      {technique.name}
                    </span>
                  ))}
                  {painting.techniques.length > 2 && (
                    <span className="text-xs text-terracotta italic">
                      +{painting.techniques.length - 2} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-3 inline-block border-b border-gold pb-1 text-sm font-medium text-navy transition-colors group-hover:border-terracotta group-hover:text-terracotta">
                View details
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
