import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearchChange?: (val: string) => void;
  showShortcut?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  showShortcut = true,
  className = '',
  placeholder = 'Search learning memories...',
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-neutral-400 pointer-events-none" />
      <input
        type="text"
        className="w-full pl-10 pr-16 py-2 bg-neutral-900/60 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {showShortcut && (
        <div className="absolute right-3 flex items-center space-x-0.5 px-1.5 py-0.5 bg-neutral-800/80 border border-neutral-700/60 rounded text-[10px] text-neutral-400 font-mono pointer-events-none">
          <span>⌘</span>
          <span>K</span>
        </div>
      )}
    </div>
  );
};
