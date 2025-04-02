import { prisma } from '@/lib/client'
import { notFound } from 'next/navigation'
import PaintingPage from "@/src/components/PaintingPage"

export default async function PaintingPageWrapper({ params }: { params: { id: string } }) {

  const resolvedParams = await params;

  const painting = await prisma.painting.findUnique({
    where: {
      id: resolvedParams.id,
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


  return <PaintingPage painting={painting} />;

}

export async function generateStaticParams() {
  const paintings = await prisma.painting.findMany({
    select: { id: true },
  })

  return paintings.map((painting) => ({
    id: painting.id,
  }))
}
