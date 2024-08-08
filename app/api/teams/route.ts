import { API_FOOTBALL_URL, GET_TEAMS } from '@/helpers/apiFootball';
import axios from 'axios';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const leagueId = Number(req.nextUrl.searchParams.get('leagueId') as string);

    const { data } = await axios.get(
      `${API_FOOTBALL_URL}${GET_TEAMS(leagueId)}`
    );

    const error = data?.error;

    if (error)
      return Response.json({
        data: null,
        message: data.message,
        status: error,
      });

    return Response.json({
      data,
      message: 'Leagues founded',
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
