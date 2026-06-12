import React from 'react';
import { DatabaseBackup } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Identified',
  description = 'Your Learning Twin has not processed telemetry for this criteria yet.',
  icon = <DatabaseBackup className="w-8 h-8 text-neutral-500" />
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/5 rounded-2xl bg-neutral-900/20 max-w-md mx-auto my-8">
      <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-white mb-1 font-mono uppercase tracking-wider">{title}</h3>
      <p className="text-xs text-neutral-400">{description}</p>
    </div>
  );
};
