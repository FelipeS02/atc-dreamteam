'use client';
import { useCallback, useEffect, useState } from 'react';
import TeamName from '@/components/Edit/TeamName';
import { teamIsValid } from '@/helpers/teams';
import api from '@/lib/api';
import { TeamInfo } from '@/models/pages/editTeam.model';
import Arena from '@/components/Arena/Arena';
import TeamAlignments from '@/components/Edit/TeamAlignments';
import TeamPlayers from '@/components/Edit/TeamPlayers';
import ArenaPlayer from '@/components/Arena/ArenaPlayer';
import ApiPlayer from '@/models/apiFootball/player.model';
import { Player } from '@prisma/client';
import AddPlayerModal from '@/components/Edit/AddPlayerModal/AddPlayerModal';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const initialTeamState: TeamInfo = {
  loading: true,
  team: { alignment: null, alignmentId: null, id: 0, name: '', players: [] },
};

const initialPlayerState: Player = {
  age: '',
  goals: '',
  id: 0,
  img: '',
  name: '',
  position: '',
  rating: '',
  teamId: 0,
};

const Edit = ({ params }: { params: { id: string } }) => {
  const teamId = Number(params?.id) || 0;
  const [{ loading, team }, setInfo] = useState<TeamInfo>(initialTeamState);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [playerToReplace, setPlayerToReplace] =
    useState<Player>(initialPlayerState);

  const getTeam = useCallback(async () => {
    try {
      if (!teamId) return;
      const { data: foundedTeam } = await api.get(`/api/user/teams/${teamId}`);

      if (!foundedTeam) return;

      setInfo((prev) => ({ ...prev, team: foundedTeam }));
    } catch (error) {
      console.log(error);
    } finally {
      setInfo((prev) => ({ ...prev, loading: false }));
    }
  }, [teamId]);

  const replacePlayer = (player: Player) => {
    setPlayerToReplace(player);
    setOpen(true);
  };

  const saveSelectedPlayer = async (newPlayer: ApiPlayer) => {
    try {
      setSubmitting(true);
      const { data: updatedPlayer } = await api.post(
        `/api/user/teams/${teamId}/edit/player?id=${playerToReplace.id}`,
        newPlayer,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setOpen(false);

      setInfo((prev) => {
        const newState = { ...prev };

        const playerIndex = newState.team.players.findIndex(
          (p) => p.id === updatedPlayer.id
        );

        if (!playerIndex) return newState;

        newState.team.players[playerIndex] = { ...updatedPlayer };

        return newState;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return (
    <>
      <AddPlayerModal
        open={open}
        onOpenChange={setOpen}
        playerToReplace={playerToReplace}
        onSubmit={saveSelectedPlayer}
        submitting={submitting}
      />
      <main className='flex flex-col gap-4 lg:grid lg:grid-cols-10 lg:gap-6 flex-grow'>
        <div className='flex flex-col col-span-1 lg:col-span-4 gap-1 max-h-full '>
          <Button
            asChild
            size={'sm'}
            variant={'link'}
            className='w-fit text-white -ml-4'
          >
            <Link href={'/'}>
              <ChevronLeft size={18} /> Volver al inicio
            </Link>
          </Button>
          <div className='w-full flex flex-col gap-4'>
            <TeamName
              name={team.name}
              valid={teamIsValid(team)}
              loading={loading}
              teamId={teamId}
              setInfo={setInfo}
            />
            <TeamAlignments
              selectedAlignmentId={team.alignmentId}
              setInfo={setInfo}
              teamId={teamId}
            />
            <TeamPlayers
              players={team.players}
              alignment={team.alignment}
              loading={loading}
              replacePlayer={replacePlayer}
              className='hidden flex-col lg:flex '
            />
          </div>
        </div>

        <div className='p-4 bg-background h-[700px] rounded-md flex-grow lg:h-full lg:max-h-full lg:col-span-5 lg:col-start-6'>
          <Arena orientation='vertical'>
            {team.players.map((p) => (
              <button
                onClick={() => replacePlayer(p)}
                key={p.id}
                className='flex items-center justify-center'
                style={{ gridArea: p.position }}
              >
                <ArenaPlayer {...p} />
              </button>
            ))}
          </Arena>
        </div>
      </main>
    </>
  );
};

export default Edit;
