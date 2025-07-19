import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<string | undefined | null | boolean>) {
  // Filter out any falsy values and merge the class names
  inputs = inputs.filter(Boolean) as string[];
  // Use clsx to combine class names and twMerge to handle Tailwind conflicts
  return twMerge(clsx(inputs));
}
