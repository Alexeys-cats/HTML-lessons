import { NavLink } from 'react-router-dom';
import React from 'react';
import { clsx } from 'clsx';

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
        clsx('transition-colors duration-200 hover:text-[#00DBDB]', className, {
          'text-[#00DBDB] font-semibold': isActive,
        })
      }
    >
      {children}
    </NavLink>
  );
};

export default AppLink;
