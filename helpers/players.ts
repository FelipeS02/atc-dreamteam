import prisma from '@/lib/dbConnection';
import ApiPlayer from '@/models/apiFootball/player.model';
import { Player } from '@prisma/client';
export const replacePlayer = async (nP: ApiPlayer, playerId: Player['id']) => {
  const updatedPlayer = await prisma.player.update({
    where: { id: playerId },
    data: {
      age: nP.player_age,
      goals: nP.player_goals,
      img: nP.player_image,
      name: nP.player_name,
      rating: nP.player_rating,
      default: false,
    },
  });

  return updatedPlayer;
};
