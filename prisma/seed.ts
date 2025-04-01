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
    prisma.color.create({ data: { name: 'Neutral' } }),
    prisma.color.create({ data: { name: 'Terracotta' } }),
  ])

  const techniques = await Promise.all([
    prisma.technique.create({ data: { name: 'Acrylic on canvas' } }),
    prisma.technique.create({ data: { name: 'Mixed Media on woodboard' } }),
    prisma.technique.create({ data: { name: 'Mixed Media on canvas' } }),
    prisma.technique.create({ data: { name: 'Watercolor' } }),

  ])

  const painting1 = await prisma.painting.create({
    data: {
      title: 'Emotions',
      description: '',
      size: '60 x 80 cm',
      year: 2023,
      colors: {
        connect: [
          { id: colors[4].id },
          { id: colors[3].id },
          { id: colors[2].id },
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
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514123/paintings/Emotions1.jpg',
            publicId: 'paintings/Emotions1'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514122/paintings/Emotions2.jpg',
            publicId: 'paintings/Emotions2'
          }
        ]
      }
    }
  })

  const painting2 = await prisma.painting.create({
    data: {
      title: 'Divergências',
      description: '',
      size: '30 x 40 cm',
      year: 2022,
      colors: {
        connect: [
          { id: colors[1].id },
          { id: colors[6].id }
        ]
      },
      techniques: {
        connect: [
          { id: techniques[0].id }
        ]
      },
      images: {
        create: [
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514123/paintings/divergencias.jpg',
            publicId: 'paintings/divergencias'
          },
        ]
      }
    }
  })

  const painting3 = await prisma.painting.create({
    data: {
      title: 'Red Planet',
      description: '',
      size: '100 cm diameter',
      year: 2024,
      colors: {
        connect: [
          { id: colors[7].id },
          { id: colors[8].id },
          { id: colors[0].id },
        ]
      },
      techniques: {
        connect: [
          { id: techniques[1].id },
        ]
      },
      images: {
        create: [
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514124/paintings/redplanet.jpg',
            publicId: 'paintings/redplanet'
          }
        ]
      }
    }
  })

  const painting4 = await prisma.painting.create({
    data: {
      title: 'Além do Espelho',
      description: '',
      size: '62 x 84 cm',
      year: 2024,
      colors: {
        connect: [
          { id: colors[1].id },
          { id: colors[6].id },
        ]
      },
      techniques: {
        connect: [
          { id: techniques[1].id },
        ]
      },
      images: {
        create: [
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514124/paintings/AlemEspelho1.jpg',
            publicId: 'paintings/AlemEspelho1'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514124/paintings/AlemEspelho2.jpg',
            publicId: 'paintings/AlemEspelho2'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514124/paintings/AlemEspelho3.jpg',
            publicId: 'paintings/AlemEspelho3'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514124/paintings/AlemEspelho4.jpg',
            publicId: 'paintings/AlemEspelho4'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514124/paintings/AlemEspelho5.jpg',
            publicId: 'paintings/AlemEspelho5'
          },
          {
            url: 'https://res.cloudinary.com/dctobclli/image/upload/v1743514124/paintings/AlemEspelho6.jpg',
            publicId: 'paintings/AlemEspelho6'
          },



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
