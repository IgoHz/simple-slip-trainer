import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('has aria-label when provided', () => {
    render(<Input aria-label="Test input" />);
    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  it('handles value change', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows skeleton when loading', () => {
    render(<Input isLoading />);
    // Assuming InputSkeleton has some identifiable element
    expect(screen.getByTestId('input-skeleton')).toBeInTheDocument();
  });
});
