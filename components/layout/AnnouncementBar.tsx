import { ANNOUNCEMENT } from "@/lib/constants/copy";

export default function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-teal-dark via-teal to-teal-light px-4 py-2.5 text-center text-sm tracking-wide text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />
      <p className="relative font-medium">
        {ANNOUNCEMENT.lead}{" "}
        <span className="mx-1 text-white/50" aria-hidden>
          ·
        </span>
        Code{" "}
        <span className="rounded-md bg-white/15 px-2 py-0.5 font-sora font-bold text-gold-light">{ANNOUNCEMENT.code}</span>{" "}
        {ANNOUNCEMENT.tail}
      </p>
    </div>
  );
}
