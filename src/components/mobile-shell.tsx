import type { ReactNode } from "react";

/** Wraps the landing page in a phone-width column, centered on larger screens. */
export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto w-full max-w-[480px] bg-background pb-24">{children}</div>
    </div>
  );
}
