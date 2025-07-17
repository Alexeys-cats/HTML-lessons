// TODO стили вставить в библеотеку cn из tailwind
import type { JSX } from 'react';

type TextType = 'h1' | 'h2' | 'body' | 'helper';

interface Iprops {
  text: string;
  variant?: TextType;
  error?: boolean;
  readonly?: boolean;
  className?: string;
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

export const Text = (props: Iprops) => {
  const {
    text,
    variant = 'body',
    error = false,
    readonly = false,
    className,
    ...otherProps
  } = props;

  const TextTag = VariantText[variant] as keyof JSX.IntrinsicElements;

  return (
    <TextTag
      className={`${textSize[variant]} ${error && 'text-red-500'} border-2 ${readonly && 'opacity-50'} ${className}`}
      {...otherProps}
    >
      {text}
    </TextTag>
  );
};
