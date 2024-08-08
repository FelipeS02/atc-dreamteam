import { NextRequest } from 'next/server';
import APIPlayer from '@/models/apiFootball/player.model';
import { replacePlayer } from '@/helpers/players';

export async function POST(req: NextRequest) {
  try {
    const playerId = Number(req.nextUrl.searchParams.get('id') as string);
    const newPlayer = (await req.json()) as APIPlayer;

    const updatedPlayer = await replacePlayer(newPlayer, playerId);

    return Response.json({
      data: updatedPlayer,
      status: 200,
      message: `Player ${playerId} updated`,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
