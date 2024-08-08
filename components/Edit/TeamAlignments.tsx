import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Alignment, Team } from '@/models/team.model';
import api from '@/lib/api';
import { TeamInfo } from '@/models/pages/editTeam.model';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import useAlignments from '@/hooks/useAlignments';

interface SectionProps {
  teamId: Team['id'];
  setInfo: Dispatch<SetStateAction<TeamInfo>>;
  selectedAlignmentId: Team['alignmentId'];
}

interface CarrouselProps extends SectionProps {
  loading: boolean;
  error: boolean;
  alignments: Alignment[];
}

interface CardProps extends Pick<SectionProps, 'selectedAlignmentId'> {
  alignment: Alignment;
  disabled: boolean;
  onClick: (alignmentId: number) => Promise<void>;
}

const AlignmentCard: FC<CardProps> = ({
  alignment,
  selectedAlignmentId,
  disabled,
  onClick,
}) => {
  const alignmentIsSelected = selectedAlignmentId === alignment.id;

  return (
    <CarouselItem
      aria-disabled={disabled}
      className='cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50 basis-1/2 h-fit transition-all'
      onClick={() => onClick(alignment.id)}
    >
      <div
        className={cn(
          'flex-col justify-center size-full  shadow-sm rounded-md border border-neutral-200 overflow-hidden transition-all',
          alignmentIsSelected
            ? 'bg-green-500 text-white'
            : 'bg-background hover:bg-neutral-300'
        )}
      >
        <Image
          width={200}
          height={100}
          src={alignment.img}
          alt={alignment.name}
          className='aspect-video w-full h-full'
        />
        <p className='p-1 pl-2 font-medium'>{alignment.name}</p>
      </div>
    </CarouselItem>
  );
};

const AlignmentsCarrousel: FC<CarrouselProps> = ({
  alignments,
  error,
  loading,
  selectedAlignmentId,
  teamId,
  setInfo,
}) => {
  const selectAlignment = async (alignmentId: number) => {
    try {
      setInfo((prev) => ({ ...prev, loading: true }));
      const { data: updatedTeam } = await api.get(
        `/api/user/teams/${teamId}/edit/alignment?alignmentId=${alignmentId}`
      );

      setInfo((prev) => ({ ...prev, team: updatedTeam }));
    } catch (error) {
      console.log(error);
    } finally {
      setInfo((prev) => ({ ...prev, loading: false }));
    }
  };
  const skeletonClasses = 'flex-grow h-[114px]';

  if (loading)
    return (
      <div className='flex gap-1'>
        {' '}
        <Skeleton className={skeletonClasses} />{' '}
        <Skeleton className={skeletonClasses} />{' '}
        <Skeleton className={skeletonClasses} />
      </div>
    );

  if (error)
    return (
      <p className='text-2xl text-secondary-foreground'>
        Hubo un error al obtener las alineaciones
      </p>
    );

  return (
    <Carousel className='animate-fade-in'>
      <CarouselContent>
        {alignments.map((a) => (
          <AlignmentCard
            alignment={a}
            selectedAlignmentId={selectedAlignmentId}
            key={a.id}
            disabled={loading}
            onClick={selectAlignment}
          />
        ))}
      </CarouselContent>
      <CarouselPrevious className='-left-9 shadow-sm' />
      <CarouselNext className='-right-9 shadow-sm' />
    </Carousel>
  );
};

const TeamAlignments: FC<SectionProps> = ({
  selectedAlignmentId,
  setInfo,
  teamId,
}) => {
  const { alignments, error, loading } = useAlignments();

  return (
    <div className='flex-flex-col bg-background rounded-md'>
      <div className='border-b-neutral-300 border-b p-4'>
        <h2 className='text-2xl font-koho font-semibold'>Alineación</h2>
      </div>
      <div className='p-4 px-10'>
        <AlignmentsCarrousel
          alignments={alignments}
          loading={loading}
          error={error}
          setInfo={setInfo}
          selectedAlignmentId={selectedAlignmentId}
          teamId={teamId}
        />
      </div>
    </div>
  );
};

export default TeamAlignments;
