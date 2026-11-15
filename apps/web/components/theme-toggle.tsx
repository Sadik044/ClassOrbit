"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Exact-dimension layout skeleton (106px x 40px) to eliminate CLS and prevent SSR hydration mismatch
    return (
      <div
        className="inline-flex h-10 w-[106px] items-center rounded-lg border border-border bg-muted/40 p-1 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      role="group"
      aria-label="থিম নির্বাচন করুন"
      className="inline-flex h-10 w-[106px] items-center rounded-lg border border-border bg-muted/50 p-1"
    >
      <button
        type="button"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
        className={`inline-flex h-7 w-8 items-center justify-center rounded-md text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background ${
          theme === "light"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        title="লাইট মোড"
      >
        <Sun className="h-3.5 w-3.5" />
        <span className="sr-only">লাইট মোড</span>
      </button>

      <button
        type="button"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
        className={`inline-flex h-7 w-8 items-center justify-center rounded-md text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background ${
          theme === "dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        title="ডার্ক মোড"
      >
        <Moon className="h-3.5 w-3.5" />
        <span className="sr-only">ডার্ক মোড</span>
      </button>

      <button
        type="button"
        aria-pressed={theme === "system"}
        onClick={() => setTheme("system")}
        className={`inline-flex h-7 w-8 items-center justify-center rounded-md text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background ${
          theme === "system"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        title="সিস্টেম ডিফল্ট"
      >
        <Monitor className="h-3.5 w-3.5" />
        <span className="sr-only">সিস্টেম ডিফল্ট</span>
      </button>
    </div>
  );
}
