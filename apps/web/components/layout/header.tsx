"use client";

import * as React from "react";
import Link from "next/link";
import { GraduationCap, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

/* ==============================================================================
   HEADER COMPONENT (Phase 1, Step 3A)
   Notice: In Step 3A, the verification harness remains active on '/'.
   To prevent fragment navigation or scroll jump to nonexistent anchors,
   future-section navigation items are rendered as non-interactive disabled
   controls. Target anchor destinations (#classes, #subjects, #question-bank,
   #formula-library, #notices) will be activated in Step 3B with the Homepage.
   ============================================================================== */

interface HeaderNavLink {
  label: string;
  targetAnchor: string; // Intended Step 3B destination
}

const NAV_LINKS: HeaderNavLink[] = [
  { label: "শ্রেণি", targetAnchor: "#classes" },
  { label: "বিষয়", targetAnchor: "#subjects" },
  { label: "প্রশ্নব্যাংক", targetAnchor: "#question-bank" },
  { label: "সূত্র সংকলন", targetAnchor: "#formula-library" },
  { label: "নোটিশ", targetAnchor: "#notices" },
];

const STEP_3B_NOTICE = "হোমপেজ বাস্তবায়নের সময় (Step 3B) এই সেকশন কার্যকর হবে";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Emblem (Active Home Link) */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="ClassOrbit হোমপেজ"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground leading-none">
                ClassOrbit
              </span>
              <span className="text-[10px] font-medium text-muted-foreground leading-tight mt-0.5">
                ডিজিটাল শিক্ষামাধ্যম
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Non-interactive disabled buttons during Step 3A) */}
          <nav
            aria-label="প্রধান সাইট নেভিগেশন"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.targetAnchor + link.label}
                type="button"
                disabled
                aria-disabled="true"
                title={STEP_3B_NOTICE}
                className="rounded-md px-3 py-1.5 text-muted-foreground/80 cursor-default transition-colors focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Visual Search Trigger Button (Non-interactive disabled button during Step 3A) */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="অনুসন্ধান ফিচার হোমপেজ বাস্তবায়নের সময় (Step 3B) কার্যকর হবে"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background/80 px-3 text-xs text-muted-foreground/80 transition-colors focus:outline-none cursor-default"
            aria-label="অনুসন্ধান করুন (Step 3B-তে উপলব্ধ হবে)"
          >
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline">অনুসন্ধান করুন...</span>
            <kbd className="hidden md:inline-flex h-4 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
              /
            </kbd>
          </button>

          {/* Theme Switcher Toggle */}
          <div className="hidden sm:flex">
            <ThemeToggle />
          </div>

          {/* Student Login Placeholder (PRD Phase 3 - Accessible Non-Functional Indicator) */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex h-9 text-xs text-muted-foreground opacity-80 cursor-not-allowed"
            aria-disabled="true"
            title="লগইন ফিচার পরবর্তী ধাপে (Phase 3) যুক্ত হবে"
          >
            লগইন
          </Button>

          {/* Mobile Drawer Trigger (Sheet) */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
