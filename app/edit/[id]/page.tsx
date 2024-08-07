'use client';
import { getTeamById } from '@/helpers/teams';
import { Team } from '@/models/team.model';
import React, { useCallback, useEffect, useState } from 'react';

type Info = {
  loading: boolean;
  team: Team;
};

const initialState: Info = {
  loading: true,
  team: { alignment: null, alignmentId: null, id: 0, name: '', players: [] },
};

const Edit = ({ params }: { params: { id: string } }) => {
  const teamId = Number(params?.id) || 0;
  const [{ loading, team }, setInfo] = useState<Info>(initialState);

  const getTeam = useCallback(async () => {
    try {
      if (!teamId) return;
      const team = await (await fetch(`/api/teams/${teamId}`)).json();

      if (!team) return;
      setInfo((prev) => ({ ...prev, team }));
    } catch (error) {
      console.log(error);
    } finally {
      setInfo((prev) => ({ ...prev, loading: false }));
    }
  }, [teamId]);

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return <div>page</div>;
};

export default Edit;
