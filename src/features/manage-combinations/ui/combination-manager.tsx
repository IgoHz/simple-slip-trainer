'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  addCombinationSelector,
  combinationsSelector,
  deleteCombinationSelector,
  CombinationPunch,
  PunchCombination,
  resetToDefaultsSelector,
  updateCombinationSelector,
  useCombinationStore
} from '@/entities/combination';
import { Button, Icon } from '@/shared/ui';
import CombinationForm from './combination-form';
import CombinationList from './combination-list';

export interface CombinationManagerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

type ManagerView = 'list' | 'create' | 'edit';

export function CombinationManager({
  isOpen,
  onClose,
  className
}: CombinationManagerProps) {
  const [view, setView] = useState<ManagerView>('list');
  const [editingCombo, setEditingCombo] = useState<PunchCombination | null>(
    null
  );

  const combinations = useCombinationStore(combinationsSelector);
  const addCombination = useCombinationStore(addCombinationSelector);
  const updateCombination = useCombinationStore(updateCombinationSelector);
  const deleteCombination = useCombinationStore(deleteCombinationSelector);
  const resetToDefaults = useCombinationStore(resetToDefaultsSelector);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveElementRef = useRef<HTMLElement | null>(null);

  // Manage focus and body scroll lock
  useEffect(() => {
    if (isOpen) {
      prevActiveElementRef.current =
        document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
      if (prevActiveElementRef.current) {
        prevActiveElementRef.current.focus();
      }
      // Reset view on close
      setView('list');
      setEditingCombo(null);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If in form view, form handles dirty check via its cancel button or user escapes dialog
        if (view === 'list') {
          e.stopPropagation();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, view, onClose]);

  const handleStartCreate = useCallback(() => {
    setEditingCombo(null);
    setView('create');
  }, []);

  const handleStartEdit = useCallback((combo: PunchCombination) => {
    setEditingCombo(combo);
    setView('edit');
  }, []);

  const handleFormCancel = useCallback(() => {
    setEditingCombo(null);
    setView('list');
  }, []);

  const handleFormSave = useCallback(
    (data: { name: string; punches: CombinationPunch[] }) => {
      if (editingCombo) {
        updateCombination(editingCombo.id, data);
      } else {
        addCombination(data);
      }
      setEditingCombo(null);
      setView('list');
    },
    [editingCombo, addCombination, updateCombination]
  );

  const handleBackdropClick = useCallback(() => {
    if (view === 'list') {
      onClose();
    }
  }, [view, onClose]);

  if (!isOpen) return null;

  const title =
    view === 'list'
      ? 'Punch Combinations'
      : view === 'create'
        ? 'New Combination'
        : 'Edit Combination';

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="combination-manager-title"
    >
      <button
        type="button"
        className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-default transition-opacity animate-in fade-in duration-200"
        aria-label="Backdrop"
        tabIndex={-1}
        onClick={handleBackdropClick}
      />
      <div
        ref={drawerRef}
        className={clsx(
          'relative z-10 flex flex-col',
          'w-full max-w-full md:max-w-[420px] h-full',
          'bg-theme-background text-theme-text',
          'border-r-2 border-theme-border',
          'shadow-2xl overflow-hidden',
          'animate-in slide-in-from-left duration-200',
          className
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-3 border-b-2 border-theme-border bg-theme-foreground/30">
          <div className="flex items-center gap-2">
            {view !== 'list' && (
              <Button
                className="!p-1 text-xs"
                icon={<Icon iconName="arrowLeft" />}
                aria-label="Back to combination list"
                title="Back to list"
                onClick={handleFormCancel}
              />
            )}
            <h2
              id="combination-manager-title"
              className="text-xs md:text-sm font-bold uppercase tracking-wider"
            >
              {title}
            </h2>
          </div>
          <Button
            ref={closeButtonRef}
            className="!p-1 text-xs"
            icon={<Icon iconName="close" />}
            aria-label="Close combination manager"
            title="Close"
            onClick={onClose}
          />
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {view === 'list' ? (
            <CombinationList
              combinations={combinations}
              onCreate={handleStartCreate}
              onEdit={handleStartEdit}
              onDelete={deleteCombination}
              onResetDefaults={resetToDefaults}
            />
          ) : (
            <CombinationForm
              combination={editingCombo}
              onSave={handleFormSave}
              onCancel={handleFormCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CombinationManager);
