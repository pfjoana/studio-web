import { prisma } from '@/lib/client'
import PaintingsGallery from "@/src/components/PaintingsGallery"


export default async function PaintingsPage() {

  const paintings = await prisma.painting.findMany({
    include: {
      images: {
        take: 1,
      },
      colors: true,
      techniques: true,
    },
    orderBy: {
    year: 'desc',
    },
  })

  if (!paintings || paintings.length === 0) {
    return <div>No paintings found</div>
  }

  return <PaintingsGallery paintings={paintings} />;
}
