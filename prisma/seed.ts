import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.image.deleteMany({})
  await prisma.painting.deleteMany({})
  await prisma.color.deleteMany({})
  await prisma.technique.deleteMany({})

  // Create colors
  const colors = await Promise.all([
    prisma.color.create({ data: { name: 'Red' } }),
    prisma.color.create({ data: { name: 'Blue' } }),
    prisma.color.create({ data: { name: 'Yellow' } }),
    prisma.color.create({ data: { name: 'Green' } }),
    prisma.color.create({ data: { name: 'Purple' } }),
    prisma.color.create({ data: { name: 'Black' } }),
    prisma.color.create({ data: { name: 'White' } }),
  ])

  // Create techniques
  const techniques = await Promise.all([
    prisma.technique.create({ data: { name: 'Acrylic' } }),
    prisma.technique.create({ data: { name: 'Watercolor' } }),
    prisma.technique.create({ data: { name: 'Mixed Media' } }),
  ])

  // Create paintings with their relationships
  const painting1 = await prisma.painting.create({
    data: {
      title: 'Sunset Over Mountains',
      description: 'A vibrant depiction of a sunset over a mountain range, with rich colors and bold strokes.',
      size: '24x36 inches',
      year: 2023,
      colors: {
        connect: [
          { id: colors[0].id }, // Red
          { id: colors[2].id }, // Yellow
          { id: colors[3].id }, // Green
        ]
      },
      techniques: {
        connect: [
          { id: techniques[0].id },
        ]
      },
    },
  })

  const painting2 = await prisma.painting.create({
    data: {
      title: 'Ocean Dreams',
      description: 'An abstract representation of ocean waves, capturing the movement and energy of the sea.',
      size: '30x40 inches',
      year: 2022,
      colors: {
        connect: [
          { id: colors[1].id }, // Blue
          { id: colors[6].id }, // White
          { id: colors[4].id }, // Purple
        ]
      },
      techniques: {
        connect: [
          { id: techniques[1].id },
          { id: techniques[2].id },
        ]
      },
    },
  })

  const painting3 = await prisma.painting.create({
    data: {
      title: 'Urban Jungle',
      description: 'A cityscape blending natural elements with urban architecture, exploring the coexistence of nature and city life.',
      size: '18x24 inches',
      year: 2024,
      colors: {
        connect: [
          { id: colors[3].id }, // Green
          { id: colors[5].id }, // Black
          { id: colors[0].id }, // Red
        ]
      },
      techniques: {
        connect: [
          { id: techniques[2].id },
        ]
      },
    },
  })

  // Create images for paintings
  await prisma.image.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1520420097861-e4959843b682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhaW50aW5nfGVufDB8fDB8fHww',
        paintingId: painting1.id
      },
      {
        url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
        paintingId: painting1.id
      },
      {
        url: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhaW50aW5nfGVufDB8fDB8fHww',
        paintingId: painting2.id
      },
      {
        url: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhaW50aW5nfGVufDB8fDB8fHww',
        paintingId: painting3.id
      },
      {
        url: 'https://images.unsplash.com/photo-1520420097861-e4959843b682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhaW50aW5nfGVufDB8fDB8fHww',
        paintingId: painting3.id
      },
      {
        url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
        paintingId: painting3.id
      },
    ]
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
