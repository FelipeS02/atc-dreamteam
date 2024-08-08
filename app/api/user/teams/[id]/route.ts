import { getTeamById, deleteTeam } from '@/helpers/teams';
import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    console.log(params);
    const team = await deleteTeam(Number(params?.id));

    if (!team) return new Response('Team not founded', { status: 404 });

    return Response.json({ data: team, status: 200, message: 'Team deleted' });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
