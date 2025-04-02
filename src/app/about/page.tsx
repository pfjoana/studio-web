// app/about/page.js (or .tsx if using TypeScript)
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const cloudinaryImageUrl = "https://res.cloudinary.com/dctobclli/image/upload/v1743591726/paintings/IMG_6483_small_zyp7dq.jpg";

  return (
    <div className='flex justify-center w-full py-12 px-4'>
    <div className="w-full max-w-6xl">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Text content */}
        <div className="md:w-1/2">
          <h1 className="heading text-center pb-4">Discover the Artist Journey</h1>
          <div className="text-charcoal leading-relaxed max-w-2xl text-base mt-4">
            <p className='mb-4'>
            JoPF - Joana Pais de Faria is a multidisciplinary artist with a unique journey shaped by her background in scientific research. Her PhD studies gave her an analytical and detail-oriented mindset, which now subtly assists her artistic practice.
            </p>

            <p className='mb-4'>
            During periods of intense academic work, she discovered a profound connection to her creativity through watercolors. The soothing process of working with water and pigment became a pivotal moment in her life, inspiring her to fully embrace her creative calling in recent years.
            </p>
            <p className='mb-4'>
            Through her art, Joana seeks to channel the tranquility and balance she experiences while creating, using textures, colors, and abstract forms to evoke similar feelings of calm and serenity in her audience.
            </p>
            <p>
              Joana's journey is not only a personal exploration, it also serves as a universal invitation to embrace the beauty of stillness and creativity in the midst of our often hectic lives.
              I hope you enjoy exploring my artistic journey!
            </p>
            <div className="mt-10 text-center">
              <Link href="/contacts" className="form-button px-4">
                Want to get in touch? Contact me here
              </Link>
            </div>
          </div>
        </div>

        {/* Image */}
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
  );
}
