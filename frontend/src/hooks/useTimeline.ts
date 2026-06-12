import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export function useTimeline() {
  const { memories, isLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('All');

  const filteredMemories = useMemo(() => {
    return memories.filter((mem) => {
      const matchesSearch =
        mem.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mem.aiSummary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSource =
        sourceFilter === 'All' || mem.source === sourceFilter;

      return matchesSearch && matchesSource;
    });
  }, [memories, searchQuery, sourceFilter]);

  const sourcesList = useMemo(() => {
    const set = new Set(memories.map((m) => m.source));
    return ['All', ...Array.from(set)];
  }, [memories]);

  return {
    memories: filteredMemories,
    searchQuery,
    setSearchQuery,
    sourceFilter,
    setSourceFilter,
    sourcesList,
    isLoading
  };
}
