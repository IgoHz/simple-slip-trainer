import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Stopwatch } from '@/features/manage-stopwatch';
import { useSessionStore } from '@/entities/session';
import { useInterval } from '@/shared/lib';

jest.mock('@/entities/session', () => ({
  useSessionStore: jest.fn(),
  useControlsStore: jest.fn(),
  isPlayingSelector: jest.fn(),
  setIsPlayingSelector: jest.fn()
}));

jest.mock('@/shared/lib', () => {
  const actual = jest.requireActual('@/shared/lib');
  return {
    ...actual,
    useInterval: jest.fn()
  };
});

const mockUseSessionStore = useSessionStore as unknown as jest.Mock;
const mockUseInterval = useInterval as unknown as jest.Mock;

describe('Stopwatch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    jest.spyOn(React, 'useState').mockReturnValueOnce([65, jest.fn()]);

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
    const mockSetIsPlaying = jest.fn();
    mockUseSessionStore
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockSetIsPlaying); // isPlaying, setIsPlaying

    render(<Stopwatch />);
    await user.click(screen.getByRole('button', { name: /play button/i }));
    expect(mockSetIsPlaying).toHaveBeenCalledWith(true);
  });

  it('handles stop click', async () => {
    const user = userEvent.setup();
    const mockSetTime = jest.fn();
    mockUseSessionStore.mockReturnValue(false);

    // Mock useState
    jest.spyOn(React, 'useState').mockReturnValueOnce([10, mockSetTime]);

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

    jest.spyOn(React, 'useState').mockReturnValueOnce([1, jest.fn()]);

    render(<Stopwatch />);
    expect(
      screen.getByRole('button', { name: /stop button/i })
    ).not.toBeDisabled();
  });
});
