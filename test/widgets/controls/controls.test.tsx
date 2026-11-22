import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controls } from '@/widgets/controls';
import { ThemeProvider } from '@/app/theme-provider';

function renderControls() {
  return render(
    <ThemeProvider>
      <Controls />
    </ThemeProvider>
  );
}

describe('Controls', () => {
  it('renders the application title', () => {
    renderControls();
    expect(
      screen.getByRole('heading', { name: /simple slip trainer/i })
    ).toBeInTheDocument();
  });

  it('renders expand button', () => {
    renderControls();
    expect(
      screen.getByRole('button', { name: /expand button/i })
    ).toBeInTheDocument();
  });

  it('renders stopwatch controls', () => {
    renderControls();
    expect(
      screen.getByRole('button', { name: /play button/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /stop button/i })
    ).toBeInTheDocument();
  });

  it('renders mode selector controls', () => {
    renderControls();
    expect(screen.getByText('Mode:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /random singles mode/i })
    ).toBeInTheDocument();
  });

  it('renders menu button for combination manager', () => {
    renderControls();
    expect(
      screen.getByRole('button', { name: /combination manager/i })
    ).toBeInTheDocument();
  });

  it('opens combination manager when menu button is clicked', async () => {
    const user = userEvent.setup();
    renderControls();

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
    renderControls();

    const expandBtn = screen.getByRole('button', { name: /expand button/i });
    await user.click(expandBtn);

    expect(
      screen.getByRole('button', { name: /collapse button/i })
    ).toBeInTheDocument();
  });

  it('renders the theme toggle in the controls menu', () => {
    renderControls();

    expect(
      screen.getByRole('button', { name: 'Switch to light theme' })
    ).toBeInTheDocument();
  });
});
