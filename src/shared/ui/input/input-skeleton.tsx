import { memo } from 'react';
import clsx from 'clsx';
import { Icon } from '../icon';

function InputSkeleton() {
  return (
    <div
      className={clsx(
        'font-sans text-sm leading-4',
        'max-h-7 w-16',
        'p-[var(--padding-normal)]',
        'text-center',
        'text-theme-text bg-theme-background',
        'border-2 border-theme-border',
        'opacity-60 cursor-not-allowed',
        '[@media(pointer:coarse)]:max-h-[1.6rem]'
      )}
      data-testid="input-skeleton"
    >
      <Icon iconName="loading" />
    </div>
  );
}

export default memo(InputSkeleton);
