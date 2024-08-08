import Arena from '@/components/Arena/Arena';
import ArenaPlayer from '@/components/Arena/ArenaPlayer';
import TeamResume from '@/components/TeamResume';
import { getTeams, teamIsValid } from '@/helpers/teams';
import { Team } from '@/models/team.model';

const RenderTeams = ({
  players,
  minimal,
}: {
  players: Team['players'];
  minimal?: boolean;
}) => {
  if (!players) return null;

  return (
    <>
      {players.map((p) => (
        <ArenaPlayer
          minimal={minimal}
          className={
            p.teamId === 1
              ? 'border-4 border-blue-500'
              : 'border-4 border-red-500'
          }
          {...p}
          key={p.id}
        />
      ))}
    </>
  );
};

async function Home() {
  const teams = await getTeams();

  return (
    <main className='bg-background p-4 flex flex-col justify-center items-center gap-3 h-full md:p-6'>
      {teams ? (
        <>
          <header
            className='hidden items-center justify-between w-full pb-4 border-neutral-300 border-b md:flex'
            id='match-teams'
          >
            <TeamResume
              side='left'
              buttonLink={`/edit/${teams[1].id}`}
              alignment={teams[1].alignment}
              name={teams[1]?.name}
              valid={teamIsValid(teams[1])}
            />
            <span className='text-koho text-3xl font-semibold'>VS</span>
            <TeamResume
              side='right'
              buttonLink={`/edit/${teams[2].id}`}
              alignment={teams[2].alignment}
              name={teams[2]?.name}
              valid={teamIsValid(teams[2])}
            />
          </header>
          <Arena className='hidden flex-grow md:block h-[400px] lg:h-[600px]'>
            <RenderTeams players={[...teams[1].players, ...teams[2].players]} />
          </Arena>
          <div className='flex flex-col md:hidden size-full gap-4'>
            <TeamResume
              side='left'
              buttonLink={`/edit/${teams[1].id}`}
              alignment={teams[1].alignment}
              name={teams[1]?.name}
              valid={teamIsValid(teams[1])}
            />
            <Arena orientation='vertical' className='block'>
              <RenderTeams
                players={[...teams[1].players, ...teams[2].players]}
                minimal
              />
            </Arena>
            <TeamResume
              side='right'
              buttonLink={`/edit/${teams[2].id}`}
              alignment={teams[2].alignment}
              name={teams[2]?.name}
              valid={teamIsValid(teams[2])}
            />
          </div>
        </>
      ) : (
        <h1 className='text-secondary-foreground text-3xl'>
          Hubo un error al cargar los equipos
        </h1>
      )}
    </main>
  );
}

export default Home;
