import prisma from '@/lib/dbConnection';
import { Team } from '@/models/team.model';

export const teamIsValid = (team: Team): boolean => {
  if (!team) return false;

  if (team.players.length === 0) return false;

  return true;
};

type TeamsDictionary = Record<Team['id'], Team>;

export const getTeams = async (): Promise<TeamsDictionary | undefined> => {
  try {
    const teams = await prisma.team.findMany({
      include: { players: true, alignment: true },
    });

    if (!teams) return teams;

    const teamsDictionary = teams.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as TeamsDictionary);

    return teamsDictionary;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getTeamById = async (id: Team['id']) => {
  try {
    const team = await prisma.team.findFirst({
      include: { players: true, alignment: true },
      where: { id },
    });

    return team;
  } catch (error) {
    throw error;
  }
};

export const editTeamName = async (id: Team['id'], name: Team['name']) => {
  try {
    if (!id || !name) throw new Error('Team id or name not exists');

    await prisma.team.update({
      where: { id },
      data: { name },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
