import { prisma } from '@/lib/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface PaintingPageProps {
  params: {
    id: string
  }
}

export default async function PaintingPage({ params }: PaintingPageProps) {
  // Fetch the specific painting by ID with all related data
  const painting = await prisma.painting.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
      colors: true,
      techniques: true,
    },
  })

  // If painting not found, render the 404 page
  if (!painting) {
    notFound()

  }  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/paintings" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Gallery
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{painting.title}</h1>
      <p className="text-gray-600 mb-6">{painting.year}, {painting.size}</p>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {painting.images.length > 0 ? (
          painting.images.map((image, index) => (
            <div key={image.id} className="relative h-80 w-full rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt={`${painting.title} - Image ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))
        ) : (
          <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No images available</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">About this Painting</h2>
          {painting.description ? (
            <p className="text-gray-700">{painting.description}</p>
          ) : (
            <p className="text-gray-500 italic">No description available</p>
          )}
        </div>

        {/* Specifications */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700">Size</h3>
            <p>{painting.size}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700">Year</h3>
            <p>{painting.year}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700">Colors</h3>
            {painting.colors.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {painting.colors.map((color) => (
                  <span key={color.id} className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {color.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No colors specified</p>
            )}
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Techniques</h3>
            {painting.techniques.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {painting.techniques.map((technique) => (
                  <span key={technique.id} className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {technique.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No techniques specified</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Interested in this artwork?</h2>
        <p className="mb-4">Contact us for availability, pricing, or to schedule a viewing.</p>
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Contact Gallery
        </Link>
      </div>
    </div>
  )
}

// Generate static params for paintings at build time
// prepares the list of painting IDs so Next can generate static pages for each painting
//avoid fetching at runtime
export async function generateStaticParams() {
  const paintings = await prisma.painting.findMany({
    select: { id: true },
  })

  return paintings.map((painting) => ({
    id: painting.id,
  }))
}
