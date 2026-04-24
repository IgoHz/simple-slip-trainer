import { JSX, memo } from 'react';
import styles from './icon.module.css';

const iconStrategies = {
  play: playStrategy,
  pause: pauseStrategy,
  stop: stopStrategy,
  expand: expandStrategy,
  collapse: collapseStrategy,
  loading: loadingDotsStrategy
} as const;

type IconName = keyof typeof iconStrategies;

type Props = Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  iconName: IconName;
};

function Icon(props: Props): JSX.Element {
  const { iconName, ...rest } = props;

  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={styles.icon}
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

export default memo(Icon);
