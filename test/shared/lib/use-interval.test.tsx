import { render, screen, act } from '@testing-library/react';
import { useInterval } from '@/shared/lib';
import { useState } from 'react';
import { vi } from 'vitest';

function TestComponent({
  isRunning,
  delay
}: {
  isRunning: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  useInterval(isRunning, () => setCount((c) => c + 1), delay);
  return <div data-testid="count">{count}</div>;
}

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls onInterval when running', () => {
    render(<TestComponent isRunning={true} delay={1000} />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  it('does not call when not running', () => {
    render(<TestComponent isRunning={false} delay={1000} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('clears interval when stopped', () => {
    const { rerender } = render(
      <TestComponent isRunning={true} delay={1000} />
    );
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    rerender(<TestComponent isRunning={false} delay={1000} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('1'); // should not increment
  });
});
