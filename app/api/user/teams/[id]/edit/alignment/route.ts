import { editTeamAlignment } from '@/helpers/teams';
import { NextRequest } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const teamId = Number(params.id);
    const alignmentId = Number(
      req.nextUrl.searchParams.get('alignmentId') as string
    );

    if (!teamId || !alignmentId)
      return new Response('teamId and alignmentId must be specified', {
        status: 500,
      });

    const result = await editTeamAlignment(teamId, alignmentId);

    return Response.json({
      data: result,
      status: 200,
      message: `Team ${teamId} alignment modified`,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
