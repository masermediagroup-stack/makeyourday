"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

const KEY = "caddo-announcement-dismissed";

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(KEY) === "true";
  });

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-[var(--red-accent)] text-white">
      <div className="section-wrap flex items-center justify-between py-2 text-xs md:text-sm">
        <Link href="/memberships/coworking" className="font-medium">
          Get 10% off your first 3 months on any Coworking Membership
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            window.localStorage.setItem(KEY, "true");
            setHidden(true);
          }}
          className="rounded p-1 hover:bg-white/15"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
