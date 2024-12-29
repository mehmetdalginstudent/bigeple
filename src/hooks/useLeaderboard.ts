import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard, addLeaderboardEntry } from '../services/leaderboardService';

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    setLoading(true);
    const data = await getLeaderboard();
    setEntries(data);
    setLoading(false);
  }

  async function addEntry(entry: Omit<LeaderboardEntry, 'id' | 'date'>) {
    await addLeaderboardEntry(entry);
    await loadLeaderboard();
  }

  return {
    entries,
    loading,
    addEntry,
    refresh: loadLeaderboard
  };
}