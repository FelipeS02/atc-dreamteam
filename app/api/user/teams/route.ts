import { getTeams } from '@/helpers/teams';

export const GET = async () => {
  try {
    const teams = await getTeams();

    return Response.json({
      data: teams,
      message: 'Leagues founded',
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
