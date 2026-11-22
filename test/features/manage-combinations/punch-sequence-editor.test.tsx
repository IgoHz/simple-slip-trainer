import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SectorPosition } from '@/entities/sector';
import { PunchSequenceEditor } from '@/features/manage-combinations';

describe('PunchSequenceEditor', () => {
  it('renders punches in execution order with step numbers', () => {
    const punches = [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT
    ];
    render(<PunchSequenceEditor punches={punches} onChange={vi.fn()} />);

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
    expect(screen.getByText('Punch Sequence (2)')).toBeInTheDocument();
  });

  it('adds upper punch when high level is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <PunchSequenceEditor
        punches={[SectorPosition.UPPER_LEFT_STRAIGHT]}
        onChange={handleChange}
      />
    );

    await user.click(screen.getByRole('button', { name: /\+.*Right Hook/i }));

    expect(handleChange).toHaveBeenCalledWith([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.RIGHT_UPPER
    ]);
  });

  it('adds lower punch when low level is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <PunchSequenceEditor
        punches={[SectorPosition.UPPER_LEFT_STRAIGHT]}
        onChange={handleChange}
      />
    );

    // Switch level to Low (Body)
    await user.click(screen.getByRole('button', { name: /Low \(Body\)/i }));

    // Click + Right Hook
    await user.click(screen.getByRole('button', { name: /\+.*Right Hook/i }));

    expect(handleChange).toHaveBeenCalledWith([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.RIGHT_LOWER
    ]);
  });

  it('toggles punch level between high and low using the level button on step', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <PunchSequenceEditor
        punches={[SectorPosition.UPPER_LEFT_STRAIGHT]}
        onChange={handleChange}
      />
    );

    // Click the toggle button for step 1
    const toggleBtn = screen.getByRole('button', {
      name: /toggle level for step 1/i
    });
    expect(toggleBtn).toHaveTextContent('High');
    expect(toggleBtn.querySelector('svg')).toBeInTheDocument();

    await user.click(toggleBtn);
    expect(handleChange).toHaveBeenCalledWith([
      SectorPosition.LOWER_LEFT_STRAIGHT
    ]);
  });

  it('supports repeated punches', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <PunchSequenceEditor
        punches={[SectorPosition.UPPER_LEFT_STRAIGHT]}
        onChange={handleChange}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /\+.*Left Straight/i })
    );

    expect(handleChange).toHaveBeenCalledWith([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_LEFT_STRAIGHT
    ]);
  });

  it('reorders punches with move up and move down buttons', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const punches = [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.RIGHT_UPPER,
      SectorPosition.LOWER_RIGHT_STRAIGHT
    ];

    render(<PunchSequenceEditor punches={punches} onChange={handleChange} />);

    const moveDownFirst = screen.getByRole('button', {
      name: /move punch 1 down/i
    });
    expect(
      screen.getByRole('button', { name: /move punch 1 up/i })
    ).toBeDisabled();

    await user.click(moveDownFirst);
    expect(handleChange).toHaveBeenCalledWith([
      SectorPosition.RIGHT_UPPER,
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.LOWER_RIGHT_STRAIGHT
    ]);

    const moveUpSecond = screen.getByRole('button', {
      name: /move punch 2 up/i
    });
    await user.click(moveUpSecond);
    expect(handleChange).toHaveBeenCalledWith([
      SectorPosition.RIGHT_UPPER,
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.LOWER_RIGHT_STRAIGHT
    ]);

    expect(
      screen.getByRole('button', { name: /move punch 3 down/i })
    ).toBeDisabled();
  });

  it('removes punch when remove button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const punches = [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT
    ];

    render(<PunchSequenceEditor punches={punches} onChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: /remove punch 1/i }));

    expect(handleChange).toHaveBeenCalledWith([
      SectorPosition.UPPER_RIGHT_STRAIGHT
    ]);
  });

  it('changes punch position when select dropdown is changed', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const punches = [SectorPosition.UPPER_LEFT_STRAIGHT];

    render(<PunchSequenceEditor punches={punches} onChange={handleChange} />);

    await user.click(
      screen.getByRole('combobox', {
        name: /select punch position for step 1/i
      })
    );
    await user.click(screen.getByRole('option', { name: /Lower Left Hook/i }));

    expect(handleChange).toHaveBeenCalledWith([SectorPosition.LEFT_LOWER]);
  });

  it('displays error message when provided', () => {
    render(
      <PunchSequenceEditor
        punches={[]}
        onChange={vi.fn()}
        error="Sequence must have at least one punch."
      />
    );

    expect(
      screen.getByText('Sequence must have at least one punch.')
    ).toBeInTheDocument();
  });
});
