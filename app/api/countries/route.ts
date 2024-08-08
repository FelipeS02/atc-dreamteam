import { API_FOOTBALL_URL, GET_COUNTRIES } from '@/helpers/apiFootball';
import api from '@/lib/api';

export const GET = async () => {
  try {
    const countries = await api.get(`${API_FOOTBALL_URL}${GET_COUNTRIES}`);
    
    return Response.json({ data: countries, status: 200, message: null });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
