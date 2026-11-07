import { render, screen, fireEvent } from '@testing-library/react';
import { ModeSelector } from '@/features/select-mode';
import * as sessionModule from '@/entities/session';
import { TrainingMode } from '@/entities/session';
import * as sharedLibModule from '@/shared/lib';
import { vi, type Mock } from 'vitest';

vi.mock('@/entities/session', async () => {
  const actual = await vi.importActual('@/entities/session');
  return {
    ...actual,
    useSessionStore: vi.fn(),
    modeSelector: vi.fn((state) => state.mode),
    setModeSelector: vi.fn((state) => state.setMode)
  };
});

vi.mock('@/shared/lib', async () => {
  const actual = await vi.importActual('@/shared/lib');
  return {
    ...actual,
    useStoreAsync: vi.fn()
  };
});

function setup({ mode = TrainingMode.RANDOM_SINGLES } = {}) {
  const setMode = vi.fn();
  (sessionModule.useSessionStore as unknown as Mock).mockImplementation(
    (selector) => {
      if (selector === sessionModule.setModeSelector) return setMode;
      return undefined;
    }
  );
  (sharedLibModule.useStoreAsync as Mock).mockReturnValue(mode);
  return { setMode };
}

describe('ModeSelector', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders all three mode buttons', () => {
    setup();
    render(<ModeSelector />);

    expect(screen.getByText('Mode:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /random singles mode/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /combinations mode/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /mixed mode/i })
    ).toBeInTheDocument();
  });

  it('highlights the active mode button', () => {
    setup({ mode: TrainingMode.COMBINATIONS });
    render(<ModeSelector />);

    const comboBtn = screen.getByRole('button', {
      name: /combinations mode/i
    });
    const singlesBtn = screen.getByRole('button', {
      name: /random singles mode/i
    });

    expect(comboBtn).toHaveAttribute('aria-pressed', 'true');
    expect(singlesBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls setMode when a mode button is clicked', () => {
    const { setMode } = setup({ mode: TrainingMode.RANDOM_SINGLES });
    render(<ModeSelector />);

    const comboBtn = screen.getByRole('button', {
      name: /combinations mode/i
    });
    fireEvent.click(comboBtn);

    expect(setMode).toHaveBeenCalledWith(TrainingMode.COMBINATIONS);
  });
});
