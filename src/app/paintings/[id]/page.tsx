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
      <Link href="/paintings" className="text-terracotta hover:text-navy transition-colors mb-8 inline-flex items-center">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Gallery
      </Link>

      <h1 className="text-xl font-serif font-bold mt-4 mb-2 text-navy">{painting.title}</h1>

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
          <div className="w-full h-80 bg-stone flex items-center justify-center rounded-lg">
            <span className="text-charcoal/60">No images available</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-navy">About this Painting</h2>
          {painting.description ? (
            <p className="text-charcoal leading-relaxed">{painting.description}</p>
          ) : (
            <p className="text-charcoal/60 italic">No description available</p>
          )}
        </div>

        {/* Specifications */}
        <div className="bg-stone p-6 rounded-lg">
          <h2 className="text-xl font-serif font-semibold mb-4 text-navy">Specifications</h2>

          <div className="mb-4">
            <h3 className="font-medium text-navy">Size</h3>
            <p className="text-charcoal">{painting.size}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-navy">Year</h3>
            <p className="text-charcoal">{painting.year}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-navy">Colors</h3>
            {painting.colors.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {painting.colors.map((color) => (
                  <span key={color.id} className="text-sm bg-white px-2 py-1 rounded-full shadow-sm text-charcoal">
                    {color.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-charcoal/60 italic">No colors specified</p>
            )}
          </div>

          <div>
            <h3 className="font-medium text-navy">Techniques</h3>
            {painting.techniques.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {painting.techniques.map((technique) => (
                  <span key={technique.id} className="text-sm bg-white px-2 py-1 rounded-full shadow-sm text-charcoal">
                    {technique.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-charcoal/60 italic">No techniques specified</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="mt-16 bg-navy p-8 rounded-lg text-white">
        <h2 className="text-2xl font-serif font-semibold mb-3">Interested in this artwork?</h2>
        <p className="mb-6 text-stone">Contact us for availability, pricing, or to schedule a viewing.</p>
        <Link
          href="/contact"
          className="bg-terracotta text-white px-8 py-3 rounded-lg hover:bg-terracotta/90 transition-colors inline-block"
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
