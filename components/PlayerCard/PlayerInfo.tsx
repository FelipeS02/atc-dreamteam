import { Player } from '@/models/team.model';
import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { soccerBall } from '@lucide/lab';
import { Icon } from 'lucide-react';
import { Badge } from '../ui/badge';

export interface PlayerInfoProps
  extends Pick<Player, 'age' | 'name' | 'rating' | 'goals' | 'img'> {
  className?: string;
}

const PlayerInfo: FC<PlayerInfoProps> = ({
  age,
  goals,
  name,
  rating,
  img,
  className,
}) => {
  const isDefaultPlayer = !age && !goals && !rating;

  return (
    <div className='flex items-center gap-2 py-2'>
      <Avatar
        className={cn('border-neutral-300 border shadow-sm size-12', className)}
      >
        <AvatarImage src={img} />
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <div className='inline-flex gap-1 items-center'>
          <h6
            className={cn(
              'text-lg font-semibold',
              !isDefaultPlayer ? 'text-foreground' : 'text-neutral-600'
            )}
          >
            {name}
          </h6>
          {!isDefaultPlayer ? (
            <Badge className='h-5 pointer-events-none'>{rating}</Badge>
          ) : null}
        </div>
        {!isDefaultPlayer ? (
          <div className='inline-flex items-center gap-1 text-neutral-600'>
            <p>{age} años</p>{' '}
            <Separator
              orientation='vertical'
              className='w-[1px] h-5 bg-neutral-300'
            />
            <div className='inline-flex gap-0.5 items-center text-inherit'>
              <Icon iconNode={soccerBall} size={16} />
              <p>{goals} goles</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PlayerInfo;
