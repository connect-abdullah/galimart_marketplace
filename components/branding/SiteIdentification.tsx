import { SITE_IDENTIFICATION } from "@/lib/constants/branding";

type Props = {
  className?: string;
};

/** Required course / marketplace identification line. */
export default function SiteIdentification({ className }: Props) {
  return (
    <p className={className} data-site-identification>
      {SITE_IDENTIFICATION}
    </p>
  );
}
