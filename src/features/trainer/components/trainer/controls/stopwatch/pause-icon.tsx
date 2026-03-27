import { SVGProps, memo } from 'react';

const PauseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    width="1rem"
    height="1rem"
    {...props}
  >
    <path fill="currentColor" d="M4 3h3v10H4zM9 3h3v10H9z" />
  </svg>
);

export default memo(PauseIcon);
