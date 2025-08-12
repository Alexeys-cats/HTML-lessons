import { cn } from '@/shared/utils';
import type { ReactNode } from 'react';

type Direction = 'row' | 'column';
type Align = 'start' | 'center' | 'end';
type justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type Gap = 0 | 1 | 2 | 4 | 6 | 8 | 16 | 32;

interface Iprops {
  direction?: Direction;
  align?: Align;
  justify?: justify;
  gap?: Gap;
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

const gapMap: Record<Gap, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
  16: 'gap-16',
  32: 'gap-32',
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
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
};
