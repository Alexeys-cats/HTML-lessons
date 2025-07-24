import type { ReactNode, MouseEvent } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ANIMATION_DELAY } from '../../utils/constants';
import { cn } from '../../utils/utils';

interface IProps {
  children: ReactNode;
  className?: string;
  rounded?: 'rounded-md' | 'rounded-lg' | 'rounded-xl';
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal = ({
  children,
  className,
  rounded,
  isOpen = false,
  onClose,
}: IProps) => {
  // состояния для работы с анимацией
  const [isMounted, setIsmounted] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCloseHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose?.();
        setIsClosing(false);
        setIsmounted(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onContentClicked = (e: MouseEvent) => e.stopPropagation();
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseHandler();
      }
    },
    [onCloseHandler]
  );

  useEffect(() => {
    if (isOpen) {
      setIsmounted(true);
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const isVisible = isMounted || isClosing;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[var(--modal-z-index)] flex items-center justify-center cursor-pointer',
        { 'opacity-0 pointer-events-none': !isVisible },
        className
      )}
    >
      <div
        onClick={onCloseHandler}
        className={cn(
          'fixed flex items-center justify-center inset-0 bg-black/50 transition-opacity duration-300 ease-in-out'
        )}
      >
        <div
          onClick={onContentClicked}
          className={cn(
            'relative z-10 w-full max-w-lg p-6 bg-white shadow-lg transition-transform duration-300 ease-in',
            isOpen && !isClosing ? 'scale-100' : 'scale-20',
            rounded
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
