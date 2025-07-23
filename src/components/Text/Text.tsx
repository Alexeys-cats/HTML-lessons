import type { JSX } from 'react';
import { cn } from '../../utils/utils';

type TextType = 'h1' | 'h2' | 'body' | 'helper';
type TextColor = 'primary' | 'default' | 'error';

interface Iprops {
  text: string;
  variant?: TextType;
  color?: TextColor;
  error?: boolean;
  readonly?: boolean;
  className?: string;
  fontW?: 'font-light' | 'font-normal' | 'font-semibold' | 'font-bold';
}

const VariantText: Record<TextType, string> = {
  h1: 'h1',
  h2: 'h2',
  body: 'div',
  helper: 'p',
};

const textSize: Record<TextType, string> = {
  h1: 'text-5xl font-bold p-4',
  h2: 'text-2xl font-semibold p-2',
  body: 'text-base p-1',
  helper: 'text-xs',
};
const textColorVariants: Record<TextColor, string> = {
  default: 'text-[var(--default-color)]',
  primary: 'text-[var(--primary-color)]',
  error: 'text-[var(--error-color)]',
};

export const Text = (props: Iprops) => {
  const {
    text,
    variant = 'body',
    color = 'default',
    error = false,
    readonly = false,
    fontW = 'font-normal',
    className,
    ...otherProps
  } = props;

  const TextTag = VariantText[variant] as keyof JSX.IntrinsicElements;

  return (
    <TextTag
      className={cn(
        textSize[variant],
        textColorVariants[color],
        error && 'text-[var(--error-color)]',
        readonly && 'opacity-50',
        fontW,
        className
      )}
      {...otherProps}
    >
      {text}
    </TextTag>
  );
};
