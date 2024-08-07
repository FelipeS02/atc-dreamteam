import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Alignments creation

  const dbHasAlignments = await prisma.alignment.count();
  const dbHasTeams = await prisma.team.count();

  if (!dbHasAlignments) {
    await prisma.alignment.createMany({
      data: [
        {
          name: '2 - 1 - 1 ',
          img: 'https://i.postimg.cc/BQcHrV8k/Group-1.png',
        },
        {
          name: '3 - 0 - 1 ',
          img: 'https://i.postimg.cc/sgj7s47X/Group-2.png',
        },
        {
          name: '2 - 0 - 2 ',
          img: 'https://i.postimg.cc/cJ6381DG/Group-3.png',
        },
        {
          name: '1 - 2 - 1 ',
          img: 'https://i.postimg.cc/yN5Zhq5g/Group-4.png',
        },
        {
          name: '1 - 1 - 2 ',
          img: 'https://i.postimg.cc/Qdf5tKJq/Group-5.png',
        },
        {
          name: '1 - 0 - 3 ',
          img: 'https://i.postimg.cc/gJZ6NSFM/Group-6.png',
        },
      ],
    });
  }

  if (!dbHasTeams) {
    // Base teams creation
    await prisma.team.createMany({
      data: [{ name: 'Equipo 1' }, { name: 'Equipo 2' }],
    });
  }
}

main()
  .then(() => console.log(' \x1b[32m🤖 DB Seed completed\x1b[0m'))
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
