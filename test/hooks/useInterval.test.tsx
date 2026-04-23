import { render, screen, act } from '@testing-library/react';
import { useInterval } from '@/hooks/useInterval';
import { useState } from 'react';

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
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls onInterval when running', () => {
    render(<TestComponent isRunning={true} delay={1000} />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  it('does not call when not running', () => {
    render(<TestComponent isRunning={false} delay={1000} />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('clears interval when stopped', () => {
    const { rerender } = render(
      <TestComponent isRunning={true} delay={1000} />
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    rerender(<TestComponent isRunning={false} delay={1000} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('1'); // should not increment
  });
});
