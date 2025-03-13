import { prisma } from '@/lib/client'
import Link from 'next/link'
import Image from 'next/image'


export default async function PaintingsPage() {

  const paintings = await prisma.painting.findMany({
    include: {
      images: {
        take: 1, // Only take the first image for the grid view
      },
      colors: true,
      techniques: true,
    },
    orderBy: {
      year: 'desc', // Show newest paintings first
    },
  })


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Art Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paintings.map((painting) => (
          <Link
            href={`/paintings/${painting.id}`}
            key={painting.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64 w-full">
              {painting.images.length > 0 ? (
                <Image
                  src={painting.images[0].url}
                  alt={painting.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold">{painting.title}</h2>
              <p className="text-gray-600 mt-1">{painting.size}, {painting.year}</p>

              {/* Display up to 3 colors */}
              {painting.colors.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {painting.colors.slice(0, 3).map((color) => (
                    <span key={color.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {color.name}
                    </span>
                  ))}
                  {painting.colors.length > 3 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      +{painting.colors.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Display up to 2 techniques */}
              {painting.techniques.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {painting.techniques.slice(0, 2).map((technique) => (
                    <span key={technique.id} className="text-xs text-gray-600 italic">
                      {technique.name}
                    </span>
                  ))}
                  {painting.techniques.length > 2 && (
                    <span className="text-xs text-gray-600 italic">
                      +{painting.techniques.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
