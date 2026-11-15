'use client';

import { FormEvent, memo, useMemo, useState } from 'react';
import clsx from 'clsx';
import { CombinationPunch, PunchCombination } from '@/entities/combination';
import { SectorPosition } from '@/entities/sector';
import { Button, Input } from '@/shared/ui';
import ConfirmationModal from './confirmation-modal';
import PunchSequenceEditor from './punch-sequence-editor';

export interface CombinationFormProps {
  combination?: PunchCombination | null;
  onSave: (data: { name: string; punches: CombinationPunch[] }) => void;
  onCancel: () => void;
  className?: string;
}

const DEFAULT_INITIAL_PUNCHES: SectorPosition[] = [
  SectorPosition.UPPER_LEFT_STRAIGHT,
  SectorPosition.UPPER_RIGHT_STRAIGHT
];

export function CombinationForm({
  combination,
  onSave,
  onCancel,
  className
}: CombinationFormProps) {
  const isEditing = Boolean(combination);

  const initialName = useMemo(() => combination?.name ?? '', [combination]);
  const initialPunches = useMemo(
    () => (combination ? [...combination.punches] : DEFAULT_INITIAL_PUNCHES),
    [combination]
  );

  const [name, setName] = useState(initialName);
  const [punches, setPunches] = useState<CombinationPunch[]>(initialPunches);
  const [errors, setErrors] = useState<{ name?: string; punches?: string }>({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const isDirty = useMemo(() => {
    if (name !== initialName) return true;
    if (punches.length !== initialPunches.length) return true;
    return punches.some((p, i) => p !== initialPunches[i]);
  }, [name, initialName, punches, initialPunches]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handlePunchesChange = (newPunches: CombinationPunch[]) => {
    setPunches(newPunches);
    if (errors.punches && newPunches.length > 0) {
      setErrors((prev) => ({ ...prev, punches: undefined }));
    }
  };

  const handleCancelClick = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      onCancel();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const newErrors: { name?: string; punches?: string } = {};

    if (!trimmed) {
      newErrors.name = 'Combination name is required.';
    } else if (trimmed.length > 40) {
      newErrors.name = 'Name must be 40 characters or less.';
    }

    if (punches.length === 0) {
      newErrors.punches = 'Sequence must have at least one punch.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: trimmed,
      punches
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('flex flex-col gap-4', className)}
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="combination-name"
          className="text-xs font-bold uppercase tracking-wider"
        >
          Combination Name *
        </label>
        <Input
          id="combination-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g. Jab–Cross–Hook (1–2–3)"
          maxLength={40}
          className={clsx(
            'w-full',
            errors.name && '!border-red-600 focus:!outline-red-600'
          )}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'combo-name-error' : undefined}
        />
        {errors.name && (
          <span
            id="combo-name-error"
            className="text-xs text-red-600 dark:text-red-400 font-bold"
          >
            {errors.name}
          </span>
        )}
      </div>

      <PunchSequenceEditor
        punches={punches}
        onChange={handlePunchesChange}
        error={errors.punches}
      />

      <div className="flex items-center justify-end gap-2 pt-3 border-t-2 border-theme-border">
        <Button
          type="button"
          label="Cancel"
          className="!px-3 !py-1 text-xs"
          onClick={handleCancelClick}
        />
        <Button
          type="submit"
          label={isEditing ? 'Save Changes' : 'Create Combination'}
          className="!px-3 !py-1 text-xs font-bold !bg-theme-text !border-theme-text !text-theme-background"
        />
      </div>

      <ConfirmationModal
        isOpen={showDiscardModal}
        title="Discard Changes?"
        message="You have unsaved changes in this combination. Are you sure you want to discard them?"
        confirmLabel="Discard"
        cancelLabel="Keep Editing"
        isDestructive={true}
        onConfirm={() => {
          setShowDiscardModal(false);
          onCancel();
        }}
        onCancel={() => setShowDiscardModal(false)}
      />
    </form>
  );
}

export default memo(CombinationForm);
