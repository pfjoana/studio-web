import { prisma } from '@/lib/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SwiperGallery from '@/src/components/SwiperGallery'
import {getTranslations} from 'next-intl/server';

export type paramsType = Promise<{id: string}>

type Props = {
  params: paramsType
}

export default async function PaintingDetails({ params }: Props) {

  const {id} = await params;

  const painting = await prisma.painting.findUnique({
    where: {
      id: id,
    },
    include: {
      images: true,
      colors: true,
      techniques: true,
    },
  })

  if (!painting) {
    notFound()
  }

  const tPaintings = await getTranslations("painting");
  const tinquiries = await getTranslations("inquiries");
  const tAvailable = await getTranslations("available");

  return (
    <div className="container mx-auto max-w-7xl px-4">
        {/* Heading on mobile only */}
        <h1 className="font-marcellus text-3xl mb-6 text-center md:hidden">
          {tPaintings("heading")}
        </h1>
      <div className="grid grid-cols-1 mx-auto md:grid-cols-12 gap-x-20 my-10">
        <div className="md:col-span-6 ">
          <SwiperGallery images={painting.images} />
        </div>

        <div className="md:col-span-5">
          <h1 className='font-marcellus text-4xl mb-6 text-center hidden md:flex'>
            {tPaintings("heading")}
          </h1>
          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">{tPaintings("title")}</h3>
            <p className="text-charcoal">{painting.title}</p>
          </div>

          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">{tPaintings("size")}</h3>
            <p className="text-charcoal">{painting.size}</p>
          </div>

          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">{tPaintings("year")}</h3>
            <p className="text-charcoal">{painting.year}</p>
          </div>

          <div className="mb-4 flex gap-2">
            <h3 className="painting-details">{tPaintings("techniques")}</h3>
              {painting.techniques.map((technique: any) => (
                <p key={technique.id} className="text-charcoal mr-1">
                  {tPaintings(technique.name)}
                </p>
              ))}
          </div>

          <div className="mb-4 flex gap-2 ">
            <p className={`${painting.available ? 'text-terracotta border-b border-terracotta font-medium' : 'text-charcoal'}`}>
              {painting.available ? tAvailable("available") : tAvailable("sold")}
            </p>
          </div>

          <div className="mt-10 bg-navy p-8 rounded-lg text-white max-w-m">
            <h2 className="text-xl font-serif font-semibold mb-3 italic">{tinquiries("first")}</h2>
            <p className="mb-6 text-stone">{tinquiries("firstText")}</p>
            <h2 className="text-xl font-serif font-semibold mb-3 italic">{tinquiries("second")}</h2>
            <p className="mb-8 text-stone">{tinquiries("secondText")}</p>

            <Link
              href="/contacts"
              className=" bg-terracotta text-white px-8 py-3 rounded-lg hover:bg-terracotta/90 transition-colors inline-block">
              {tPaintings("contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const paintings = await prisma.painting.findMany({
    select: { id: true },
  });

  const locales = ['en', 'pt'];

  return locales.flatMap((locale) =>
    paintings.map((painting) => ({
      locale,
      id: painting.id,
    }))
  );
}
