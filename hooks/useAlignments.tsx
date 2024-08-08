import api from '@/lib/api';
import { Alignment } from '@/models/team.model';
import { useCallback, useEffect, useState } from 'react';

const initialState = {
  loading: true,
  alignments: [] as Alignment[],
};

const useAlignments = () => {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);
  const [alignments, setAlignments] = useState(initialState);

  const getAlignments = useCallback(async () => {
    try {
      const { data } = await api.get('/api/alignments');

      setAlignments((prev) => ({
        ...prev,
        alignments: data,
      }));
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setAlignments((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    if (!mounted) return setMounted(true);
    getAlignments();
  }, [mounted, setMounted, getAlignments]);

  return { error, ...alignments };
};

export default useAlignments;
