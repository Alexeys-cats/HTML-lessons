import { cn } from '@/shared/utils';

type ImageSize = 'sm' | 'md' | 'lg';
type AnimationType = 'spin' | 'bounce' | 'pulse' | 'none';
interface IProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  animation?: 'spin' | 'bounce' | 'pulse' | 'none';
  className?: string;
}

const sizeClasses: Record<ImageSize, string> = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24 sm:w-32 sm:h-32',
  lg: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52',
};

const animatedClasses: Record<AnimationType, string> = {
  spin: 'animate-spin',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  none: '',
};

/**
 * Переиспользуемый компонент изображения
 * @param {string} Путь до изображения.
 * @param {string} Альтернативный текст.
 * @param {'sm' | 'md' | 'lg'} Размер изображения.
 * @param {'spin' | 'bounce' | 'pulse' | 'none'} Тип анимации.
 * @param {string} Дополнительные классы Tailwind.
 */
export const Image = ({
  src,
  alt = 'Изображение',
  size = 'md',
  animation = 'none',
  className,
}: IProps) => {
  return (
    <div className="flex justify-center">
      <img
        src={src}
        alt={alt}
        className={cn(sizeClasses[size], animatedClasses[animation], className)}
      />
    </div>
  );
};
