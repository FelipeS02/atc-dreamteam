import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import arena from './arena.module.css';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface Props extends PropsWithChildren {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  orientation?: 'vertical' | 'horizontal';
}

const Arena: FC<Props> = ({
  children,
  className,
  orientation = 'horizontal',
}) => {
  const areaClassesVertical =
    'w-[80%] h-[30%] -my-[15%] absolute border-2 self-center';

  if (orientation === 'vertical')
    return (
      <div
        className={cn(
          'p-2 rounded-sm bg-[var(--arena-color)] size-full',
          className
        )}
      >
        <div
          className={
            'size-full relative flex flex-col border-2 overflow-hidden'
          }
        >
          {/* Top area */}
          <div className={cn(areaClassesVertical, 'top-0 rounded-b-[45%]')} />

          {/* Bottom area */}
          <div
            className={cn(areaClassesVertical, 'bottom-0 rounded-t-[45%]')}
          />

          {/* Center line */}
          <Separator
            orientation='horizontal'
            className='h-[2px] bg-white w-full absolute top-1/2'
          />
          <div className='rounded-full border-2 border-white absolute left-1/2 top-1/2 -m-[15%] p-[15%]' />

          {/* Player board */}
          <div className={'size-full absolute'}>
            <div className={arena.board} data-orientation={orientation}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );

  const areaClassesHorizontal =
    'h-[80%] w-[30%] -mx-[11%] self-center absolute border-2';
  return (
    <div
      className={cn(
        'p-2 rounded-sm bg-[var(--arena-color)] size-full',
        className
      )}
    >
      <div className={'size-full relative flex border-2 overflow-hidden'}>
        {/* Left area */}
        <div className={cn(areaClassesHorizontal, 'left-0 rounded-e-[45%]')} />

        {/* Right area */}
        <div className={cn(areaClassesHorizontal, 'right-0 rounded-s-[45%]')} />

        {/* Center line */}
        <Separator
          orientation='vertical'
          className='w-[2px] bg-white h-full absolute left-1/2'
        />
        <div className='rounded-full border-2 border-white absolute left-1/2 top-1/2 -m-[10%] p-[10%]' />

        {/* Player board */}
        <div className={'size-full absolute'}>
          <div className={arena.board} data-orientation={orientation}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
