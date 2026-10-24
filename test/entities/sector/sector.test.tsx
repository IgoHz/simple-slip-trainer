import { render, screen } from '@testing-library/react';
import {
  Sector,
  SectorPosition,
  SectorDisplayType,
  PunchType,
  getPunchType
} from '@/entities/sector';

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

  it('renders straight punch positions properly', () => {
    const { container } = render(
      <Sector
        className="straight-test-class"
        position={SectorPosition.UPPER_LEFT_STRAIGHT}
        displayType={SectorDisplayType.DEFAULT}
      />
    );
    expect(screen.getByAltText('Fist image')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('straight-test-class');
  });

  it('correctly maps SectorPosition to PunchType', () => {
    expect(getPunchType(SectorPosition.LEFT_UPPER)).toBe(PunchType.LEFT_HOOK);
    expect(getPunchType(SectorPosition.LEFT_LOWER)).toBe(PunchType.LEFT_HOOK);
    expect(getPunchType(SectorPosition.RIGHT_UPPER)).toBe(PunchType.RIGHT_HOOK);
    expect(getPunchType(SectorPosition.RIGHT_LOWER)).toBe(PunchType.RIGHT_HOOK);
    expect(getPunchType(SectorPosition.UPPER_LEFT_STRAIGHT)).toBe(
      PunchType.LEFT_STRAIGHT
    );
    expect(getPunchType(SectorPosition.LOWER_LEFT_STRAIGHT)).toBe(
      PunchType.LEFT_STRAIGHT
    );
    expect(getPunchType(SectorPosition.UPPER_RIGHT_STRAIGHT)).toBe(
      PunchType.RIGHT_STRAIGHT
    );
    expect(getPunchType(SectorPosition.LOWER_RIGHT_STRAIGHT)).toBe(
      PunchType.RIGHT_STRAIGHT
    );
  });
});
