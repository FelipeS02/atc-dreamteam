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
          alignmentL: JSON.stringify(['d1', 'b3', 'f3', 'd4', 'd6']),
          alignmentR: JSON.stringify(['d12', 'b10', 'f10', 'd9', 'd7']),
        },
        {
          name: '3 - 0 - 1 ',
          img: 'https://i.postimg.cc/sgj7s47X/Group-2.png',
          alignmentL: JSON.stringify(['d1', 'b4', 'f4', 'd3', 'd6']),
          alignmentR: JSON.stringify(['d12', 'b9', 'f9', 'd10', 'd7']),
        },
        {
          name: '2 - 0 - 2 ',
          img: 'https://i.postimg.cc/cJ6381DG/Group-3.png',
          alignmentL: JSON.stringify(['d1', 'b3', 'f3', 'b6', 'f6']),
          alignmentR: JSON.stringify(['d12', 'b10', 'f10', 'f7', 'b7']),
        },
        {
          name: '1 - 2 - 1 ',
          img: 'https://i.postimg.cc/yN5Zhq5g/Group-4.png',
          alignmentL: JSON.stringify(['d1', 'd4', 'f5', 'b5', 'd6']),
          alignmentR: JSON.stringify(['d12', 'b8', 'f8', 'd9', 'd7']),
        },
        {
          name: '1 - 1 - 2 ',
          img: 'https://i.postimg.cc/Qdf5tKJq/Group-5.png',
          alignmentL: JSON.stringify(['d1', 'd3', 'd5', 'b6', 'f6']),
          alignmentR: JSON.stringify(['d12', 'd10', 'd8', 'b7', 'f7']),
        },
        {
          name: '1 - 0 - 3 ',
          img: 'https://i.postimg.cc/gJZ6NSFM/Group-6.png',
          alignmentL: JSON.stringify(['d1', 'd3', 'd6', 'b5', 'f5']),
          alignmentR: JSON.stringify(['d12', 'd10', 'd7', 'b8', 'f8']),
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
