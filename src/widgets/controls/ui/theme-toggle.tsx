'use client';

import { Button, Icon } from '@/shared/ui';
import { useTheme } from '@/app/theme-provider';

export interface ThemeToggleProps {
  className?: string;
  labelClassName?: string;
}

export function ThemeToggle({ className, labelClassName }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <div className={className}>
      <Button
        aria-label={`Switch to ${nextTheme} theme`}
        aria-pressed={theme === 'light'}
        title={`Current theme: ${theme}. Switch to ${nextTheme} theme`}
        icon={<Icon iconName={theme === 'dark' ? 'sun' : 'moon'} />}
        onClick={toggleTheme}
      />
      <span className={labelClassName}>Theme: {theme}</span>
    </div>
  );
}
