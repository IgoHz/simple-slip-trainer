import { render, screen } from '@testing-library/react';
import { Sectors } from '@/widgets/sectors';

describe('Sectors', () => {
  it('renders all 4 sector fist images', () => {
    render(<Sectors />);
    const images = screen.getAllByAltText('Fist image');
    expect(images).toHaveLength(4);
  });
});
