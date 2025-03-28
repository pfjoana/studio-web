import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.image.deleteMany({})
  await prisma.painting.deleteMany({})
  await prisma.color.deleteMany({})
  await prisma.technique.deleteMany({})

  const colors = await Promise.all([
    prisma.color.create({ data: { name: 'Red' } }),
    prisma.color.create({ data: { name: 'Blue' } }),
    prisma.color.create({ data: { name: 'Yellow' } }),
    prisma.color.create({ data: { name: 'Green' } }),
    prisma.color.create({ data: { name: 'Purple' } }),
    prisma.color.create({ data: { name: 'Black' } }),
    prisma.color.create({ data: { name: 'White' } }),
  ])

  const techniques = await Promise.all([
    prisma.technique.create({ data: { name: 'Acrylic' } }),
    prisma.technique.create({ data: { name: 'Watercolor' } }),
    prisma.technique.create({ data: { name: 'Mixed Media' } }),
  ])

  const painting1 = await prisma.painting.create({
    data: {
      title: 'Sunset Over Mountains',
      description: 'A vibrant depiction of a sunset over a mountain range, with rich colors and bold strokes.',
      size: '24x36 inches',
      year: 2023,
      colors: {
        connect: [
          { id: colors[0].id },
          { id: colors[2].id },
          { id: colors[3].id },
        ]
      },
      techniques: {
        connect: [
          { id: techniques[0].id },
        ]
      },
      images: {
        create: [
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1700330619/samples/landscapes/nature-mountains.jpg',
            publicId: 'samples/landscapes/nature-mountains'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1700330615/samples/landscapes/beach-boat.jpg',
            publicId: 'samples/landscapes/beach-boat'
          }
        ]
      }
    }
  })

  const painting2 = await prisma.painting.create({
    data: {
      title: 'Ocean Dreams',
      description: 'An abstract representation of ocean waves, capturing the movement and energy of the sea.',
      size: '30x40 inches',
      year: 2022,
      colors: {
        connect: [
          { id: colors[1].id },
          { id: colors[6].id },
          { id: colors[4].id },
        ]
      },
      techniques: {
        connect: [
          { id: techniques[1].id },
          { id: techniques[2].id },
        ]
      },
      images: {
        create: [
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1700330619/samples/landscapes/nature-mountains.jpg',
            publicId: 'samples/landscapes/nature-mountains'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1700330615/samples/landscapes/beach-boat.jpg',
            publicId: 'samples/landscapes/beach-boat'
          }
        ]
      }
    }
  })

  const painting3 = await prisma.painting.create({
    data: {
      title: 'Urban Jungle',
      description: 'A cityscape blending natural elements with urban architecture, exploring the coexistence of nature and city life.',
      size: '18x24 inches',
      year: 2024,
      colors: {
        connect: [
          { id: colors[3].id },
          { id: colors[5].id },
          { id: colors[0].id },
        ]
      },
      techniques: {
        connect: [
          { id: techniques[2].id },
        ]
      },
      images: {
        create: [
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1700330619/samples/landscapes/nature-mountains.jpg',
            publicId: 'samples/landscapes/nature-mountains'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1700330615/samples/landscapes/beach-boat.jpg',
            publicId: 'samples/landscapes/beach-boat'
          }
        ]
      }
    }
  })


  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
