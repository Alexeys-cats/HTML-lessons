import { cn } from '@/shared/utils';
import type { ReactNode } from 'react';

type Direction = 'row' | 'column';
type Align = 'start' | 'center' | 'end';
type justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

interface Iprops {
  direction?: Direction;
  align?: Align;
  justify?: justify;
  gap?: number;
  className?: string;
  children: ReactNode;
}

const directionMap: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
};

const alignMap: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
};

const justifyMap: Record<justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const Stack = ({
  direction = 'row',
  align = 'center',
  justify = 'center',
  gap = 0,
  className,
  children,
}: Iprops) => {
  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        gap && `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};
