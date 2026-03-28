import { REGISTRATION_ID } from "@/lib/constants/branding";

/**
 * Course / submission details for the Contact page.
 * Edit `fullName` if your instructor expects your legal name on file.
 */
export const SITE_STUDENT = {
  fullName: "Muhammad Abdullah",
  registrationNumber: REGISTRATION_ID,
  course: "CSC417: E-Commerce & Digital Marketing",
  semester: "Spring 2026",
} as const;

export const SITE_CONTACT = {
  email: "hello@galimart.pk",
  phone: "+92 300 0000000",
  address: "F-7 Markaz · Islamabad, Pakistan",
} as const;
