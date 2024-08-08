import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import api from '@/lib/api';
import ApiCountry from '@/models/apiFootball/country.model';
import ApiLeague from '@/models/apiFootball/league.model';
import ApiTeam from '@/models/apiFootball/team.model';
import ApiPlayer from '@/models/apiFootball/player.model';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  RenderCountriesList,
  RenderLeaguesList,
  RenderPlayersList,
  RenderTeamsList,
} from './RenderFilterOptions';
import { filterSelectedPlayers } from '@/helpers/players';

type ComboState = {
  countries: ApiCountry[];
  leagues: ApiLeague[];
  teams: ApiTeam[];
  players: ApiPlayer[];
};

export type FiltersState = {
  country: ApiCountry | null;
  league: ApiLeague | null;
  team: ApiTeam | null;
};

const initialComboState: ComboState = {
  countries: [],
  leagues: [],
  teams: [],
  players: [],
};

const initialFiltersState: FiltersState = {
  country: null,
  league: null,
  team: null,
};

const MemoCountriesList = memo(RenderCountriesList);
const MemoLeaguesList = memo(RenderLeaguesList);
const MemoTeamsList = memo(RenderTeamsList);
const MemoPlayersList = memo(RenderPlayersList);

type Props = {
  onPlayerSelect: (player: ApiPlayer) => void;
};

const SearchByTeamOption: FC<Props> = ({ onPlayerSelect }) => {
  const [loading, setLoading] = useState(true);
  const [accordion, setAccordion] = useState(1);

  const [{ countries, leagues, teams, players }, setCombos] =
    useState<ComboState>(initialComboState);

  const [{ country, league, team }, setFilters] =
    useState<FiltersState>(initialFiltersState);

  const getCountries = useCallback(async () => {
    try {
      if (countries.length === 0) {
        const { data: newCountries } = await api.get('/api/countries');

        setCombos((prev) => ({ ...prev, countries: newCountries }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [countries]);

  const selectFilter = async <FK extends keyof FiltersState>(
    key: FK,
    newFilter: FiltersState[FK]
  ) => {
    try {
      setFilters((prev) => ({ ...prev, [key]: newFilter }));

      // In country selection
      if (key === 'country') {
        setLoading(true);
        // Open leagues accordion
        setAccordion(2);

        // Clean children filters
        setFilters((prev) => ({ ...prev, team: null, league: null }));

        const countryId = (newFilter as ApiCountry).country_id;

        // Get leagues of that country
        const { data: leagues } = await api.get(
          `/api/leagues?countryId=${countryId}`
        );

        setCombos((prev) => ({
          ...initialComboState,
          leagues,
          countries: prev.countries,
        }));
      }

      if (key === 'league') {
        setLoading(true);
        // Open teams accordion
        setAccordion(3);

        // Clean children filters
        setFilters((prev) => ({ ...prev, team: null }));

        const leagueId = (newFilter as ApiLeague).league_id;

        const { data: teams } = await api.get(
          `/api/teams?leagueId=${leagueId}`
        );

        // Filter of teams without players
        const filteredTeams = (teams as ApiTeam[]).filter(
          (t) => t?.players?.length > 0
        );

        setCombos((prev) => ({ ...prev, teams: filteredTeams }));
      }

      if (key === 'team') {
        setLoading(true);
        // Open teams accordion
        setAccordion(4);

        const teamKey = (newFilter as ApiTeam).team_key;
        const teamByKey = teams.find((t) => t.team_key === teamKey);

        if (!teamByKey) throw Error('Unable to find team');

        const { players } = teamByKey;

        const filteredPlayers = await filterSelectedPlayers(players);

        setCombos((prev) => ({
          ...prev,
          players: filteredPlayers,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const itemClasses =
    'grid grid-cols-2 grid-flow-row max-h-[400px] overflow-auto gap-2';

  return (
    <Accordion
      type='single'
      value={String(accordion)}
      collapsible
      className='w-full'
      disabled={loading}
      onValueChange={(val) => setAccordion(Number(val))}
    >
      <AccordionItem value={'1'}>
        <AccordionTrigger>
          <div className='inline-flex items-center gap-2'>
            País{' '}
            {country ? (
              <Image
                src={country?.country_logo}
                alt={country.country_name}
                width={50}
                height={50}
                className='h-auto w-10 rounded-sm shadow-md'
              />
            ) : null}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className={itemClasses}>
            <MemoCountriesList
              list={countries}
              onFilterSelect={selectFilter}
              selectedId={country?.country_id || null}
              loading={loading}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'2'} disabled={!country}>
        <AccordionTrigger>
          <div className='inline-flex items-center gap-2'>
            Liga{' '}
            {league ? (
              <Image
                src={league?.league_logo}
                alt={league?.league_name}
                width={50}
                height={50}
                className='size-10 rounded-sm drop-shadow-md'
              />
            ) : null}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className={itemClasses}>
            <MemoLeaguesList
              list={leagues}
              loading={loading}
              onFilterSelect={selectFilter}
              selectedId={league?.league_id || null}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'3'} disabled={!league}>
        <AccordionTrigger>
          <div className='inline-flex items-center gap-2'>
            Equipo{' '}
            {team ? (
              <Image
                src={team?.team_badge}
                alt={team?.team_badge}
                width={50}
                height={50}
                className='size-10 rounded-sm drop-shadow-md'
              />
            ) : null}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className={itemClasses}>
            <MemoTeamsList
              list={teams}
              loading={loading}
              onFilterSelect={selectFilter}
              selectedId={team?.team_key || null}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'4'} disabled={!team}>
        <AccordionTrigger>Jugador</AccordionTrigger>
        <AccordionContent>
          <div className={itemClasses}>
            <MemoPlayersList
              list={players}
              loading={loading}
              onSelect={onPlayerSelect}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SearchByTeamOption;
