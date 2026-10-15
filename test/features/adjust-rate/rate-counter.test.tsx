import { render, screen, fireEvent } from '@testing-library/react';
import { RateCounter } from '@/features/adjust-rate';
import * as sessionModule from '@/entities/session';
import * as sharedLibModule from '@/shared/lib';

const RATE_COUNTER_MIN_VALUE = 60;
const RATE_COUNTER_AMPLIFIER_VALUE = 5;

jest.mock('@/entities/session', () => {
  const actual = jest.requireActual('@/entities/session');
  return {
    ...actual,
    useSessionStore: jest.fn(),
    useControlsStore: jest.fn(),
    rateSelector: jest.fn((state) => state.rate),
    isPlayingSelector: jest.fn((state) => state.isPlaying),
    setRateSelector: jest.fn((state) => state.setRate)
  };
});

jest.mock('@/shared/lib', () => {
  const actual = jest.requireActual('@/shared/lib');
  return {
    ...actual,
    useStoreAsync: jest.fn()
  };
});

function setup({ rate = 5, isPlaying = false, isRateLoading = false } = {}) {
  const setRate = jest.fn();
  (sessionModule.useSessionStore as unknown as jest.Mock).mockImplementation(
    (selector) => {
      if (selector === sessionModule.isPlayingSelector) return isPlaying;
      if (selector === sessionModule.setRateSelector) return setRate;
      return undefined;
    }
  );
  (sharedLibModule.useStoreAsync as jest.Mock).mockImplementation(() => {
    if (isRateLoading) return undefined;
    return rate;
  });
  return { setRate };
}

describe('RateCounter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial value', () => {
    setup({ rate: 10 });
    render(<RateCounter />);
    expect(screen.getByLabelText(/rate counter input/i)).toHaveValue('10');
  });

  it('disables decrement button at min value', () => {
    setup({ rate: RATE_COUNTER_MIN_VALUE });
    render(<RateCounter />);
    expect(screen.getByText(`-${RATE_COUNTER_AMPLIFIER_VALUE}`)).toBeDisabled();
  });

  it('calls setRate on increment', () => {
    const { setRate } = setup({ rate: 10 });
    render(<RateCounter />);
    fireEvent.click(screen.getByText(`+${RATE_COUNTER_AMPLIFIER_VALUE}`));
    expect(setRate).toHaveBeenCalledWith(15);
  });

  it('does not call setRate on decrement if rate is undefined', () => {
    const { setRate } = setup({ isRateLoading: true });
    render(<RateCounter />);
    fireEvent.click(screen.getByText(`-${RATE_COUNTER_AMPLIFIER_VALUE}`));
    expect(setRate).not.toHaveBeenCalled();
  });

  it('does not call setRate on non-numeric input', () => {
    const { setRate } = setup({ rate: 5 });
    render(<RateCounter />);
    fireEvent.change(screen.getByLabelText(/rate counter input/i), {
      target: { value: 'abc' }
    });
    expect(setRate).not.toHaveBeenCalled();
  });

  it('calls setRate on valid input', () => {
    const { setRate } = setup({ rate: 5 });
    render(<RateCounter />);
    fireEvent.change(screen.getByLabelText(/rate counter input/i), {
      target: { value: '8' }
    });
    expect(setRate).toHaveBeenCalledWith(8);
  });

  it('calls setRate to min value on blur if below min', () => {
    const { setRate } = setup({ rate: 0 });
    render(<RateCounter />);
    fireEvent.blur(screen.getByLabelText(/rate counter input/i));
    expect(setRate).toHaveBeenCalledWith(RATE_COUNTER_MIN_VALUE);
  });

  it('disables input and buttons when isPlaying', () => {
    setup({ isPlaying: true });
    render(<RateCounter />);
    expect(screen.getByLabelText(/rate counter input/i)).toBeDisabled();
    expect(screen.getByText(`+${RATE_COUNTER_AMPLIFIER_VALUE}`)).toBeDisabled();
    expect(screen.getByText(`-${RATE_COUNTER_AMPLIFIER_VALUE}`)).toBeDisabled();
  });

  it('shows loading state when rate is undefined', () => {
    setup({ isRateLoading: true });
    render(<RateCounter />);
    expect(screen.getByTestId('input-skeleton')).toBeInTheDocument();
  });
});
