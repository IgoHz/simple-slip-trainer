import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PunchCombination } from '@/entities/combination';
import { SectorPosition } from '@/entities/sector';
import { CombinationForm } from '@/features/manage-combinations';

describe('CombinationForm', () => {
  it('populates existing values when editing and preserves punch levels', () => {
    const combination: PunchCombination = {
      id: 'combo-1',
      name: 'Custom Body Hook Combo',
      punches: [SectorPosition.UPPER_LEFT_STRAIGHT, SectorPosition.RIGHT_LOWER]
    };

    render(
      <CombinationForm
        combination={combination}
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(
      screen.getByRole('textbox', { name: /combination name/i })
    ).toHaveValue('Custom Body Hook Combo');
    expect(screen.getByText('Punch Sequence (2)')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument();

    // Verify step 2 has the Low level toggle
    const toggleBtnStep2 = screen.getByRole('button', {
      name: /toggle level for step 2/i
    });
    expect(toggleBtnStep2).toHaveTextContent('↓ Low');
  });

  it('rejects empty name and does not call onSave', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(<CombinationForm onSave={handleSave} onCancel={vi.fn()} />);

    const input = screen.getByRole('textbox', { name: /combination name/i });
    await user.clear(input);
    await user.click(
      screen.getByRole('button', { name: /create combination/i })
    );

    expect(
      screen.getByText(/combination name is required/i)
    ).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
  });

  it('rejects empty punch sequence and does not call onSave', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(<CombinationForm onSave={handleSave} onCancel={vi.fn()} />);

    const input = screen.getByRole('textbox', { name: /combination name/i });
    await user.type(input, 'Valid Combo');

    // Remove the two default punches
    await user.click(screen.getByRole('button', { name: /remove punch 1/i }));
    await user.click(screen.getByRole('button', { name: /remove punch 1/i }));

    await user.click(
      screen.getByRole('button', { name: /create combination/i })
    );

    expect(
      screen.getByText(/sequence must have at least one punch/i)
    ).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
  });

  it('trims whitespace and submits valid form with higher and lower punches', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(<CombinationForm onSave={handleSave} onCancel={vi.fn()} />);

    const input = screen.getByRole('textbox', { name: /combination name/i });
    await user.type(input, '   Jab Cross Extra   ');

    await user.click(
      screen.getByRole('button', { name: /create combination/i })
    );

    expect(handleSave).toHaveBeenCalledWith({
      name: 'Jab Cross Extra',
      punches: [
        SectorPosition.UPPER_LEFT_STRAIGHT,
        SectorPosition.UPPER_RIGHT_STRAIGHT
      ]
    });
  });

  it('calls onCancel immediately if form is not dirty', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(<CombinationForm onSave={vi.fn()} onCancel={handleCancel} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('shows confirmation dialog before discarding unsaved changes', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(<CombinationForm onSave={vi.fn()} onCancel={handleCancel} />);

    const input = screen.getByRole('textbox', { name: /combination name/i });
    await user.type(input, 'A');

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleCancel).not.toHaveBeenCalled();
    expect(screen.getByText(/discard changes\?/i)).toBeInTheDocument();

    // Discarding triggers cancel
    await user.click(screen.getByRole('button', { name: /^discard$/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
