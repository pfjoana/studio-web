import { prisma } from '@/lib/client'
import { notFound } from 'next/navigation'
import PaintingDetail from '@/src/components/PaintingDetail'

interface PaintingPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PaintingPage(props: PaintingPageProps) {
  const params = await props.params;

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

  if (!painting) {
    notFound()
  }

  return <PaintingDetail painting={painting} />
}

export async function generateStaticParams() {
  const paintings = await prisma.painting.findMany({
    select: { id: true },
  })

  return paintings.map((painting) => ({
    id: painting.id,
  }))
}
