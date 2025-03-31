'use client'

import { useState, useEffect, useCallback, useRef  } from 'react'
import Link from 'next/link'

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

  const [loaded, setLoaded] = useState(false)


  useEffect(() => {

    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://product-gallery.cloudinary.com/all.js'
    scriptTag.addEventListener('load', () => {setLoaded(true)})
    document.body.appendChild(scriptTag)

  }, [])

  useEffect(() => {

    if(!loaded) return

    const productGallery = window.cloudinary.galleryWidget({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      container: '#gallery-container',
      mediaAssets: painting.images.map((image: any) => ({
        publicId: image.publicId,
        mediaType: 'image',
        transformation: [
          {
            width: 800,
            height: 600,
            crop: 'fit',
            quality: 'auto:good',
            fetch_format: 'auto'
          },
          {
            width: 400,
            crop: 'fit',
            quality: 'auto:good',
            fetch_format: 'auto'
          },
          {
            width: 1200,
            crop: 'fit',
            quality: 'auto:good',
            fetch_format: 'auto'
          }
        ]
      })),
      aspectRatio: '4:3',
      bgColor: '#f5efe9',
      carouselLocation: 'left',
      carouselOffset: 10,
      navigation: 'always',
      // preload: ['image'],
      thumbnailProps: {
          spacing: 20,
          width: 90,
          height: 90,
          navigationFloat: true,
          navigationShape: 'square',
          navigationSize: 200,
          navigationColor: '#ffffff',
          selectedStyle: 'border',
          selectedBorderPosition: 'bottom',
          selectedBorderWidth: 4,
          navigationIconColor: '#ffffff'
      },
      navigationButtonProps: {
          shape: 'round',
          iconColor: '#ffffff',
          color: '#000',
          size: 40,
          navigationPosition: 'offset',
          navigationOffset: 12
      },
      themeProps: {
          primary: '#000000',
          active: '#ffffff'
        }
    })

    productGallery.render()
  }, [loaded])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        <div id="gallery-container" className="md:col-span-2" />

        <div className="">
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
            <h2 className="text-xl font-serif font-semibold mb-3">Interested in this artwork? </h2>
            <p className="mb-8 text-stone">Contact us for availability, pricing, or to schedule a viewing.</p>
            <h2 className="text-xl font-serif font-semibold mb-3">Prefer a piece tailored to your vision?</h2>
            <p className="mb-8 text-stone">Feel free to inquire about a commissioned piece.</p>


            <Link
              href="/contact"
              className="bg-terracotta text-white px-8 py-3 rounded-lg hover:bg-terracotta/90 transition-colors inline-block">
              Contact Gallery
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
