import Image from "next/image";
import clsx from "clsx";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  /** e.g. "96px" for cart thumbs */
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
  sizes,
  priority,
}: ProductImageProps) {
  const common = "object-cover bg-midgrey/30";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={clsx(common, className)}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={clsx(common, className)}
      sizes={sizes}
      priority={priority}
    />
  );
}
