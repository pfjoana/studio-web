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
        <h1 className="heading">Art Gallery</h1>
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

            <div className="p-5 pt-3 bg-white">
              <h2 className="text-xl font-serif underline text-medium text-navy">{painting.title}</h2>
              <p className="text-sm text-charcoal mt-1">{painting.year}</p>
              <p className="text-sm  text-charcoal mt-1">{painting.size} </p>


                <div className="flex flex-wrap gap-1 mt-2">
                  {painting.techniques.slice(0, 2).map((technique) => (
                    <span key={technique.id} className="text-sm font-medium text-navy italic">
                      {technique.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {painting.colors.slice(0, 3).map((color) => (
                    <span key={color.id} className="text-sm bg-stone px-2 mx-1 py-1 rounded text-charcoal">
                      {color.name}
                    </span>
                  ))}
                </div>

              {/* <div className="flex justify-end mt-3">
                <div className="inline-block border-b border-gold pb-1 text-sm font-medium text-navy transition-colors group-hover:border-terracotta group-hover:text-terracotta ml-auto">
                  View details
                </div>
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
