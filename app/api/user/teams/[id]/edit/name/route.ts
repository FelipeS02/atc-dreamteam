import { editTeamName } from '@/helpers/teams';
import { NextRequest } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const teamId = Number(params.id);
    const newName = req.nextUrl.searchParams.get('name') as string;

    if (!teamId || !newName)
      return new Response('Name and id must be specified', { status: 500 });

    const result = await editTeamName(teamId, newName);

    return Response.json({
      data: result,
      status: 200,
      message: `Team ${teamId} name modified`,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
