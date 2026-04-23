import { SVGProps, memo } from 'react';

const StopIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    width="1rem"
    height="1rem"
    aria-hidden
    {...props}
  >
    <path fill="currentColor" d="M3 3h10v10H3z" />
  </svg>
);

export default memo(StopIcon);
