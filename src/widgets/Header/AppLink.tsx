import { NavLink } from 'react-router-dom';
import React from 'react';
import { cn } from '@/shared/utils';

interface AppLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const AppLink = ({ to, children, className }: AppLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn('transition-colors duration-200 hover:text-[#00DBDB]', className, {
          'text-[#00DBDB] font-semibold': isActive,
        })
      }
    >
      {children}
    </NavLink>
  );
};

export default AppLink;
