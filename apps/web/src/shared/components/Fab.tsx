import type { ReactNode } from 'react';

interface FabProps {
  visible: boolean;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

export function Fab({ visible, onClick, ariaLabel, className, children }: FabProps) {
  return (
    <button
      className={`fab fab-extended fab-controlled${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
