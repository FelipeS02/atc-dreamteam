import api from '@/lib/api';
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

export const filterSelectedPlayers = async (list: ApiPlayer[]) => {
  if (list.length === 0) return list;

  const { data } = await api.get('/api/user/teams/players');

  if (data.length === 0) return list;

  const playerList = data as Player[];

  const playerNames = new Set(playerList.map((p) => p.name));

  const filteredList = list.filter((p) => !playerNames.has(p.player_name));

  return filteredList;
};
