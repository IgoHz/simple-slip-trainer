import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controls } from '@/widgets/controls';

describe('Controls', () => {
  it('renders the application title', () => {
    render(<Controls />);
    expect(
      screen.getByRole('heading', { name: /simple slip trainer/i })
    ).toBeInTheDocument();
  });

  it('renders expand button', () => {
    render(<Controls />);
    expect(
      screen.getByRole('button', { name: /expand button/i })
    ).toBeInTheDocument();
  });

  it('renders stopwatch controls', () => {
    render(<Controls />);
    expect(
      screen.getByRole('button', { name: /play button/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /stop button/i })
    ).toBeInTheDocument();
  });

  it('renders mode selector controls', () => {
    render(<Controls />);
    expect(screen.getByText('Mode:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /random singles mode/i })
    ).toBeInTheDocument();
  });

  it('renders menu button for combination manager', () => {
    render(<Controls />);
    expect(
      screen.getByRole('button', { name: /combination manager/i })
    ).toBeInTheDocument();
  });

  it('opens combination manager when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Controls />);

    expect(
      screen.queryByRole('dialog', { name: /punch combinations/i })
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /combination manager/i })
    );

    expect(
      screen.getByRole('dialog', { name: /punch combinations/i })
    ).toBeInTheDocument();
  });

  it('toggles mobile expand/collapse state when expand button is clicked', async () => {
    const user = userEvent.setup();
    render(<Controls />);

    const expandBtn = screen.getByRole('button', { name: /expand button/i });
    await user.click(expandBtn);

    expect(
      screen.getByRole('button', { name: /collapse button/i })
    ).toBeInTheDocument();
  });
});
