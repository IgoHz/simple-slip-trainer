import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@/app/theme-provider';
import { THEME_STORAGE_KEY } from '@/shared/lib/theme';
import { ThemeToggle } from '@/widgets/controls/ui/theme-toggle';

function renderThemeToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('theme preference', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('defaults to dark when no preference is saved', async () => {
    renderThemeToggle();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Switch to light theme' })
      ).toBeInTheDocument();
    });
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('restores a saved light preference', async () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');

    renderThemeToggle();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Switch to dark theme' })
      ).toHaveAttribute('aria-pressed', 'true');
    });
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('switches themes immediately and persists the selection', async () => {
    renderThemeToggle();

    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to light theme' })
    );

    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('falls back to dark for an invalid stored preference', async () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'neon');

    renderThemeToggle();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Switch to light theme' })
      ).toBeInTheDocument();
    });
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
