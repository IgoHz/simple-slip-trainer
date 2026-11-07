import { PaddingWrapper } from '../padding-wrapper';
import clsx from 'clsx';

export interface CopyrightProps {
  className?: string;
}

export default function Copyright({ className }: CopyrightProps) {
  return (
    <PaddingWrapper
      className={clsx(
        'flex justify-center',
        'text-sm md:text-inherit',
        className
      )}
    >
      <a
        href="https://github.com/IgoHz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit IHOR T.'s GitHub profile"
        className={clsx(
          'group relative',
          'text-theme-text no-underline',
          'opacity-60 hover:opacity-100',
          'transition-colors duration-200 ease-[ease]'
        )}
      >
        &#169; {new Date().getFullYear()} IHOR T.
        <span
          className="opacity-50 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
          aria-hidden="true"
        >
          &nbsp;
          {'>'}_
        </span>
      </a>
    </PaddingWrapper>
  );
}
