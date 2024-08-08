import prisma from '@/lib/dbConnection';
import { Team } from '@/models/team.model';

export const teamIsValid = (team: Team): boolean => {
  if (!team) return false;

  const { players } = team;

  const teamHaveDefaultPlayers = players.some((p) => p.default);

  if (teamHaveDefaultPlayers || players.length === 0) return false;

  return true;
};

export type TeamsDictionary = Record<Team['id'], Team>;

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
  const team = await prisma.team.findFirst({
    include: { players: true, alignment: true },
    where: { id },
  });

  return team;
};

export const editTeamName = async (id: Team['id'], name: Team['name']) => {
  if (!id || !name) throw new Error('Team id or name not exists');

  await prisma.team.update({
    where: { id },
    data: { name },
  });

  return true;
};

export const getAlignments = async () => {
  const alignments = await prisma.alignment.findMany();

  return alignments;
};

export const editTeamAlignment = async (
  teamId: Team['id'],
  alignmentId: Team['alignmentId']
) => {
  try {
    if (!alignmentId || !teamId) return;

    await prisma.team.update({ where: { id: teamId }, data: { alignmentId } });

    // Get alignment info
    const alignment = await prisma.alignment.findFirst({
      where: { id: alignmentId },
    });

    if (!alignment?.alignmentL || !alignment?.alignmentR) return;

    // If team 1 or 2 i pick the relative positions in the board
    const alignmentBoardPositions =
      teamId === 1
        ? JSON.parse(alignment?.alignmentL)
        : JSON.parse(alignment?.alignmentR);

    // Search team players
    const players = await prisma.player.findMany({ where: { teamId } });

    if (players?.length > 0) {
      // If the team is already created
      for (let i = 0; i < players.length; i++) {
        const playerId = players[i].id;
        const position = alignmentBoardPositions[i];

        await prisma.player.update({
          where: { id: playerId },
          data: { position },
        });
      }
    } else {
      // If team is not created fill player list with default info and positions
      for (let i = 0; i < alignmentBoardPositions.length; i++) {
        const position = alignmentBoardPositions[i];

        await prisma.player.create({
          data: {
            age: '',
            goals: '',
            img: 'https://i.postimg.cc/vHt1YQ2L/default-avatar.webp',
            name: `Jugador ${i}`,
            position,
            rating: '',
            teamId,
            default: true,
          },
        });
      }
    }

    const updatedTeam = await prisma.team.findFirst({
      where: { id: teamId },
      include: { players: true, alignment: true },
    });

    return updatedTeam;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTeam = async (teamId: number) => {
  // Delete all players relations
  await prisma.player.deleteMany({ where: { teamId } });

  // Reset team to default
  const updatedTeam = await prisma.team.update({
    data: { alignmentId: null, name: `Equipo ${teamId}` },
    where: { id: teamId },
    include: { alignment: true, players: true },
  });

  return updatedTeam;
};
