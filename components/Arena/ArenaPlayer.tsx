import { Player } from '@/models/team.model';
import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface PlayerProps
  extends Pick<Player, 'img' | 'name' | 'rating' | 'position'> {
  className?: string;
  minimal?: boolean;
}

const ArenaPlayer: FC<PlayerProps> = ({
  name,
  position,
  rating,
  img,
  className,
  minimal,
}) => {
  return (
    <div
      className='w-fit max-w-[80px] m-auto justify-self-center flex flex-col items-center animate-fade-in relative'
      style={{ gridArea: position }}
    >
      {rating && !minimal ? (
        <Badge className='absolute top-0 right-0 -mr-4 z-10'>{rating}</Badge>
      ) : null}
      <Avatar className={cn('size-12 mt-2', className)}>
        <AvatarImage src={img} />
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      {!minimal ? (
        <p className='text-white whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
          {name}
        </p>
      ) : null}
    </div>
  );
};

export default ArenaPlayer;
