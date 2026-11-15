"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  GraduationCap,
  BookOpen,
  Layers,
  HelpCircle,
  Bell,
  Sparkles,
  Info,
} from "lucide-react";

/* ==============================================================================
   MOBILE NAVIGATION DRAWER (Phase 1, Step 3A)
   Notice: In Step 3A, the verification harness remains active on '/'.
   To prevent fragment navigation or scroll jump to nonexistent anchors,
   future-section navigation items are rendered as non-interactive disabled
   labels. Target anchor destinations (#classes, #subjects, #question-bank,
   #formula-library, #notices) will be activated in Step 3B with the Homepage.
   ============================================================================== */

interface NavItem {
  label: string;
  targetAnchor: string; // Intended destination for Step 3B
  isHome?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "হোম (Home)", targetAnchor: "/", isHome: true, icon: BookOpen },
  { label: "শ্রেণি ব্রাউজ (Classes)", targetAnchor: "#classes", icon: GraduationCap },
  { label: "জনপ্রিয় বিষয়সমূহ (Subjects)", targetAnchor: "#subjects", icon: Layers },
  { label: "প্রশ্নব্যাংক (Question Bank)", targetAnchor: "#question-bank", icon: HelpCircle },
  { label: "সূত্র সংকলন (Formula Library)", targetAnchor: "#formula-library", icon: Sparkles },
  { label: "নোটিশ বোর্ড (Notices)", targetAnchor: "#notices", icon: Bell },
];

const CLASS_LINKS = [
  { grade: "৬ষ্ঠ শ্রেণি", targetAnchor: "#classes", stage: "নিম্ন মাধ্যমিক" },
  { grade: "৭ম শ্রেণি", targetAnchor: "#classes", stage: "নিম্ন মাধ্যমিক" },
  { grade: "৮ম শ্রেণি", targetAnchor: "#classes", stage: "নিম্ন মাধ্যমিক" },
  { grade: "৯ম শ্রেণি", targetAnchor: "#classes", stage: "মাধ্যমিক" },
  { grade: "১০ম শ্রেণি", targetAnchor: "#classes", stage: "মাধ্যমিক" },
];

const STEP_3B_NOTICE = "হোমপেজ বাস্তবায়নের সময় (Step 3B) এই সেকশন কার্যকর হবে";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-foreground hover:bg-muted"
          aria-label="মোবাইল মেনু খুলুন"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">মোবাইল মেনু</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 flex flex-col justify-between">
        <div className="overflow-y-auto px-6 py-6 space-y-6">
          {/* Drawer Header Brand */}
          <SheetHeader className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <SheetTitle className="text-heading-h4 font-bold text-foreground">
                ClassOrbit
              </SheetTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              ডিজিটাল শিক্ষামাধ্যম • ৬ষ্ঠ–১০ম শ্রেণি
            </p>
          </SheetHeader>

          <Separator />

          {/* Primary Navigation Items */}
          <nav aria-label="মোবাইল প্রধান নেভিগেশন" className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-2">
              প্রধান মেনু
            </span>
            <div className="mt-2 space-y-1">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const IconComponent = item.icon;
                if (item.isHome) {
                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4 text-muted-foreground" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    </SheetClose>
                  );
                }

                // Render non-interactive disabled label during Step 3A to prevent fragment jump
                return (
                  <div
                    key={item.label}
                    aria-disabled="true"
                    title={STEP_3B_NOTICE}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground/80 cursor-default select-none"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4 text-muted-foreground/60" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">Step 3B</span>
                  </div>
                );
              })}
            </div>
          </nav>

          <Separator />

          {/* Quick Class Directory (Non-interactive during Step 3A) */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-2">
              শ্রেণিভিত্তিক পাঠ্যক্রম (Classes)
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {CLASS_LINKS.map((cls) => (
                <div
                  key={cls.grade}
                  aria-disabled="true"
                  title={STEP_3B_NOTICE}
                  className="flex flex-col rounded-lg border border-border/50 bg-card/50 p-2.5 text-left text-xs cursor-default select-none"
                >
                  <span className="font-semibold text-foreground/80">{cls.grade}</span>
                  <span className="text-[10px] text-muted-foreground/70">{cls.stage}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Educational Philosophy Note */}
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <Info className="h-3.5 w-3.5 text-primary" />
              <span>জাতীয় শিক্ষাক্রম (NCTB)</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              ষষ্ঠ থেকে দশম শ্রেণির পাঠ্যবই ভিত্তিক মুক্ত শিক্ষামূলক প্ল্যাটফর্ম।
            </p>
          </div>
        </div>

        {/* Drawer Footer with Theme Toggle & Login CTA */}
        <div className="border-t border-border p-4 bg-muted/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">থিম পরিবর্তন:</span>
            <ThemeToggle />
          </div>
          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs text-muted-foreground opacity-80 cursor-not-allowed justify-center"
              aria-disabled="true"
              title="লগইন ফিচার পরবর্তী ধাপে (Phase 3) যুক্ত হবে"
            >
              শিক্ষার্থী লগইন (পরবর্তী ধাপে)
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
