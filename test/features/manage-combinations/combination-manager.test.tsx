import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCombinationStore } from '@/entities/combination';
import { CombinationManager } from '@/features/manage-combinations';

describe('CombinationManager', () => {
  beforeEach(() => {
    localStorage.clear();
    useCombinationStore.getState().resetToDefaults();
  });

  it('does not render anything when isOpen is false', () => {
    render(<CombinationManager isOpen={false} onClose={vi.fn()} />);
    expect(
      screen.queryByRole('dialog', { name: /punch combinations/i })
    ).not.toBeInTheDocument();
  });

  it('renders modal drawer when isOpen is true', () => {
    render(<CombinationManager isOpen={true} onClose={vi.fn()} />);
    expect(
      screen.getByRole('dialog', { name: /punch combinations/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Jab–Cross (1–2)')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<CombinationManager isOpen={true} onClose={handleClose} />);

    await user.click(
      screen.getByRole('button', { name: /^close combination manager$/i })
    );
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked in list view', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<CombinationManager isOpen={true} onClose={handleClose} />);

    await user.click(screen.getByRole('button', { name: /^backdrop$/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key press in list view', () => {
    const handleClose = vi.fn();
    render(<CombinationManager isOpen={true} onClose={handleClose} />);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('navigates to create form and back to list', async () => {
    const user = userEvent.setup();
    render(<CombinationManager isOpen={true} onClose={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /new combination/i }));

    expect(
      screen.getByRole('heading', { name: /new combination/i })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /back to combination list/i })
    );

    expect(
      screen.getByRole('heading', { name: /punch combinations/i })
    ).toBeInTheDocument();
  });

  it('creates and saves a combination from the manager', async () => {
    const user = userEvent.setup();
    render(<CombinationManager isOpen={true} onClose={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /new combination/i }));

    const input = screen.getByRole('textbox', { name: /combination name/i });
    await user.clear(input);
    await user.type(input, 'Super Combo 3000');

    await user.click(
      screen.getByRole('button', { name: /create combination/i })
    );

    expect(
      screen.getByRole('heading', { name: /punch combinations/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Super Combo 3000')).toBeInTheDocument();
  });
});
