'use client';

import { memo, useCallback, useState } from 'react';
import clsx from 'clsx';
import { CombinationPunch } from '@/entities/combination';
import { PunchType, SectorPosition } from '@/entities/sector';
import { Button, Icon, Select, SelectOption } from '@/shared/ui';
import {
  ALL_PUNCH_POSITIONS,
  ALL_PUNCH_TYPES,
  getPunchLevel,
  getSectorPosition,
  isStraightPunch,
  PUNCH_LABELS,
  PUNCH_POSITION_LABELS,
  PunchLevel,
  toPunchType,
  toSectorPosition,
  togglePunchLevel
} from '../model/punch-helpers';

export interface PunchSequenceEditorProps {
  punches: CombinationPunch[];
  onChange: (punches: CombinationPunch[]) => void;
  error?: string;
  className?: string;
}

const PUNCH_SELECT_OPTIONS: Array<SelectOption<SectorPosition>> =
  ALL_PUNCH_POSITIONS.map((pos) => {
    const isUpper = getPunchLevel(pos) === PunchLevel.UPPER;
    const punchType = toPunchType(pos);
    const isStraight = isStraightPunch(punchType);
    const isLeftHook =
      pos === SectorPosition.LEFT_UPPER || pos === SectorPosition.LEFT_LOWER;
    const iconName = isStraight
      ? 'arrowRight'
      : isLeftHook
        ? 'hookLeft'
        : 'hookRight';

    return {
      value: pos,
      label: PUNCH_POSITION_LABELS[pos],
      group: isUpper ? 'High / Upper (Head)' : 'Low / Lower (Body)',
      icon: <Icon iconName={iconName} className="w-3 h-3 opacity-80 shrink-0" />
    };
  });

