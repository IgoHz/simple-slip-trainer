import { render, screen } from '@testing-library/react';
import { FistImage } from '@/entities/sector';

describe('FistImage', () => {
  it('renders Image with correct props', () => {
    render(<FistImage className="test-class" style={{ color: 'red' }} />);
    const img = screen.getByAltText('Fist image');
    expect(img).toHaveClass('test-class');
    expect(img).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(img).toHaveAttribute('src', expect.stringContaining('fist.svg'));
  });
});
