import prisma from '@/lib/dbConnection';

export const GET = async () => {
  try {
    const players = await prisma.player.findMany();

    return Response.json({
      data: players || [],
      message: 'All players',
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
