import { memo } from "react";
import Image from 'next/image';

interface Props {
  className?: string;
}

function FistImage({ className }: Props) {
  return (
    <Image
        className={className}
        src="/fist.svg"
        alt="Fist image"
        width={100}
        height={100}
        loading="eager"
         />
  );
}

export default memo(FistImage);