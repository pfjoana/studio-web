import { prisma } from '@/lib/client'
import { notFound } from 'next/navigation'
import PaintingDetail from '@/src/components/PaintingDetail'

interface PaintingPageProps {
  params: {
    id: string
  }
}

export default async function PaintingPage({ params }: PaintingPageProps) {

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
  }
  return <PaintingDetail painting={painting} />
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
