import { render, screen } from '@testing-library/react';
import Controls from '@/features/trainer/components/controls';

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
});
