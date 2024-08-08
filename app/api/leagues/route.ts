import { API_FOOTBALL_URL, GET_LEAGUES } from '@/helpers/apiFootball';

import axios from 'axios';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const countryId = Number(
      req.nextUrl.searchParams.get('countryId') as string
    );

    const { data } = await axios.get(
      `${API_FOOTBALL_URL}${GET_LEAGUES(countryId)}`
    );

    const error = data?.error;

    if (error)
      return Response.json(
        {
          data: null,
          message: data.message,
          status: error,
        }
      );

    return Response.json({
      data: data,
      message: 'Leagues founded',
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
