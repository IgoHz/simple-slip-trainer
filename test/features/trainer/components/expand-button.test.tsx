import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandButton from '@/features/trainer/components/controls/expand-button';

describe('ExpandButton', () => {
  it('renders expand button when not expanded', () => {
    render(<ExpandButton isExpanded={false} onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: /expand button/i })
    ).toBeInTheDocument();
  });

  it('renders collapse button when expanded', () => {
    render(<ExpandButton isExpanded={true} onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: /collapse button/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<ExpandButton isExpanded={false} onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /expand button/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies className', () => {
    render(
      <ExpandButton
        className="test-class"
        isExpanded={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });
});
