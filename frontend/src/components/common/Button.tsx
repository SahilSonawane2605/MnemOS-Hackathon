import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'outline',
  size = 'md',
  glow = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#D7FF00] text-[#050505] hover:bg-[#c2e600] active:scale-95 border border-[#D7FF00]',
    secondary: 'border border-[#7CF4FF] text-[#7CF4FF] hover:bg-[#7CF4FF]/10 active:scale-95',
    outline: 'border border-white/10 text-white hover:bg-white/5 active:scale-95',
    ghost: 'text-[#A0A0A0] hover:text-white hover:bg-white/5 active:scale-95'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const glowStyle = glow && variant === 'primary' 
    ? 'shadow-[0_0_15px_rgba(215,255,0,0.4)] hover:shadow-[0_0_20px_rgba(215,255,0,0.6)]' 
    : glow && variant === 'secondary'
    ? 'shadow-[0_0_15px_rgba(124,244,255,0.4)] hover:shadow-[0_0_20px_rgba(124,244,255,0.6)]'
    : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
