"use client";

import { useState } from "react";
import { showToast } from "@/components/ui/Toast";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("Please fill in your name, email, and message.", { variant: "error" });
      return;
    }
    showToast("Thanks, we’ve received your message and will reply soon.", {
      variant: "success",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="c-name" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Your name
        </label>
        <input
          id="c-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal"
          placeholder="Full name"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="c-email" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Email
        </label>
        <input
          id="c-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="c-msg" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Message
        </label>
        <textarea
          id="c-msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full resize-y rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-sora text-sm font-bold text-white transition-colors hover:bg-teal-light sm:w-auto sm:px-8"
      >
        <Send size={16} />
        Send message
      </button>
    </form>
  );
}
