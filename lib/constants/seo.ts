import type { Metadata } from "next";
import { MARKET_NAME } from "./branding";
import { DEFAULT_SITE_DESCRIPTION } from "./copy";

export function pageTitle(segment: string): string {
  return `${segment} | ${MARKET_NAME}`;
}

export const rootMetadata: Metadata = {
  title: `${MARKET_NAME} | Fresh staples delivered`,
  description: DEFAULT_SITE_DESCRIPTION,
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};
