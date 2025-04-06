import Image from 'next/image'
import Link from 'next/link'
import {useTranslations} from 'next-intl'


export default function AboutPage() {
  const cloudinaryImageUrl = "https://res.cloudinary.com/dctobclli/image/upload/v1743591726/paintings/IMG_6483_small_zyp7dq.jpg";

  const tAbout = useTranslations("about");

  return (
    <div className='flex justify-center w-full py-12 px-4'>
      <div className="w-full max-w-6xl">
        <h1 className="heading text-center">{tAbout("heading")}</h1>
        <div className="flex flex-col md:flex-row items-center ">

          <div className="w-full md:w-1/2">
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

          <div className="w-full md:w-1/2 mt-4">
            <div className="text-charcoal leading-relaxed max-w-2xl text-base mt-4">
              <p className='mb-4'>{tAbout("text1")}</p>

              <p className='mb-4'>{tAbout("text2")}</p>
              <p className='mb-4'>{tAbout("text3")}</p>
              <p>{tAbout("text4")}</p>
              <div className="mt-10 text-center">
                <Link href="/contacts" className="form-button">
                {tAbout("contact")}</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
