import type { Metadata } from "next";
import Link from "next/link";
import { SITE_STUDENT, SITE_CONTACT } from "@/lib/site";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone, GraduationCap, Hash } from "lucide-react";
import { MARKET_NAME } from "@/lib/constants/branding";
import { pageTitle } from "@/lib/constants/seo";
import SiteIdentification from "@/components/branding/SiteIdentification";

export const metadata: Metadata = {
  title: pageTitle("Contact"),
  description: `Reach ${MARKET_NAME}: course submission and customer contact details.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-[60vh]">
      <div className="border-b border-border bg-lightgrey/60">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-teal">
              Home
            </Link>
            {" › "}
            <span className="text-gray-700">Contact</span>
          </div>
          <h1 className="font-sora text-2xl font-bold text-gray-900 md:text-3xl">Contact us</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
            Store enquiries, delivery questions, or course project details: use the form or the channels below.
          </p>
          <div className="mt-6 rounded-xl border border-teal/20 bg-teal/[0.06] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal">Marketplace identification</p>
            <SiteIdentification className="mt-1 font-mono text-sm font-semibold text-gray-900" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_380px]">
        <section className="rounded-2xl border border-border bg-offwhite p-6 shadow-sm md:p-8">
          <h2 className="font-sora text-lg font-bold text-gray-900">Send a message</h2>
          <p className="mt-1 text-sm text-gray-500">
            Demo form: on-screen confirmation only (no backend in this prototype).
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border-2 border-teal/25 bg-gradient-to-br from-teal/[0.06] to-offwhite p-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal">
              <GraduationCap size={14} aria-hidden />
              Course submission
            </div>
            <h2 className="font-sora text-lg font-bold text-gray-900">Student details</h2>
            <p className="mt-3 text-sm text-gray-600">
              As required for <span className="font-medium text-gray-800">{SITE_STUDENT.course}</span> ({SITE_STUDENT.semester}
              ).
            </p>
            <dl className="mt-5 space-y-4 border-t border-border pt-5">
              <div>
                <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <Hash size={12} className="text-teal" aria-hidden />
                  Full name
                </dt>
                <dd className="mt-1 font-sora text-base font-semibold text-gray-900">{SITE_STUDENT.fullName}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <Hash size={12} className="text-teal" aria-hidden />
                  Registration number
                </dt>
                <dd className="mt-1 font-mono text-base font-bold tracking-wide text-teal-dark">
                  {SITE_STUDENT.registrationNumber}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-offwhite p-6 shadow-sm">
            <h2 className="font-sora text-sm font-bold uppercase tracking-wider text-gray-500">{MARKET_NAME}</h2>
            <ul className="mt-4 space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal" aria-hidden />
                <span>{SITE_CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-teal" aria-hidden />
                <a href={`tel:${SITE_CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-teal">
                  {SITE_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-teal" aria-hidden />
                <a href={`mailto:${SITE_CONTACT.email}`} className="hover:text-teal">
                  {SITE_CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
