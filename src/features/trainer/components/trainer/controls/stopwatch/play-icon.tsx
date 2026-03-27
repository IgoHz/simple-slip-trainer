import { SVGProps, memo } from 'react';

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    width="1rem"
    height="1rem"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4 3h2v10H4zM6 4h2v8H6zM8 5h2v6H8zM10 6h2v4h-2z"
    />
  </svg>
);

export default memo(PlayIcon);
