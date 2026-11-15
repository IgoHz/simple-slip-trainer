'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Icon } from '../icon';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  group?: string;
  icon?: ReactNode;
}

export interface SelectProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: Array<SelectOption<T>>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export function Select<T extends string = string>({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className,
  disabled = false,
  'aria-label': ariaLabel
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  const calculateCoords = useCallback(() => {
    if (!triggerRef.current) return null;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const popoverHeight = 220;

    const showAbove = spaceBelow < popoverHeight && rect.top > spaceBelow;
    const top = showAbove
      ? Math.max(8, rect.top - popoverHeight - 4)
      : rect.bottom + 4;

    const minWidth = Math.max(rect.width, 210);
    let left = rect.left;
    if (left + minWidth > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - minWidth - 8);
    }

    return {
      top,
      left,
      width: minWidth
    };
  }, []);

  const updatePosition = useCallback(() => {
    const nextCoords = calculateCoords();
    if (nextCoords) {
      setCoords(nextCoords);
    }
  }, [calculateCoords]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setCoords(calculateCoords());
      } else {
        setCoords(null);
      }
      return next;
    });
  }, [disabled, calculateCoords]);

  // Update position and handle scroll/resize
  useEffect(() => {
    if (!isOpen) {
      setCoords(null);
      return;
    }

    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        listboxRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
      setCoords(null);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Escape') {
      if (isOpen) {
        e.stopPropagation();
        setIsOpen(false);
        setCoords(null);
      }
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setCoords(calculateCoords());
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = Math.min(options.length - 1, currentIndex + 1);
      onChange(options[nextIndex].value);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setCoords(calculateCoords());
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevIndex = Math.max(0, currentIndex - 1);
      onChange(options[prevIndex].value);
      return;
    }
  };

  const handleOptionClick = useCallback(
    (optionValue: T) => {
      onChange(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  // Group options if any option has group
  const hasGroups = options.some((opt) => Boolean(opt.group));
  const groupedOptions = hasGroups
    ? options.reduce<Record<string, Array<SelectOption<T>>>>((acc, opt) => {
        const groupName = opt.group || 'Other';
        if (!acc[groupName]) {
          acc[groupName] = [];
        }
        acc[groupName].push(opt);
        return acc;
      }, {})
    : null;

  return (
    <div
      ref={containerRef}
      className={clsx('relative inline-block font-sans select-none', className)}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={clsx(
          'w-full h-7 px-2 py-1',
          'flex items-center justify-between gap-1.5',
          'text-xs font-sans text-theme-text bg-theme-background',
          'border-2 border-theme-border transition-colors',
          'hover:not(:disabled):border-theme-text',
          'focus:outline-1 focus:outline-theme-border',
          'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer'
        )}
      >
        <span className="truncate text-left flex items-center gap-1.5 min-w-0">
          {selectedOption?.icon}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <span className="text-[10px] shrink-0 opacity-80" aria-hidden="true">
          <Icon iconName={isOpen ? 'collapse' : 'expand'} />
        </span>
      </button>

      {/* Popover Listbox via Portal */}
      {isOpen &&
        coords &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id={listboxId}
            ref={listboxRef}
            role="listbox"
            aria-label={ariaLabel}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              zIndex: 9999
            }}
            className={clsx(
              'max-h-52 overflow-y-auto',
              'border-2 border-theme-border bg-theme-background text-theme-text',
              'shadow-2xl p-1 flex flex-col gap-0.5',
              'animate-in fade-in duration-100'
            )}
          >
            {groupedOptions
              ? Object.entries(groupedOptions).map(([groupName, groupOpts]) => (
                  <div key={groupName} className="flex flex-col">
                    <span className="text-[10px] font-bold text-theme-text/60 uppercase px-2 py-1 border-b border-theme-border/30 select-none">
                      {groupName}
                    </span>
                    {groupOpts.map((opt) => {
                      const isSelected = opt.value === value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleOptionClick(opt.value)}
                          className={clsx(
                            'w-full px-2 py-1.5 text-xs text-left font-sans',
                            'flex items-center justify-between gap-2',
                            'transition-colors cursor-pointer',
                            isSelected
                              ? '!bg-theme-text !text-theme-background font-bold'
                              : 'hover:bg-theme-text/20 hover:text-theme-text'
                          )}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            {opt.icon}
                            <span>{opt.label}</span>
                          </span>
                          {isSelected && (
                            <span
                              className="text-[10px] font-bold"
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              : options.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleOptionClick(opt.value)}
                      className={clsx(
                        'w-full px-2 py-1.5 text-xs text-left font-sans',
                        'flex items-center justify-between gap-2',
                        'transition-colors cursor-pointer',
                        isSelected
                          ? '!bg-theme-text !text-theme-background font-bold'
                          : 'hover:bg-theme-text/20 hover:text-theme-text'
                      )}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        {opt.icon}
                        <span>{opt.label}</span>
                      </span>
                      {isSelected && (
                        <span
                          className="text-[10px] font-bold"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
          </div>,
          document.body
        )}
    </div>
  );
}

export default memo(Select) as typeof Select;
