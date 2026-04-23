import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/button';

describe('Button', () => {
  it('renders label', () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('renders icon', () => {
    const icon = <span data-testid="icon">🔥</span>;
    render(<Button icon={icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('handles click', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" disabled />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });
});
