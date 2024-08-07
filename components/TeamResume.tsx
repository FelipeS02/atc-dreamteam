import { cn } from '@/lib/utils';
import { Team } from '@/models/team.model';
import {
  ClipboardPenLine,
  LucideProps,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { FC } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import Link from 'next/link';

type TeamProps = {
  name: string;
  buttonLink: string;
  side: 'left' | 'right';
  alignment: Team['alignment'];
  valid: boolean;
};

export const TeamShield: FC<Pick<TeamProps, 'valid'>> = ({ valid }) => {
  const shieldProps: LucideProps = {
    strokeWidth: 1,
  };

  const sizeQuery = 'size-[80px] lg:size-[120px]';

  return valid ? (
    <ShieldCheck
      className={cn('size-[80px] fill-green-500 text-neutral-100', sizeQuery)}
      {...shieldProps}
    />
  ) : (
    <ShieldAlert
      className={cn('fill-neutral-100 text-neutral-300', sizeQuery)}
      {...shieldProps}
    />
  );
};

const EditButton: FC<Pick<TeamProps, 'buttonLink'>> = ({ buttonLink }) => {
  return (
    <Button
      variant={'outline'}
      className='w-fit'
      size={'sm'}
      asChild
    >
      <Link href={buttonLink}>
        <ClipboardPenLine size={18} />
        Editar
      </Link>
    </Button>
  );
};

const TeamResume: FC<TeamProps> = ({
  buttonLink,
  alignment,
  side,
  valid,
  name,
}) => {
  const title = 'text-2xl lg:text-3xl font-koho font-bold';
  const alignmentSection = 'text-xl lg:text-2xl text-secondary-foreground';
  const infoLayout = 'flex flex-col lg:gap-2';

  if (side === 'left') {
    return (
      <div className='flex items-center w-full'>
        <TeamShield valid={valid} />
        <div className={infoLayout}>
          <div className='flex items-center gap-3'>
            <h2 className={title}>{name}</h2>
            {alignment ? (
              <>
                <Separator
                  orientation='vertical'
                  className='h-10 w-[1.5px] bg-neutral-300'
                />
                <p className={alignmentSection}>{alignment.name}</p>
              </>
            ) : null}
          </div>
          <EditButton buttonLink={buttonLink} />
        </div>
      </div>
    );
  }
  if (side === 'right') {
    return (
      <div className='flex items-center justify-end w-full'>
        <div className={cn(infoLayout, 'items-end')}>
          <div className='flex items-center gap-3'>
            {alignment ? (
              <>
                <p className={alignmentSection}>{alignment.name}</p>
                <Separator
                  orientation='vertical'
                  className='h-10 w-[1.5px] bg-neutral-300'
                />
              </>
            ) : null}

            <h2 className={title}>{name}</h2>
          </div>
          <EditButton buttonLink={buttonLink} />
        </div>
        <TeamShield valid={valid} />
      </div>
    );
  }

  return null;
};

export default TeamResume;
