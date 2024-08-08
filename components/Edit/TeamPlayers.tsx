import { FC } from 'react';
import PlayerCard, { PlayerCardSkeleton } from '../PlayerCard/PlayerCard';
import { AlertCircle, ArrowRightLeft } from 'lucide-react';
import { Player } from '@prisma/client';
import { Team } from '@/models/team.model';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SectionProps {
  players: Team['players'];
  alignment?: Team['alignment'];
  loading: boolean;
  replacePlayer: (player: Player) => void;
  className?: string;
}

interface ListProps extends Omit<SectionProps, 'teamId' | 'setInfo'> {}

const RenderList: FC<ListProps> = ({
  loading,
  players,
  alignment,
  replacePlayer,
}) => {
  if (loading)
    return (
      <>
        <PlayerCardSkeleton />
        <PlayerCardSkeleton />
        <PlayerCardSkeleton />
        <PlayerCardSkeleton />
        <PlayerCardSkeleton />
      </>
    );

  if (!alignment)
    return (
      <div className='flex flex-col items-center text-neutral-600'>
        <AlertCircle size={120} strokeWidth={1} className='animate-pulse' />
        <p className='text-center'>
          Para seleccionar a tus jugadores primero debes seleccionar una
          alineación
        </p>
      </div>
    );

  return (
    <>
      {players.map((p) => (
        <PlayerCard player={p} key={p.id}>
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => replacePlayer(p)}
          >
            <ArrowRightLeft size={16} />
          </Button>
        </PlayerCard>
      ))}
    </>
  );
};

const TeamPlayers: FC<SectionProps> = ({
  loading,
  players,
  alignment,
  replacePlayer,
  className
}) => {
  return (
    <div className={cn('bg-background rounded-md', className)}>
      <div className='border-b border-b-neutral-300 p-4'>
        <h2 className='text-2xl font-koho font-semibold'>Jugadores</h2>
      </div>
      <div
        className='flex-col flex gap-2 py-2 px-4 max-h-[250px] overflow-y-auto mb-3 animate-fade-in'
        key={players.length}
      >
        <RenderList
          loading={loading}
          players={players}
          alignment={alignment}
          replacePlayer={replacePlayer}
        />
      </div>
    </div>
  );
};

export default TeamPlayers;
