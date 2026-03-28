import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC, MARKET_NAME } from "@/lib/constants/branding";
import clsx from "clsx";

type LogoProps = {
  /** `default` for light backgrounds; `footer` for dark footer. */
  variant?: "default" | "footer";
  className?: string;
  onNavigate?: () => void;
};

export default function Logo({ variant = "default", className, onNavigate }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${MARKET_NAME} home`}
      className={clsx(
        "group flex min-w-0 flex-shrink-0 items-center transition-opacity hover:opacity-95",
        className
      )}
    >
      <Image
        src={LOGO_SRC}
        alt=""
        width={280}
        height={280}
        priority={!isFooter}
        className={clsx(
          "w-auto object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]",
          isFooter
            ? "h-12 drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] sm:h-14"
            : "h-9 sm:h-10 md:h-11"
        )}
      />
    </Link>
  );
}

/** Standalone mark for empty states and inline branding. */
export function LogoMark({
  className,
  href,
}: {
  className?: string;
  /** If set, wraps the image in a link (e.g. `/`). */
  href?: string;
}) {
  const img = (
    <Image
      src={LOGO_SRC}
      alt={`${MARKET_NAME} logo`}
      width={256}
      height={256}
      className={clsx("h-16 w-auto object-contain sm:h-20", className)}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg" aria-label={`${MARKET_NAME} home`}>
        {img}
      </Link>
    );
  }

  return img;
}
