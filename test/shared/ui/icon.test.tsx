import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon, IconName } from '@/shared/ui';

describe('Icon', () => {
  const allIcons: IconName[] = [
    'play',
    'pause',
    'stop',
    'expand',
    'collapse',
    'loading',
    'menu',
    'close',
    'plus',
    'trash',
    'edit',
    'arrowUp',
    'arrowDown',
    'arrowRight',
    'arrowLeft',
    'hookLeft',
    'hookRight',
    'reset'
  ];

  it.each(allIcons)('renders %s icon as crispEdges SVG', (iconName) => {
    const { container } = render(<Icon iconName={iconName} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
    expect(svg).toHaveAttribute('shape-rendering', 'crispEdges');
    expect(svg?.querySelectorAll('rect').length).toBeGreaterThan(0);
  });
});
