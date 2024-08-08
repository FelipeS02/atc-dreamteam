import ApiCountry from '@/models/apiFootball/country.model';
import ApiLeague from '@/models/apiFootball/league.model';
import ApiTeam from '@/models/apiFootball/team.model';
import ApiPlayer from '@/models/apiFootball/player.model';
import { FiltersState } from './SearchByTeamOption';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import PlayerInfo, {
  PlayerInfoProps,
} from '@/components/PlayerCard/PlayerInfo';
import { cn } from '@/lib/utils';

type FilterDispatch = <FK extends keyof FiltersState>(
  key: FK,
  newFilter: FiltersState[FK]
) => Promise<void>;

type ListProps<T> = {
  list: T[];
  selectedId: string | null;
  onFilterSelect: FilterDispatch;
  loading: boolean;
};

type OptionProps = {
  name: string;
  img: string;
  onClick: () => Promise<void>;
  selected: boolean;
};

interface PlayerOptionsProps extends PlayerInfoProps {
  onlyLecture?: boolean;
  onSelect?: () => void;
}

const cardClasses =
  'inline-flex items-center col-span-1 border-neutral-300 border p-2 rounded-md gap-2 hover:border-neutral-400 transition-all h-fit aria-selected:border-green-500';

const ListOptionSkeleton = () => (
  <div className='inline-flex items-center col-span-1 border-neutral-300 border p-2 rounded-md gap-2 w-full'>
    <Skeleton className='size-10 rounded-md' />
    <Skeleton className='w-[40%] h-6' />
  </div>
);

const SkeletonList = () => (
  <>
    <ListOptionSkeleton />
    <ListOptionSkeleton />
    <ListOptionSkeleton />
    <ListOptionSkeleton />
    <ListOptionSkeleton />
    <ListOptionSkeleton />
    <ListOptionSkeleton />
  </>
);

const NotDataFound = () => (
  <p className='text-lg text-neutral-500 font-medium '>
    No se encontraron resultados
  </p>
);

const ListOption: FC<OptionProps> = ({ img, name, onClick, selected }) => {
  return (
    <button
      className={cardClasses}
      disabled={selected}
      aria-selected={selected}
      onClick={onClick}
    >
      <Avatar className='hidden md:block rounded-md shadow-md'>
        <AvatarImage src={img} className='object-cover' />
        <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <p className='font-koho font-medium uppercase whitespace-nowrap text-xl overflow-hidden text-ellipsis'>
        {name}
      </p>
    </button>
  );
};

export const PlayerOption: FC<PlayerOptionsProps> = ({
  onlyLecture,
  onSelect,
  className,
  ...rest
}) => {
  const Comp = onlyLecture ? 'div' : 'button';
  return (
    <Comp
      className={cn(cardClasses, 'h-[86px]', className)}
      onClick={onSelect}
      disabled={onlyLecture}
    >
      <PlayerInfo {...rest} />
    </Comp>
  );
};

export const RenderCountriesList: FC<ListProps<ApiCountry>> = ({
  list,
  onFilterSelect,
  selectedId,
  loading,
}) => {
  if (loading) return <SkeletonList />;

  if (!list) return <NotDataFound />;

  return (
    <>
      {list?.map((c) => (
        <ListOption
          img={c.country_logo}
          name={c.country_name}
          selected={c.country_id === selectedId}
          onClick={() => onFilterSelect<'country'>('country', c)}
          key={c.country_id}
        />
      ))}
    </>
  );
};

export const RenderLeaguesList: FC<ListProps<ApiLeague>> = ({
  list,
  loading,
  onFilterSelect,
  selectedId,
}) => {
  if (loading) return <SkeletonList />;

  if (!list) return <NotDataFound />;

  return (
    <>
      {list?.map((l) => (
        <ListOption
          img={l.league_logo}
          name={l.league_name}
          selected={l.league_id === selectedId}
          onClick={() => onFilterSelect<'league'>('league', l)}
          key={l.league_id}
        />
      ))}
    </>
  );
};

export const RenderTeamsList: FC<ListProps<ApiTeam>> = ({
  list,
  loading,
  onFilterSelect,
  selectedId,
}) => {
  if (loading) return <SkeletonList />;

  if (!list) return <NotDataFound />;

  return (
    <>
      {list?.map((t) => (
        <ListOption
          img={t.team_badge}
          name={t.team_name}
          selected={t.team_key === selectedId}
          onClick={() => onFilterSelect<'team'>('team', t)}
          key={t.team_key}
        />
      ))}
    </>
  );
};

type PlayerListProps = {
  list: ApiPlayer[];
  loading: boolean;
  onSelect: (player: ApiPlayer) => void;
};

export const RenderPlayersList: FC<PlayerListProps> = ({
  list,
  loading,
  onSelect,
}) => {
  if (loading) return <SkeletonList />;

  if (!list) return <NotDataFound />;

  return (
    <>
      {list?.map((p) => (
        <PlayerOption
          age={p.player_age}
          goals={p.player_goals}
          img={p.player_image}
          name={p.player_name}
          rating={p.player_rating}
          onSelect={() => onSelect(p)}
          key={p.player_id}
        />
      ))}
    </>
  );
};
