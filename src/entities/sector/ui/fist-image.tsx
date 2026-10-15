import { CSSProperties, memo } from 'react';
import Image from 'next/image';

export interface FistImageProps {
  className?: string;
  style?: CSSProperties;
}

function FistImage({ className, style }: FistImageProps) {
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
