import { getAlignments } from '@/helpers/teams';

export async function GET() {
  try {
    const alignments = await getAlignments();

    return Response.json({
      data: alignments,
      status: 200,
      message: 'Alignments founded',
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
