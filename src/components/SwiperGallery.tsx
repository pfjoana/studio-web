'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { FreeMode, Navigation, Thumbs, Pagination, Zoom } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import 'swiper/css/zoom'

type ImageType = {
  id: string
  url: string
  publicId: string
}

type SwiperGalleryProps = {
  images: ImageType[]
}

export default function SwiperGallery({ images }: SwiperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType  | null>(null);

  return (
    <div className="w-full">
      {/* Main slider */}
      <Swiper
        style={{
          '--swiper-navigation-color': '#333',
          '--swiper-pagination-color': '#333'
        } as React.CSSProperties}
        pagination={true}
        loop={true}
        spaceBetween={10}
        navigation={true}
        zoom={true}
        initialSlide={0}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Pagination, Zoom]}
        className="w-full mb-4 aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[500px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center swiper-zoom-container">
              <Image
                width={1200}
                height={900}
                src={image.url}
                alt={`Painting view ${index + 1}`}
                className="max-h-full max-w-full object-contain"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {images.length > 1 && (
      <div className="hidden md:block">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          initialSlide={0}
          spaceBetween={10}
          slidesPerView={2.5}
          freeMode={true}
          watchSlidesProgress={true}
          breakpoints={{
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            }
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper thumbs h-32 mt-3 w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer ">
              <div className="w-24 h-24 flex items-center justify-center bg-stone">
                <Image
                  width={1200}
                  height={900}
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      )}
    </div>
  )
}
