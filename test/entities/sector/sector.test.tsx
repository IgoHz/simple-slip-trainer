import { render, screen } from '@testing-library/react';
import { Sector, SectorPosition, SectorDisplayType } from '@/entities/sector';

describe('Sector', () => {
  it('renders sector with fist image and custom className', () => {
    const { container } = render(
      <Sector
        className="test-sector"
        position={SectorPosition.LEFT_UPPER}
        displayType={SectorDisplayType.ANIMATED}
        animationDuration="1s"
      />
    );
    expect(screen.getByAltText('Fist image')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('test-sector');
  });
});
