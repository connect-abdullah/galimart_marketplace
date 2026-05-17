import { readFileSync } from "fs";
import { join } from "path";

/** Your marketing HTML template (logo: cid:galimartlogo inline attachment). */
export function getGaliMartMarketingEmailHtml(): string {
  return readFileSync(join(process.cwd(), "components/email/galimart-marketing.html"), "utf8");
}
