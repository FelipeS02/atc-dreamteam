import api from '@/lib/api';
import { TeamInfo } from '@/models/pages/editTeam.model';
import { useCallback, useEffect, useState } from 'react';

const initialTeamState: TeamInfo = {
  loading: true,
  team: { alignment: null, alignmentId: null, id: 0, name: '', players: [] },
};

const useTeamById = (teamId: number) => {
  const [mounted, setMounted] = useState(false);
  
  const [info, setInfo] = useState<TeamInfo>(initialTeamState);

  const getTeam = useCallback(async () => {
    try {
      if (!teamId) return;
      const { data: foundedTeam } = await api.get(`/api/user/teams/${teamId}`);

      if (!foundedTeam) return;

      setInfo((prev) => ({ ...prev, team: foundedTeam }));
    } catch (error) {
      console.log(error);
    } finally {
      setInfo((prev) => ({ ...prev, loading: false }));
    }
  }, [teamId]);

  useEffect(() => {
    if (!mounted) return setMounted(true);
    getTeam();
  }, [getTeam, mounted, setMounted]);

  return { ...info, setInfo };
};

export default useTeamById;
