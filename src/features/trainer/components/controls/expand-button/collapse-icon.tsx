import { SVGProps, memo } from 'react';

const CollapseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    shapeRendering="crispEdges"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4 8h2v2H4zM6 6h2v2H6zM8 6h2v2H8zM10 8h2v2h-2z"
    />
  </svg>
);

export default memo(CollapseIcon);
