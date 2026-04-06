import { SVGProps, memo } from 'react';

const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    shapeRendering="crispEdges"
    {...props}
  >
    <path fill="currentColor" d="M3 7h2v2H3zM7 7h2v2H7zM11 7h2v2h-2z" />
  </svg>
);

export default memo(LoadingIcon);
