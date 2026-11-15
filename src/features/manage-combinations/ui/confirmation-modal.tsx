'use client';

import { memo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Button } from '@/shared/ui';

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel
}: ConfirmationModalProps) {
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 bg-black/60 cursor-default"
        aria-label="Close dialog backdrop"
        tabIndex={-1}
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-desc"
        className={clsx(
          'relative z-10 w-full max-w-sm',
          'border-2 border-theme-border bg-theme-background',
          'p-4 flex flex-col gap-3',
          'shadow-xl'
        )}
      >
        <h3
          id="confirm-modal-title"
          className="text-sm font-bold uppercase tracking-wider"
        >
          {title}
        </h3>
        <p
          id="confirm-modal-desc"
          className="text-xs text-theme-text/90 leading-relaxed"
        >
          {message}
        </p>
        <div className="flex justify-end gap-2 pt-2 border-t border-theme-border/40">
          <Button
            ref={cancelBtnRef}
            type="button"
            className="!px-3 !py-1 text-xs"
            label={cancelLabel}
            onClick={onCancel}
          />
          <Button
            type="button"
            className={clsx(
              '!px-3 !py-1 text-xs font-bold',
              isDestructive &&
                '!border-theme-text !bg-theme-text !text-theme-background'
            )}
            label={confirmLabel}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ConfirmationModal);
