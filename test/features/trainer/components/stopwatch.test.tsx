import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Stopwatch from '@/features/trainer/components/controls/stopwatch';
import { useControlsStore } from '@/features/trainer/store/controls';
import { useInterval } from '@/hooks/useInterval';

jest.mock('@/features/trainer/store/controls', () => ({
  useControlsStore: jest.fn(),
  isPlayingSelector: jest.fn(),
  setIsPlayingSelector: jest.fn()
}));

jest.mock('@/hooks/useInterval', () => ({
  useInterval: jest.fn()
}));

const mockUseControlsStore = useControlsStore as unknown as jest.Mock;
const mockUseInterval = useInterval as unknown as jest.Mock;

describe('Stopwatch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders time label and display', () => {
    mockUseControlsStore.mockReturnValue(false); // isPlaying

    render(<Stopwatch />);
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('displays formatted time', () => {
    mockUseControlsStore.mockReturnValue(false);

    // Mock useState to have time = 65 (1:05)
    jest.spyOn(React, 'useState').mockReturnValueOnce([65, jest.fn()]);

    render(<Stopwatch />);
    expect(screen.getByText('01:05')).toBeInTheDocument();
  });

  it('calls useInterval with correct params', () => {
    mockUseControlsStore.mockReturnValue(true); // isPlaying

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
    mockUseControlsStore
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockSetIsPlaying); // isPlaying, setIsPlaying

    render(<Stopwatch />);
    await user.click(screen.getByRole('button', { name: /play button/i }));
    expect(mockSetIsPlaying).toHaveBeenCalledWith(true);
  });

  it('handles stop click', async () => {
    const user = userEvent.setup();
    const mockSetTime = jest.fn();
    mockUseControlsStore.mockReturnValue(false);

    // Mock useState
    jest.spyOn(React, 'useState').mockReturnValueOnce([10, mockSetTime]);

    render(<Stopwatch />);
    await user.click(screen.getByRole('button', { name: /stop button/i }));
    expect(mockSetTime).toHaveBeenCalledWith(0);
  });

  it('disables stop button when time is 0', () => {
    mockUseControlsStore.mockReturnValue(false);

    render(<Stopwatch />);
    expect(screen.getByRole('button', { name: /stop button/i })).toBeDisabled();
  });

  it('enables stop button when time > 0', () => {
    mockUseControlsStore.mockReturnValue(false);

    jest.spyOn(React, 'useState').mockReturnValueOnce([1, jest.fn()]);

    render(<Stopwatch />);
    expect(
      screen.getByRole('button', { name: /stop button/i })
    ).not.toBeDisabled();
  });
});
