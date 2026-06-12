import React from 'react';
import { useTimeline } from '../hooks/useTimeline';
import { TimelineItem } from '../components/timeline/TimelineItem';
import { EmptyState } from '../components/common/EmptyState';
import { CalendarDays } from 'lucide-react';

export const Timeline: React.FC = () => {
  const { memories } = useTimeline();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1 select-none">
        <h2 className="text-xl font-bold text-white font-mono">LEARNING TIMELINE</h2>
        <p className="text-xs text-neutral-400 font-sans">
          Track the evolution of your technical focus over time, charting your chronological growth trajectory.
        </p>
      </div>

      {/* Timeline Guide Line Grid */}
      {memories.length === 0 ? (
        <EmptyState
          title="Learning Timeline Empty"
          description="Your MnemOS Twin has no recorded memories for this history timeline."
          icon={<CalendarDays className="w-8 h-8 text-neutral-500" />}
        />
      ) : (
        <div className="max-w-3xl mx-auto py-8">
          {memories.map((item, idx) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={idx === memories.length - 1}
            />
          ))}
        </div>
      )}

    </div>
  );
};
export default Timeline;
