import { CSSProperties, memo } from 'react';
import Image from 'next/image';

interface Props {
  className?: string;
  style?: CSSProperties;
}

function FistImage({ className, style }: Props) {
  return (
    <Image
      className={className}
      style={style}
      src="/fist.svg"
      alt="Fist image"
      width={1}
      height={1}
      loading="eager"
    />
  );
}

export default memo(FistImage);
