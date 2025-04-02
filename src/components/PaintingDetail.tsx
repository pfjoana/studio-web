'use client'

import Link from 'next/link'
import SwiperGallery from './SwiperGallery'

type Image = {
  id: string;
  publicId: string;
}

type Color = {
  id: string;
  name: string;
}

type Technique = {
  id: string;
  name: string;
}

type Painting = {
  id: string;
  title: string;
  size: string;
  year: number;
  images: Image[];
  colors: Color[];
  techniques: Technique[];
}

export default function PaintingDetail({ painting }: { painting: Painting }) {

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 mx-auto md:grid-cols-12 gap-x-20 my-10">
        {/* <div id="gallery-container" className="md:col-span-2" /> */}


        <div className="md:col-span-6">
          <SwiperGallery images={painting.images} />
        </div>


        <div className="md:col-span-5">
          <h1 className='font-marcellus text-4xl mb-10 text-center'>Painting information</h1>
          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">Title:</h3>
            <p className="text-charcoal">{painting.title}</p>
          </div>

          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">Size:</h3>
            <p className="text-charcoal">{painting.size}</p>
          </div>

          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">Year:</h3>
            <p className="text-charcoal">{painting.year}</p>
          </div>

          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">Colors:</h3>
              <div className="flex flex-wrap">
                {painting.colors.map((color: any) => (
                  <span key={color.id} className="text-sm text-charcoal bg-white px-2 mx-1 py-1 rounded">
                    {color.name}
                  </span>
                ))}
              </div>
          </div>

          <div className="flex gap-2">
            <h3 className="painting-details">Techniques:</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {painting.techniques.map((technique: any) => (
                  <span key={technique.id} className="text-sm text-charcoal bg-white px-2 mx-1 rounded">
                    {technique.name}
                  </span>
                ))}
              </div>
          </div>

          <div className="mt-10 bg-navy p-6 rounded-lg text-white">
            <h2 className="text-xl font-serif font-semibold mb-3 italic">Interested in this artwork? </h2>
            <p className="mb-6 text-stone">Contact us for availability, pricing, or to schedule a viewing.</p>
            <h2 className="text-xl font-serif font-semibold mb-3 italic">Prefer a piece tailored to your vision?</h2>
            <p className="mb-8 text-stone">Feel free to inquire about a commissioned piece.</p>

            <Link
              href="/contacts"
              className="bg-terracotta text-white px-8 py-3 rounded-lg hover:bg-terracotta/90 transition-colors inline-block">
              Contact Gallery
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
