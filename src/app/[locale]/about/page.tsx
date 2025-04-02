import Image from 'next/image'
import Link from 'next/link'
import {useTranslations} from 'next-intl'


export default function AboutPage() {
  const cloudinaryImageUrl = "https://res.cloudinary.com/dctobclli/image/upload/v1743591726/paintings/IMG_6483_small_zyp7dq.jpg";

  const tAbout = useTranslations("about");

  return (
    <div className='flex justify-center w-full py-12 px-4'>
    <div className="w-full max-w-6xl">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="md:w-1/2">
          <h1 className="heading text-center pb-4">Discover the Artist Journey</h1>
          <div className="text-charcoal leading-relaxed max-w-2xl text-base mt-4">
            <p className='mb-4'>{tAbout("text1")}</p>

            <p className='mb-4'>{tAbout("text2")}</p>
            <p className='mb-4'>{tAbout("text3")}</p>
            <p>{tAbout("text4")}</p>
            <div className="mt-10 text-center">
              <Link href="/contacts" className="form-button px-4">
              {tAbout("contact")}</Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 pt-0 md:pt-10">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <Image
              src={cloudinaryImageUrl}
              alt="Portrait of the artist"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