export function PunchSequenceEditor({
  punches,
  onChange,
  error,
  className
}: PunchSequenceEditorProps) {
  const [selectedLevel, setSelectedLevel] = useState<PunchLevel>(
    PunchLevel.UPPER
  );

  const handleAddPunch = useCallback(
    (punchType: PunchType) => {
      const position = getSectorPosition(punchType, selectedLevel);
      onChange([...punches, position]);
    },
    [punches, selectedLevel, onChange]
  );

  const handleUpdatePosition = useCallback(
    (index: number, position: SectorPosition) => {
      const updated = [...punches];
      updated[index] = position;
      onChange(updated);
    },
    [punches, onChange]
  );

  const handleToggleLevel = useCallback(
    (index: number) => {
      const updated = [...punches];
      updated[index] = togglePunchLevel(updated[index]);
      onChange(updated);
    },
    [punches, onChange]
  );

  const handleRemovePunch = useCallback(
    (index: number) => {
      const updated = punches.filter((_, i) => i !== index);
      onChange(updated);
    },
    [punches, onChange]
  );

  const handleMovePunch = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= punches.length) return;
      const updated = [...punches];
      const [item] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, item);
      onChange(updated);
    },
    [punches, onChange]
  );

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider">
          Punch Sequence ({punches.length})
        </label>
        <span className="text-[11px] text-theme-text/70">
          In execution order
        </span>
      </div>

      {/* Sequence List */}
      <div
        className={clsx(
          'flex flex-col gap-1.5 p-2',
          'border-2 border-theme-border bg-theme-foreground/20',
          'max-h-64 overflow-y-auto'
        )}
      >
        {punches.length === 0 ? (
          <div className="py-4 text-center text-xs text-theme-text/60 italic">
            No punches added yet. Tap a punch button below to start the
            sequence.
          </div>
        ) : (
          punches.map((punch, index) => {
            const position = toSectorPosition(punch);
            const level = getPunchLevel(punch);
            const isUpper = level === PunchLevel.UPPER;

            return (
              <div
                key={index}
                className={clsx(
                  'flex items-center gap-1.5 p-1.5',
                  'border border-theme-border bg-theme-background',
                  'transition-colors'
                )}
              >
                <span className="w-5 text-center text-xs font-bold text-theme-text/80 select-none shrink-0">
                  #{index + 1}
                </span>

                {/* Level Toggle Button */}
                <Button
                  type="button"
                  className={clsx(
                    '!h-7 !px-2 text-xs font-bold shrink-0 flex items-center justify-center gap-1 whitespace-nowrap',
                    isUpper
                      ? '!bg-theme-background !text-theme-text'
                      : '!bg-theme-text !border-theme-text !text-theme-background'
                  )}
                  icon={
                    <Icon
                      iconName={isUpper ? 'arrowUp' : 'arrowDown'}
                      className="w-2.5 h-2.5 shrink-0"
                    />
                  }
                  iconPosition="left"
                  label={isUpper ? 'High' : 'Low'}
                  aria-label={`Toggle level for step ${index + 1}`}
                  title={
                    isUpper
                      ? 'Upper/Head punch - Click to switch to Lower/Body'
                      : 'Lower/Body punch - Click to switch to Upper/Head'
                  }
                  onClick={() => handleToggleLevel(index)}
                />

                {/* Custom Pixel Select Field */}
                <Select
                  value={position}
                  onChange={(newPos) => handleUpdatePosition(index, newPos)}
                  options={PUNCH_SELECT_OPTIONS}
                  className="flex-1 min-w-0"
                  aria-label={`Select punch position for step ${index + 1}`}
                />

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    type="button"
                    className="!h-7 !w-7 !p-0 flex items-center justify-center text-xs"
                    icon={<Icon iconName="arrowUp" />}
                    disabled={index === 0}
                    aria-label={`Move punch ${index + 1} up`}
                    title="Move punch up"
                    onClick={() => handleMovePunch(index, index - 1)}
                  />
                  <Button
                    type="button"
                    className="!h-7 !w-7 !p-0 flex items-center justify-center text-xs"
                    icon={<Icon iconName="arrowDown" />}
                    disabled={index === punches.length - 1}
                    aria-label={`Move punch ${index + 1} down`}
                    title="Move punch down"
                    onClick={() => handleMovePunch(index, index + 1)}
                  />
                  <Button
                    type="button"
                    className="!h-7 !w-7 !p-0 flex items-center justify-center text-xs hover:!bg-red-500/20"
                    icon={<Icon iconName="trash" />}
                    aria-label={`Remove punch ${index + 1}`}
                    title="Remove punch"
                    onClick={() => handleRemovePunch(index)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {error && (
        <span className="text-xs text-red-600 dark:text-red-400 font-bold">
          {error}
        </span>
      )}

      {/* Add Punch Controls */}
      <div className="flex flex-col gap-2.5 pt-2.5 border-t border-theme-border/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-theme-text/80">
            + Add Punch
          </span>
          <span className="text-[11px] text-theme-text/60">
            Select level then punch
          </span>
        </div>

        {/* Level Selector for New Punches: 2-column grid aligned with punch buttons */}
        <div
          className="grid grid-cols-2 gap-2"
          role="group"
          aria-label="Level for new punches"
        >
          <Button
            type="button"
            className={clsx(
              '!h-8 text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap',
              selectedLevel === PunchLevel.UPPER
                ? '!bg-theme-text !border-theme-text !text-theme-background'
                : 'hover:border-theme-text'
            )}
            icon={<Icon iconName="arrowUp" className="w-3 h-3 shrink-0" />}
            iconPosition="left"
            label="High (Head)"
            aria-pressed={selectedLevel === PunchLevel.UPPER}
            onClick={() => setSelectedLevel(PunchLevel.UPPER)}
          />
          <Button
            type="button"
            className={clsx(
              '!h-8 text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap',
              selectedLevel === PunchLevel.LOWER
                ? '!bg-theme-text !border-theme-text !text-theme-background'
                : 'hover:border-theme-text'
            )}
            icon={<Icon iconName="arrowDown" className="w-3 h-3 shrink-0" />}
            iconPosition="left"
            label="Low (Body)"
            aria-pressed={selectedLevel === PunchLevel.LOWER}
            onClick={() => setSelectedLevel(PunchLevel.LOWER)}
          />
        </div>

        {/* Symmetrically Sized Punch Buttons */}
        <div className="grid grid-cols-2 gap-2 auto-rows-fr">
          {ALL_PUNCH_TYPES.map((type) => {
            const iconName = isStraightPunch(type)
              ? 'arrowRight'
              : type === PunchType.LEFT_HOOK
                ? 'hookLeft'
                : 'hookRight';
            return (
              <Button
                key={type}
                type="button"
                className="!h-9 !px-2.5 text-xs flex items-center justify-between text-left font-sans"
                onClick={() => handleAddPunch(type)}
                label={`+ ${PUNCH_LABELS[type]}`}
                icon={
                  <Icon
                    iconName={iconName}
                    className="w-3 h-3 opacity-80 shrink-0 ml-1"
                  />
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(PunchSequenceEditor);
