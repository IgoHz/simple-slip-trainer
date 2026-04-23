import { SVGProps, memo } from 'react';

const ExpandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    shapeRendering="crispEdges"
    aria-hidden
    {...props}
  >
    <path
      fill="currentColor"
      d="M4 6h2v2H4zM6 8h2v2H6zM8 8h2v2H8zM10 6h2v2h-2z"
    />
  </svg>
);

export default memo(ExpandIcon);
