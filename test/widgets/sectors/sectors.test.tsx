import { render, screen } from '@testing-library/react';
import { Sectors } from '@/widgets/sectors';

describe('Sectors', () => {
  it('renders all 8 punch fist images (4 hooks and 4 straights)', () => {
    render(<Sectors />);
    const images = screen.getAllByAltText('Fist image');
    expect(images).toHaveLength(8);
  });
});
