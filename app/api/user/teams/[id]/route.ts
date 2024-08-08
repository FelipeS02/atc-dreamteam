import { getTeamById } from '@/helpers/teams';
import { NextApiRequest } from 'next';

export async function GET(
  _req: NextApiRequest,
  { params }: { params: { id: number } }
) {
  try {
    const team = await getTeamById(Number(params?.id));

    if (!team) return new Response('Team not founded', { status: 404 });

    return Response.json({ data: team, status: 200, message: 'Team founded' });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}