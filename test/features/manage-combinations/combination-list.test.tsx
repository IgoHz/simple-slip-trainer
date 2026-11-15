import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PunchCombination } from '@/entities/combination';
import { PunchType } from '@/entities/sector';
import { CombinationList } from '@/features/manage-combinations';

describe('CombinationList', () => {
  const sampleCombos: PunchCombination[] = [
    {
      id: 'combo-1',
      name: 'Combo Alpha',
      punches: [PunchType.LEFT_STRAIGHT, PunchType.RIGHT_STRAIGHT]
    },
    {
      id: 'combo-2',
      name: 'Combo Beta',
      punches: [PunchType.LEFT_HOOK]
    }
  ];

  it('renders list of combinations with names and punch counts', () => {
    render(
      <CombinationList
        combinations={sampleCombos}
        onCreate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onResetDefaults={vi.fn()}
      />
    );

    expect(screen.getByText('Combo Alpha')).toBeInTheDocument();
    expect(screen.getByText('Combo Beta')).toBeInTheDocument();
    expect(screen.getByText('2 punches')).toBeInTheDocument();
    expect(screen.getByText('1 punch')).toBeInTheDocument();
  });

  it('renders empty state when combinations array is empty', () => {
    render(
      <CombinationList
        combinations={[]}
        onCreate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onResetDefaults={vi.fn()}
      />
    );

    expect(screen.getByText(/no combinations/i)).toBeInTheDocument();
  });

  it('calls onCreate when New Combination button is clicked', async () => {
    const user = userEvent.setup();
    const handleCreate = vi.fn();

    render(
      <CombinationList
        combinations={sampleCombos}
        onCreate={handleCreate}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onResetDefaults={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /new combination/i }));
    expect(handleCreate).toHaveBeenCalledTimes(1);
  });

  it('calls onEdit when Edit button is clicked', async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();

    render(
      <CombinationList
        combinations={sampleCombos}
        onCreate={vi.fn()}
        onEdit={handleEdit}
        onDelete={vi.fn()}
        onResetDefaults={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /edit combo alpha/i }));
    expect(handleEdit).toHaveBeenCalledWith(sampleCombos[0]);
  });

  it('prompts confirmation before calling onDelete', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(
      <CombinationList
        combinations={sampleCombos}
        onCreate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={handleDelete}
        onResetDefaults={vi.fn()}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /delete combo alpha/i })
    );
    expect(screen.getByText(/delete combination\?/i)).toBeInTheDocument();
    expect(handleDelete).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /^delete$/i }));
    expect(handleDelete).toHaveBeenCalledWith('combo-1');
  });

  it('prompts confirmation before calling onResetDefaults', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();

    render(
      <CombinationList
        combinations={sampleCombos}
        onCreate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onResetDefaults={handleReset}
      />
    );

    await user.click(screen.getByRole('button', { name: /defaults/i }));
    expect(screen.getByText(/reset to defaults\?/i)).toBeInTheDocument();
    expect(handleReset).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /^reset$/i }));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
