import { FC, PropsWithChildren } from 'react';
import PlayerInfo, { PlayerInfoProps } from './PlayerInfo';
import { Skeleton } from '../ui/skeleton';

interface CardProps extends PropsWithChildren {
  player: Omit<PlayerInfoProps, 'className'>;
}

export const PlayerCardSkeleton = () => {
  return (
    <div className='flex items-center w-full border-b-neutral-200 border-b last-of-type:border-b-0 py-2 gap-2'>
      <Skeleton className='size-12 rounded-full' />
      <div className='flex flex-col w-full gap-1'>
        <Skeleton className='w-[50%] h-6' />
        <Skeleton className='w-[20%] h-4' />
      </div>
    </div>
  );
};

const PlayerCard: FC<CardProps> = ({ children, player }) => {
  return (
    <div className='flex w-full border-b-neutral-200 border-b last-of-type:border-b-0 items-center justify-between'>
      <PlayerInfo {...player} />
      {children}
    </div>
  );
};

export default PlayerCard;
