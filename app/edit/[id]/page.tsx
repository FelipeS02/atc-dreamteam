'use client';
import { useCallback, useEffect, useState } from 'react';
import TeamName from '@/components/Edit/TeamName';
import { teamIsValid } from '@/helpers/teams';
import api from '@/lib/api';
import ApiResponse from '@/models/api.model';
import { Team } from '@/models/team.model';
import { TeamInfo } from '@/models/pages/editTeam.model';
import Arena from '@/components/Arena/Arena';

const initialState: TeamInfo = {
  loading: true,
  team: { alignment: null, alignmentId: null, id: 0, name: '', players: [] },
};

const Edit = ({ params }: { params: { id: string } }) => {
  const teamId = Number(params?.id) || 0;
  const [{ loading, team }, setInfo] = useState<TeamInfo>(initialState);

  const getTeam = useCallback(async () => {
    try {
      if (!teamId) return;
      const { data: foundedTeam } = await api.get<ApiResponse<Team>>(
        `/api/teams/${teamId}`
      );

      if (!foundedTeam) return;

      setInfo((prev) => ({ ...prev, team: { ...prev.team, ...foundedTeam } }));
    } catch (error) {
      console.log(error);
    } finally {
      setInfo((prev) => ({ ...prev, loading: false }));
    }
  }, [teamId]);

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return (
    <main className='grid grid-cols-1 lg:grid-cols-10 gap-6 flex-grow'>
      <div className='flex flex-col col-span-4'>
        <TeamName
          name={team.name}
          valid={teamIsValid(team)}
          loading={loading}
          teamId={teamId}
          setInfo={setInfo}
        />
      </div>

      <div className='block col-span-4 col-start-6 p-4 bg-background rounded-md'>
        <Arena orientation='vertical'/>
      </div>
    </main>
  );
};

export default Edit;
