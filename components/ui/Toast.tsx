"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { CheckCircle2, X, AlertCircle, Info } from "lucide-react";
import clsx from "clsx";

export type ToastVariant = "success" | "error" | "info";

export interface ShowToastOptions {
  variant?: ToastVariant;
  /** ms; omit to use default per variant */
  duration?: number;
}

interface ToastCtx {
  show: (msg: string, options?: ShowToastOptions) => void;
}

const Ctx = createContext<ToastCtx>({ show: () => {} });

export function useToast() {
  return useContext(Ctx);
}

let _show: ((msg: string, options?: ShowToastOptions) => void) | null = null;

export function showToast(msg: string, options?: ShowToastOptions) {
  _show?.(msg, options);
}

const DEFAULT_DURATION: Record<ToastVariant, number> = {
  success: 3200,
  error: 4500,
  info: 3500,
};

const variantStyles: Record<
  ToastVariant,
  { bar: string; icon: typeof CheckCircle2 }
> = {
  success: {
    bar: "bg-teal-dark text-white shadow-lg shadow-teal/25",
    icon: CheckCircle2,
  },
  error: {
    bar: "bg-red-700 text-white shadow-lg shadow-red-900/20",
    icon: AlertCircle,
  },
  info: {
    bar: "bg-[#1e293b] text-white shadow-lg shadow-slate-900/25",
    icon: Info,
  },
};

export default function Toast() {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<ToastVariant>("success");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHide = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const hide = useCallback(() => {
    clearHide();
    setVisible(false);
  }, [clearHide]);

  const show = useCallback(
    (m: string, options?: ShowToastOptions) => {
      clearHide();
      const v = options?.variant ?? "success";
      setVariant(v);
      setMsg(m);
      setVisible(true);
      const ms = options?.duration ?? DEFAULT_DURATION[v];
      hideTimer.current = setTimeout(() => setVisible(false), ms);
    },
    [clearHide]
  );

  useEffect(() => {
    _show = show;
    return () => {
      _show = null;
      clearHide();
    };
  }, [show, clearHide]);

  const { bar, icon: Icon } = variantStyles[variant];

  return (
    <div
      className="fixed bottom-6 right-6 z-[999] flex max-w-[min(100vw-2rem,22rem)] flex-col items-end gap-2 pointer-events-none sm:bottom-8 sm:right-8"
      aria-live="polite"
    >
      <div
        role="status"
        className={clsx(
          "pointer-events-auto flex w-full items-start gap-3 rounded-xl px-4 py-3.5 text-sm font-medium leading-snug font-dm transition-all duration-300 ease-out motion-reduce:transition-none",
          bar,
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "pointer-events-none translate-y-3 opacity-0 scale-[0.98]"
        )}
      >
        <Icon
          className="mt-0.5 h-5 w-5 flex-shrink-0 opacity-95"
          strokeWidth={2}
          aria-hidden
        />
        <p className="min-w-0 flex-1 pt-0.5">{msg}</p>
        <button
          type="button"
          onClick={hide}
          className="-m-1 -mr-0.5 flex-shrink-0 rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
