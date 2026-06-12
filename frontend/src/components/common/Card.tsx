import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: 'primary' | 'secondary' | 'none';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glowColor = 'none',
  interactive = false,
  className = '',
  ...props
}) => {
  const glowStyles = {
    primary: 'after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(ellipse_at_top_right,rgba(215,255,0,0.08),transparent_50%)]',
    secondary: 'after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(ellipse_at_top_right,rgba(124,244,255,0.08),transparent_50%)]',
    none: ''
  };

  return (
    <div
      className={`
        relative overflow-hidden
        backdrop-blur-md bg-neutral-900/60 border border-white/10 rounded-2xl
        transition-all duration-300 ease-out
        ${glowStyles[glowColor]}
        ${interactive ? 'hover:border-neutral-700 hover:bg-neutral-900/80 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-neutral-950/80' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Visual grain layer for paper-like high-end screen */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none -z-10" />
      {children}
    </div>
  );
};
