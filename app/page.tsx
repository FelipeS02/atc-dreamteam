import Arena from '@/components/Arena/Arena';
import TeamResume from '@/components/TeamResume';
import { getTeams, teamIsValid } from '@/helpers/teams';

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
              buttonLink=''
              alignment={teams[1].alignment}
              name={teams[1]?.name}
              valid={teamIsValid(teams[1])}
            />
            <span className='text-koho text-3xl font-semibold'>VS</span>
            <TeamResume
              side='right'
              buttonLink=''
              alignment={teams[2].alignment}
              name={teams[2]?.name}
              valid={teamIsValid(teams[2])}
            />
          </header>
          <Arena className='hidden flex-grow md:block h-[400px] lg:h-[600px]'></Arena>
          <div className='flex flex-col md:hidden size-full gap-4'>
            <TeamResume
              side='left'
              buttonLink=''
              alignment={teams[1].alignment}
              name={teams[1]?.name}
              valid={teamIsValid(teams[1])}
            />
            <Arena orientation='vertical' className='block' />
            <TeamResume
              side='right'
              buttonLink=''
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
