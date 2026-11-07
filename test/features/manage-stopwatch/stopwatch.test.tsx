import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Stopwatch } from '@/features/manage-stopwatch';
import { useSessionStore } from '@/entities/session';
import { useInterval } from '@/shared/lib';
import { vi, type Mock } from 'vitest';

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useState: vi.fn(actual.useState)
  };
});

vi.mock('@/entities/session', async () => {
  const actual =
    await vi.importActual<typeof import('@/entities/session')>(
      '@/entities/session'
    );
  return {
    ...actual,
    useSessionStore: vi.fn(),
    useControlsStore: vi.fn(),
    isPlayingSelector: vi.fn(),
    setIsPlayingSelector: vi.fn()
  };
});

vi.mock('@/shared/lib', async () => {
  const actual = await vi.importActual('@/shared/lib');
  return {
    ...actual,
    useInterval: vi.fn()
  };
});

const mockUseSessionStore = useSessionStore as unknown as Mock;
const mockUseInterval = useInterval as unknown as Mock;

describe('Stopwatch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders time label and display', () => {
    mockUseSessionStore.mockReturnValue(false); // isPlaying

    render(<Stopwatch />);
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('displays formatted time', () => {
    mockUseSessionStore.mockReturnValue(false);

    // Mock useState to have time = 65 (1:05)
    vi.mocked(useState).mockReturnValueOnce([65, vi.fn()]);

    render(<Stopwatch />);
    expect(screen.getByText('01:05')).toBeInTheDocument();
  });

  it('calls useInterval with correct params', () => {
    mockUseSessionStore.mockReturnValue(true); // isPlaying

    render(<Stopwatch />);
    expect(mockUseInterval).toHaveBeenCalledWith(
      true,
      expect.any(Function),
      1000
    );
  });

  it('handles play/pause click', async () => {
    const user = userEvent.setup();
    const mockSetIsPlaying = vi.fn();
    mockUseSessionStore
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockSetIsPlaying); // isPlaying, setIsPlaying

    render(<Stopwatch />);
    await user.click(screen.getByRole('button', { name: /play button/i }));
    expect(mockSetIsPlaying).toHaveBeenCalledWith(true);
  });

  it('handles stop click', async () => {
    const user = userEvent.setup();
    const mockSetTime = vi.fn();
    mockUseSessionStore.mockReturnValue(false);

    // Mock useState
    vi.mocked(useState).mockReturnValueOnce([10, mockSetTime]);

    render(<Stopwatch />);
    await user.click(screen.getByRole('button', { name: /stop button/i }));
    expect(mockSetTime).toHaveBeenCalledWith(0);
  });

  it('disables stop button when time is 0', () => {
    mockUseSessionStore.mockReturnValue(false);

    render(<Stopwatch />);
    expect(screen.getByRole('button', { name: /stop button/i })).toBeDisabled();
  });

  it('enables stop button when time > 0', () => {
    mockUseSessionStore.mockReturnValue(false);

    vi.mocked(useState).mockReturnValueOnce([1, vi.fn()]);

    render(<Stopwatch />);
    expect(
      screen.getByRole('button', { name: /stop button/i })
    ).not.toBeDisabled();
  });
});
