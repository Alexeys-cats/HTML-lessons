import { cn } from '../../utils/utils';
import type { InputHTMLAttributes } from 'react';

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
  title?: string;
  error?: boolean;
  errortext?: string;
  helperText?: string;
}
/**
 * Переиспользуемый компонент инпута
 * @param {string} Лейбл над инпутом.
 * @param {boolean} Если true, меняет стиль на ошибочный.
 * @param {string} Текст ошибки (если error=true).
 * @param {string} Вспомогательный текст под полем.
 * @param {boolean} Блокирует редактирование.
 * @param {string} Дополнительные классы Tailwind.
 */
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
      <span
        className={`text-xs block min-h-[12px] ${error ? 'text-[var(--error-color)]' : 'text-[var(--input-color)]'}`}
      >
        {error ? errortext : (helperText ?? '')}
      </span>
    </>
  );
};
