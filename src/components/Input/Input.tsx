import { cn } from '../../utils/utils';
import type { InputHTMLAttributes } from 'react';

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
  title?: string;
  error?: boolean;
  errortext?: string;
  helperText?: string;
}

export const Input = (props: Iprops) => {
  const {
    title,
    id,
    placeholder,
    onChange,
    readOnly = false,
    error = false,
    errortext,
    helperText,
    classNames,
    ...otherProps
  } = props;

  const inputStyles = cn(
    'bg-[var(--input-color)]',
    'rounded-2xl',
    'w-full',
    'h-9', // 0.25rem(16px) * 9
    'p-4',
    'mt-2',
    'focus:outline-none',
    'focus:ring-2',
    'transition-all duration-300',
    'focus:ring-[var(--primary-color)]',
    error && 'focus:ring-red-500',
    readOnly && 'opacity-50',
    classNames
  );

  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        disabled={readOnly}
        type="text"
        className={inputStyles}
        {...otherProps}
      />
      {error ? (
        <span className="text-red-500 text-xs">{errortext}</span>
      ) : (
        <span className="text-xs">{helperText}</span>
      )}
    </>
  );
};
