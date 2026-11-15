import { JSX, memo } from 'react';

const iconStrategies = {
  play: playStrategy,
  pause: pauseStrategy,
  stop: stopStrategy,
  expand: expandStrategy,
  collapse: collapseStrategy,
  loading: loadingDotsStrategy,
  menu: menuStrategy,
  close: closeStrategy,
  plus: plusStrategy,
  trash: trashStrategy,
  edit: editStrategy,
  arrowUp: arrowUpStrategy,
  arrowDown: arrowDownStrategy,
  reset: resetStrategy
} as const;

export type IconName = keyof typeof iconStrategies;

export type IconProps = Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> & {
  iconName: IconName;
};

function Icon(props: IconProps): JSX.Element {
  const { iconName, ...rest } = props;

  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="text-base"
      aria-hidden
      {...rest}
    >
      {iconStrategies[iconName]()}
    </svg>
  );
}

function playStrategy() {
  return (
    <>
      <rect x="4" y="3" width="2" height="10" />
      <rect x="6" y="4" width="2" height="8" />
      <rect x="8" y="5" width="2" height="6" />
      <rect x="10" y="6" width="2" height="4" />
    </>
  );
}

function pauseStrategy() {
  return (
    <>
      <rect x="4" y="3" width="3" height="10" />
      <rect x="9" y="3" width="3" height="10" />
    </>
  );
}

function stopStrategy() {
  return <rect x="4" y="4" width="8" height="8" />;
}

function expandStrategy() {
  return (
    <>
      <rect x="4" y="6" width="2" height="2" />
      <rect x="6" y="8" width="2" height="2" />
      <rect x="8" y="8" width="2" height="2" />
      <rect x="10" y="6" width="2" height="2" />
    </>
  );
}

function collapseStrategy() {
  return (
    <>
      <rect x="4" y="8" width="2" height="2" />
      <rect x="6" y="6" width="2" height="2" />
      <rect x="8" y="6" width="2" height="2" />
      <rect x="10" y="8" width="2" height="2" />
    </>
  );
}

function loadingDotsStrategy() {
  return (
    <>
      <rect x="3" y="7" width="2" height="2" />
      <rect x="7" y="7" width="2" height="2" />
      <rect x="11" y="7" width="2" height="2" />
    </>
  );
}

function menuStrategy() {
  return (
    <>
      <rect x="2" y="3" width="12" height="2" />
      <rect x="2" y="7" width="12" height="2" />
      <rect x="2" y="11" width="12" height="2" />
    </>
  );
}

function closeStrategy() {
  return (
    <>
      <rect x="3" y="3" width="2" height="2" />
      <rect x="5" y="5" width="2" height="2" />
      <rect x="7" y="7" width="2" height="2" />
      <rect x="9" y="5" width="2" height="2" />
      <rect x="11" y="3" width="2" height="2" />
      <rect x="5" y="9" width="2" height="2" />
      <rect x="3" y="11" width="2" height="2" />
      <rect x="9" y="9" width="2" height="2" />
      <rect x="11" y="11" width="2" height="2" />
    </>
  );
}

function plusStrategy() {
  return (
    <>
      <rect x="7" y="2" width="2" height="12" />
      <rect x="2" y="7" width="12" height="2" />
    </>
  );
}

function trashStrategy() {
  return (
    <>
      <rect x="5" y="1" width="6" height="2" />
      <rect x="2" y="3" width="12" height="2" />
      <rect x="3" y="5" width="2" height="9" />
      <rect x="11" y="5" width="2" height="9" />
      <rect x="5" y="12" width="6" height="2" />
      <rect x="6" y="6" width="1" height="5" />
      <rect x="9" y="6" width="1" height="5" />
    </>
  );
}

function editStrategy() {
  return (
    <>
      <rect x="11" y="2" width="3" height="3" />
      <rect x="9" y="4" width="3" height="3" />
      <rect x="7" y="6" width="3" height="3" />
      <rect x="5" y="8" width="3" height="3" />
      <rect x="3" y="10" width="3" height="3" />
      <rect x="2" y="12" width="2" height="2" />
    </>
  );
}

function arrowUpStrategy() {
  return (
    <>
      <rect x="7" y="2" width="2" height="2" />
      <rect x="5" y="4" width="6" height="2" />
      <rect x="3" y="6" width="10" height="2" />
      <rect x="7" y="8" width="2" height="6" />
    </>
  );
}

function arrowDownStrategy() {
  return (
    <>
      <rect x="7" y="2" width="2" height="6" />
      <rect x="3" y="8" width="10" height="2" />
      <rect x="5" y="10" width="6" height="2" />
      <rect x="7" y="12" width="2" height="2" />
    </>
  );
}

function resetStrategy() {
  return (
    <>
      <rect x="3" y="2" width="7" height="2" />
      <rect x="2" y="3" width="2" height="6" />
      <rect x="3" y="9" width="10" height="2" />
      <rect x="12" y="5" width="2" height="5" />
      <rect x="10" y="3" width="2" height="3" />
      <rect x="8" y="5" width="2" height="2" />
    </>
  );
}

export default memo(Icon);
