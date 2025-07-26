import React from 'react';
import { cn } from '../../../utils/utils';

interface MainBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<MainBtnProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  type = 'button',
  disabled = false,
  onClick,
  children,
  className,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-medium transition-colors cursor-pointer';

  const variants = {
    primary: 'bg-[#00DBDB] text-[#2D2D2D] hover:bg-[#00A3A3] rounded-custom',
    secondary: 'bg-[] text-[] hover:bg-[]',
    danger: 'bg-[#9A0003] text-[#2D2D2D] hover:bg-[] rounded-custom',
    ghost: 'bg-[#D3D3D3] text-[#2D2D2D] hover:bg-[] rounded-custom',
  };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        { ['opacity-50 cursor-not-allowed']: disabled },
        className
      )}
      disabled={loading || disabled}
      type={type}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="animate-spin mr-2"></span>}
      <span>{children}</span>
    </button>
  );
};
