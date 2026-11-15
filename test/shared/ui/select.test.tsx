import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select, SelectOption } from '@/shared/ui';

describe('Select', () => {
  const options: Array<SelectOption<string>> = [
    { value: 'opt-1', label: 'Option 1', group: 'Group A' },
    { value: 'opt-2', label: 'Option 2', group: 'Group A' },
    { value: 'opt-3', label: 'Option 3', group: 'Group B' }
  ];

  it('renders trigger with current selected option label', () => {
    render(
      <Select
        value="opt-1"
        onChange={vi.fn()}
        options={options}
        aria-label="Test Select"
      />
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Option 1');
  });

  it('opens dropdown on click and displays options and group headers', async () => {
    const user = userEvent.setup();
    render(
      <Select
        value="opt-1"
        onChange={vi.fn()}
        options={options}
        aria-label="Test Select"
      />
    );

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(screen.getByRole('combobox'));

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Group A')).toBeInTheDocument();
    expect(screen.getByText('Group B')).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /Option 2/i })
    ).toBeInTheDocument();
  });

  it('selects option on click and closes dropdown', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select
        value="opt-1"
        onChange={handleChange}
        options={options}
        aria-label="Test Select"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /Option 2/i }));

    expect(handleChange).toHaveBeenCalledWith('opt-2');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup();
    render(
      <Select
        value="opt-1"
        onChange={vi.fn()}
        options={options}
        aria-label="Test Select"
      />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('navigates options with ArrowDown and ArrowUp', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select
        value="opt-1"
        onChange={handleChange}
        options={options}
        aria-label="Test Select"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}');
    expect(handleChange).toHaveBeenCalledWith('opt-2');

    await user.keyboard('{ArrowUp}');
    expect(handleChange).toHaveBeenCalledWith('opt-1');
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Select
        value="opt-1"
        onChange={vi.fn()}
        options={options}
        disabled={true}
        aria-label="Test Select"
      />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
