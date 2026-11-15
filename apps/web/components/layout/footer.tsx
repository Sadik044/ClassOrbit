import * as React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/* ==============================================================================
   FOOTER COMPONENT (Phase 1, Step 3A)
   Notice: In Step 3A, the verification harness remains active on '/'.
   To prevent fragment navigation or scroll jump to nonexistent anchors,
   future-section directory items are rendered as non-interactive labels.
   Target anchor destinations (#classes, #subjects, #question-bank,
   #formula-library, #notices) will be activated in Step 3B with the Homepage.
   ============================================================================== */

interface FooterLink {
  label: string;
  targetAnchor: string; // Intended destination for Step 3B
  stage?: string;
}

const CLASS_LINKS: FooterLink[] = [
  { label: "৬ষ্ঠ শ্রেণি (Class 6)", targetAnchor: "#classes", stage: "নিম্ন মাধ্যমিক স্তর" },
  { label: "৭ম শ্রেণি (Class 7)", targetAnchor: "#classes", stage: "নিম্ন মাধ্যমিক স্তর" },
  { label: "৮ম শ্রেণি (Class 8)", targetAnchor: "#classes", stage: "নিম্ন মাধ্যমিক স্তর" },
  { label: "৯ম শ্রেণি (Class 9)", targetAnchor: "#classes", stage: "মাধ্যমিক স্তর" },
  { label: "১০ম শ্রেণি (Class 10)", targetAnchor: "#classes", stage: "মাধ্যমিক স্তর" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { label: "শ্রেণিভিত্তিক পাঠ্যক্রম", targetAnchor: "#classes" },
  { label: "জনপ্রিয় বিষয়সমূহ", targetAnchor: "#subjects" },
  { label: "সৃজনশীল ও MCQ প্রশ্নব্যাংক", targetAnchor: "#question-bank" },
  { label: "পদার্থ ও গণিত সূত্র সংকলন", targetAnchor: "#formula-library" },
  { label: "একাডেমিক নোটিশ বোর্ড", targetAnchor: "#notices" },
];

const STEP_3B_NOTICE = "হোমপেজ বাস্তবায়নের সময় (Step 3B) এই সেকশন কার্যকর হবে";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 text-foreground transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Academic Philosophy (Active Home Link) */}
          <div className="space-y-4 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="ClassOrbit হোমপেজ"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                ClassOrbit
              </span>
            </Link>
            <p className="text-sm font-medium text-foreground leading-snug">
              শিখি, বুঝি, এগিয়ে যাই — ClassOrbit-এর সঙ্গে।
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ষষ্ঠ থেকে দশম শ্রেণির শিক্ষার্থীদের জন্য জাতীয় শিক্ষাক্রম (NCTB) অনুযায়ী অধ্যায়ভিত্তিক প্রস্তুতি ও সুসংগঠিত শিক্ষাসামগ্রী সংগ্রহশালা।
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>NCTB পাঠ্যক্রম ভিত্তিক উন্মুক্ত প্ল্যাটফর্ম</span>
            </div>
          </div>

          {/* Column 2: Class Directory (Non-interactive labels during Step 3A) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              শ্রেণি নির্দেশিকা (Classes)
            </h3>
            <ul className="space-y-2 text-xs">
              {CLASS_LINKS.map((cls) => (
                <li key={cls.label}>
                  <span
                    title={STEP_3B_NOTICE}
                    className="text-muted-foreground/80 cursor-default inline-flex items-center gap-2 select-none"
                  >
                    <span>{cls.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resource Directory (Non-interactive labels during Step 3A) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              শিক্ষাসামগ্রী (Resources)
            </h3>
            <ul className="space-y-2 text-xs">
              {RESOURCE_LINKS.map((res) => (
                <li key={res.label}>
                  <span
                    title={STEP_3B_NOTICE}
                    className="text-muted-foreground/80 cursor-default select-none"
                  >
                    {res.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Academic Disclaimer & Standards */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              নীতিমালা ও মানদণ্ড
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ClassOrbit একটি অলাভজনক ও উন্মুক্ত ডিজিটাল শিক্ষা সহায়ক মাধ্যম। সকল কনটেন্ট জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)-এর নির্দেশিকা অনুযায়ী প্রণীত।
            </p>
            <div className="pt-2">
              <p className="text-[11px] text-muted-foreground leading-normal">
                ডিজাইন মানদণ্ড: অ্যাক্সেসিবিলিটি-সচেতন ডিজাইন (Accessibility-focused design) এবং সুবিন্যস্ত বাংলা টাইপোগ্রাফি যুক্ত।
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© 2026 ClassOrbit. সর্বস্বত্ব সংরক্ষিত।</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-muted-foreground/80">
              Phase 1 · UI/UX Design System
            </span>
            <Separator orientation="vertical" className="h-3" />
            <span className="inline-flex items-center gap-1 text-[11px]">
              শিক্ষার্থীদের ভালোবাসায় তৈরি <Heart className="h-3 w-3 text-destructive inline fill-destructive" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
