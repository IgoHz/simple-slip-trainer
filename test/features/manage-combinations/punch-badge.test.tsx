import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PunchType, SectorPosition } from '@/entities/sector';
import { PunchBadge } from '@/features/manage-combinations';

describe('PunchBadge', () => {
  it('renders straight punch with straight styling and indicator', () => {
    render(<PunchBadge punch={PunchType.LEFT_STRAIGHT} />);
    const badge = screen.getByText('LS').closest('[data-is-straight]');
    expect(badge).toHaveAttribute('data-is-straight', 'true');
    expect(badge).toHaveAttribute('data-punch-type', 'leftStraight');
  });

  it('renders hook punch with hook styling and indicator', () => {
    render(<PunchBadge punch={PunchType.RIGHT_HOOK} />);
    const badge = screen.getByText('RH').closest('[data-is-straight]');
    expect(badge).toHaveAttribute('data-is-straight', 'false');
    expect(badge).toHaveAttribute('data-punch-type', 'rightHook');
  });

  it('converts SectorPosition to PunchType accurately', () => {
    render(<PunchBadge punch={SectorPosition.UPPER_LEFT_STRAIGHT} />);
    const badge = screen.getByText('LS').closest('[data-is-straight]');
    expect(badge).toHaveAttribute('data-is-straight', 'true');
  });

  it('distinguishes higher and lower punch levels visually', () => {
    const { rerender } = render(
      <PunchBadge punch={SectorPosition.UPPER_LEFT_STRAIGHT} />
    );
    let badge = screen.getByText('LS').closest('[data-is-straight]');
    expect(badge).toHaveAttribute('data-level', 'upper');
    expect(badge).toHaveAttribute('data-is-upper', 'true');
    expect(screen.getByText('↑')).toBeInTheDocument();

    rerender(<PunchBadge punch={SectorPosition.LOWER_LEFT_STRAIGHT} />);
    badge = screen.getByText('LS').closest('[data-is-straight]');
    expect(badge).toHaveAttribute('data-level', 'lower');
    expect(badge).toHaveAttribute('data-is-lower', 'true');
    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  it('renders full label when compact is false', () => {
    render(
      <PunchBadge punch={SectorPosition.LOWER_RIGHT_STRAIGHT} compact={false} />
    );
    expect(screen.getByText('Lower Right Straight')).toBeInTheDocument();
  });
});
