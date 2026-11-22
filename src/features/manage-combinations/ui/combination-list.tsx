'use client';

import { memo, useState } from 'react';
import clsx from 'clsx';
import { PunchCombination } from '@/entities/combination';
import { Button, Icon } from '@/shared/ui';
import ConfirmationModal from './confirmation-modal';
import PunchBadge from './punch-badge';

export interface CombinationListProps {
  combinations: PunchCombination[];
  onCreate: () => void;
  onEdit: (combination: PunchCombination) => void;
  onDelete: (id: string) => void;
  onResetDefaults: () => void;
  className?: string;
}

export function CombinationList({
  combinations,
  onCreate,
  onEdit,
  onDelete,
  onResetDefaults,
  className
}: CombinationListProps) {
  const [deletingCombo, setDeletingCombo] = useState<PunchCombination | null>(
    null
  );
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-theme-border">
        <Button
          className="!px-3 !py-1 text-xs font-bold !bg-theme-text !border-theme-text !text-theme-background flex items-center gap-1"
          icon={<Icon iconName="plus" />}
          label="New Combination"
          onClick={onCreate}
        />
        <Button
          className="!px-2 !py-1 text-xs flex items-center gap-1"
          icon={<Icon iconName="reset" />}
          label="Defaults"
          title="Reset combinations to defaults"
          onClick={() => setShowResetModal(true)}
        />
      </div>

      {/* Combinations List */}
      {combinations.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 gap-3 border-2 border-dashed border-theme-border text-center">
          <p className="text-sm font-bold uppercase tracking-wider">
            No combinations
          </p>
          <p className="text-xs text-theme-text/70 max-w-xs">
            There are currently no punch combinations. You can create your own
            or restore the default presets.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              className="!px-3 !py-1 text-xs font-bold"
              label="+ Create Combination"
              onClick={onCreate}
            />
            <Button
              className="!px-3 !py-1 text-xs"
              label="Restore Defaults"
              onClick={() => setShowResetModal(true)}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-160px)] pr-1">
          {combinations.map((combo) => (
            <div
              key={combo.id}
              className={clsx(
                'flex flex-col gap-2 p-2.5',
                'border-2 border-theme-border bg-theme-foreground/15',
                'hover:border-theme-text/80 transition-colors'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-bold text-xs md:text-sm tracking-wide">
                    {combo.name}
                  </span>
                  <span className="text-[11px] text-theme-text/70">
                    {combo.punches.length}{' '}
                    {combo.punches.length === 1 ? 'punch' : 'punches'}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    className="!p-1 text-xs"
                    icon={<Icon iconName="edit" />}
                    aria-label={`Edit ${combo.name}`}
                    title="Edit combination"
                    onClick={() => onEdit(combo)}
                  />
                  <Button
                    className="!p-1 text-xs hover:!bg-red-500/20"
                    icon={<Icon iconName="trash" />}
                    aria-label={`Delete ${combo.name}`}
                    title="Delete combination"
                    onClick={() => setDeletingCombo(combo)}
                  />
                </div>
              </div>

              {/* Punch Sequence Badges */}
              <div className="flex flex-wrap items-center gap-1 pt-1">
                {combo.punches.map((punch, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <PunchBadge punch={punch} compact={true} />
                    {index < combo.punches.length - 1 && (
                      <Icon
                        iconName="arrowRight"
                        className="w-2.5 h-2.5 text-theme-border shrink-0 select-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingCombo)}
        title="Delete Combination?"
        message={`Are you sure you want to delete "${deletingCombo?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          if (deletingCombo) {
            onDelete(deletingCombo.id);
            setDeletingCombo(null);
          }
        }}
        onCancel={() => setDeletingCombo(null)}
      />

      {/* Reset Defaults Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetModal}
        title="Reset to Defaults?"
        message="Reset all combinations to the default presets? Any custom combinations you created will be replaced."
        confirmLabel="Reset"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          onResetDefaults();
          setShowResetModal(false);
        }}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}

export default memo(CombinationList);
