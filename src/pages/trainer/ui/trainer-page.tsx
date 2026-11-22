import clsx from 'clsx';
import { Copyright } from '@/shared/ui';
import { Controls } from '@/widgets/controls';
import { Sectors } from '@/widgets/sectors';
import { ThemeProvider } from '@/app/theme-provider';

export default function TrainerPage() {
  return (
    <ThemeProvider>
      <div
        className={clsx(
          'grid grid-rows-[auto_1fr_auto]',
          'h-screen supports-[height:100svh]:h-svh',
          'border-2 border-theme-border'
        )}
      >
        <header className="bg-theme-header">
          <Controls />
        </header>
        <main className="grid grid-rows-[subgrid]">
          <Sectors />
        </main>
        <footer className="bg-theme-footer max-[960px]:landscape:hidden">
          <Copyright />
        </footer>
      </div>
    </ThemeProvider>
  );
}
