import { useEffect, useState } from 'react';
import Image from 'next/image';

type CustomImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
  [key: string]: unknown;
};

const CustomImage = ({ src, alt, width, height, fallbackSrc, ...rest }: CustomImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      placeholder={fallbackSrc ? 'blur' : 'empty'}
      blurDataURL={fallbackSrc}
      onError={() => setImageSrc(fallbackSrc || '')}
      {...rest}
    />
  );
};

export default CustomImage;
