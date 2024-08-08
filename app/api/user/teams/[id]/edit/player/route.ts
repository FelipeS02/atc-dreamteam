import { replacePlayer } from '@/helpers/players';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { playerId, newPlayer } = await req.json();

    const updatedPlayer = await replacePlayer(newPlayer, playerId);

    return Response.json({
      data: updatedPlayer,
      status: 200,
      message: `Player ${playerId} updated`,
    });
  } catch (error) {
    console.log(error, req.nextUrl.searchParams.get('id'));
    return new Response('Internal Server Error', { status: 500 });
  }
}
