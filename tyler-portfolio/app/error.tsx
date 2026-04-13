"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center gap-6">
      <h2 className="display-md text-[var(--text-primary)]">Something went wrong</h2>
      <p className="body-md text-[var(--text-muted)]">
        Please try again. If the problem persists, refresh the page.
      </p>
      <button
        type="button"
        className="rounded-[2px] border border-[var(--border-line)] bg-[var(--bg-secondary)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
