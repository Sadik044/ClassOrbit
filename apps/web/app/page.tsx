"use client";

/* ==============================================================================
   TEMPORARY STEP 1 & 2 VERIFICATION HARNESS
   Notice: This page exists solely to test and visually verify the Theme, Core
   UI Primitives, Typography Hierarchy, and Reading-Width DOM Metrics.
   It will be replaced by the official Homepage in a subsequent phase.
   ============================================================================== */

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Bookmark, BookOpen, Layers, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

/* ------------------------------------------------------------------------------
   CORPUS DEFINITIONS (Constrained to pure continuous single-node strings)
   ------------------------------------------------------------------------------ */
const CORPUS_A_PROSE =
  "আমাদের চারপাশের দৃশ্যমান মহাবিশ্ব নানা রকম ভৌত প্রক্রিয়ার মাধ্যমে প্রতিনিয়ত পরিবর্তিত হচ্ছে। পদার্থের নির্দিষ্ট ভর, আয়তন এবং জড়তা রয়েছে, যার ফলে এটি বাহ্যিক বল প্রয়োগ ব্যতীত তার স্থিতিশীল বা গতিশীল অবস্থার পরিবর্তন করতে পারে না। মাধ্যমিক পর্যায়ের বিজ্ঞানের শিক্ষার্থীদের ক্ষেত্রে প্রকৃতির এই জটিল ও বিস্ময়কর মিথস্ক্রিয়া অনুধাবন করার জন্য গভীর পর্যবেক্ষণ, বিজ্ঞানসম্মত অনুসন্ধান এবং নিয়মতান্ত্রিক বিশ্লেষণ অত্যন্ত আবশ্যক।";

const CORPUS_B_MATH =
  "কোনো বস্তুর উপর প্রযুক্ত বল (F) এবং এর ফলে সৃষ্ট ত্বরণ (a) এর মধ্যকার সম্পর্ক নিউটনের গতির দ্বিতীয় সূত্র দ্বারা ব্যাখ্যা করা হয়। যদি m ভরের একটি বস্তুর আদিবেগ u থেকে t সময় পর শেষবেগ v-এ রূপান্তরিত হয়, তবে ত্বরণ a = (v - u) / t। সুতরাং বলের মান দাঁড়ায় F = ma, যার এসআই একক হলো নিউটন (N বা kg·m/s²)। মাত্রাগত সমীকরণে বলের মাত্রা [MLT⁻²] হিসাবে প্রকাশিত হয়।";

const CORPUS_C_BILINGUAL =
  "পদার্থবিজ্ঞান (Physics) প্রথম অধ্যায়ে ভৌত রাশি (Physical Quantities) এবং তাদের পরিমাপের একক (Units of Measurement) নিয়ে বিশদ আলোচনা করা হয়েছে। আধুনিক বৈজ্ঞানিক পরিমাপে আন্তর্জাতিক একক পদ্ধতি (International System of Units বা SI System) সার্বজনীনভাবে স্বীকৃত। মৌলিক রাশির (Fundamental Quantities) পাশাপাশি লব্ধ রাশি (Derived Quantities), যেমন—বেগ (Velocity), ঘনত্ব (Density) এবং চাপ (Pressure) হিসাব করার সময় নির্ভুল একক রূপান্তর নিশ্চিত করতে হয়।";

/* ------------------------------------------------------------------------------
   DOM LINE MEASUREMENT TYPES & ALGORITHM
   ------------------------------------------------------------------------------ */
interface LineMetrics {
  lineNumber: number;
  graphemeCount: number;
  occupiedLineWidthPx: number;
  containerWidthPx: number;
  fillPercentage: number;
}

type TextMeasurementReport =
  | {
      status: "valid";
      mode: "Intl.Segmenter (Exact Grapheme Clusters)" | "Fallback: Code Points (Approximate)";
      containerWidthPx: number;
      totalLines: number;
      totalUnits: number;
      lines: LineMetrics[];
    }
  | {
      status: "invalid";
      reason: string;
      containerWidthPx: number;
    };

function measureRenderedParagraph(element: HTMLElement): TextMeasurementReport {
  const containerRect = element.getBoundingClientRect();
  const containerWidthPx = Math.round(containerRect.width * 10) / 10;

  // 1. Strict Validation Guard: fail immediately if not a single continuous text node
  if (
    element.childNodes.length !== 1 ||
    !element.firstChild ||
    element.firstChild.nodeType !== Node.TEXT_NODE
  ) {
    return {
      status: "invalid",
      reason: "Measurement Error: Target element must contain exactly one continuous text node without split inline elements.",
      containerWidthPx,
    };
  }

  const textNode = element.firstChild as Text;
  const text = textNode.textContent || "";

  // 2. Mode Detection & Segmentation
  const hasSegmenter = typeof Intl !== "undefined" && "Segmenter" in Intl;
  const mode = hasSegmenter
    ? "Intl.Segmenter (Exact Grapheme Clusters)"
    : "Fallback: Code Points (Approximate)";

  interface GraphemeRange {
    start: number;
    end: number;
  }
  const graphemeRanges: GraphemeRange[] = [];

  if (hasSegmenter) {
    const segmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
    for (const seg of segmenter.segment(text)) {
      graphemeRanges.push({ start: seg.index, end: seg.index + seg.segment.length });
    }
  } else {
    // Native dependency-free code-point fallback
    let index = 0;
    for (const char of Array.from(text)) {
      graphemeRanges.push({ start: index, end: index + char.length });
      index += char.length;
    }
  }

  // 3. Exhaustive Line Clustering with Mathematical Guards
  interface VisualLine {
    top: number;
    bottom: number;
    left: number;
    right: number;
    count: number;
  }
  const visualLines: VisualLine[] = [];
  const range = document.createRange();

  for (const { start, end } of graphemeRanges) {
    range.setStart(textNode, start);
    range.setEnd(textNode, end);
    const rects = range.getClientRects();
    if (rects.length === 0) continue;

    const rect = rects[0];
    const rectHeight = rect.bottom - rect.top;

    // Guard 1: Reject collapsed, zero, negative, or non-finite rectangles
    if (
      !Number.isFinite(rectHeight) ||
      rectHeight <= 0 ||
      !Number.isFinite(rect.width) ||
      rect.width <= 0 ||
      !Number.isFinite(rect.top) ||
      !Number.isFinite(rect.bottom) ||
      !Number.isFinite(rect.left) ||
      !Number.isFinite(rect.right)
    ) {
      continue;
    }

    const rectMidY = (rect.top + rect.bottom) / 2;

    let bestCandidate: VisualLine | null = null;
    let maxOverlapRatio = -1;
    let minCenterDistance = Infinity;
    let earliestTop = Infinity;

    // Evaluate against EVERY existing candidate line
    for (const line of visualLines) {
      const lineH = line.bottom - line.top;

      // Guard 2: Verify candidate line height is strictly positive and finite
      if (!Number.isFinite(lineH) || lineH <= 0) {
        continue;
      }

      const minH = Math.min(lineH, rectHeight);
      // Guard 3: Prevent division by zero or non-finite divisor
      if (!Number.isFinite(minH) || minH <= 0) {
        continue;
      }

      const verticalOverlap = Math.max(0, Math.min(line.bottom, rect.bottom) - Math.max(line.top, rect.top));
      const overlapRatio = verticalOverlap / minH;

      // Guard 4: Reject NaN / Infinity results
      if (!Number.isFinite(overlapRatio)) {
        continue;
      }

      if (overlapRatio >= 0.5) {
        const centerDistance = Math.abs((line.top + line.bottom) / 2 - rectMidY);

        if (
          overlapRatio > maxOverlapRatio ||
          (overlapRatio === maxOverlapRatio && centerDistance < minCenterDistance) ||
          (overlapRatio === maxOverlapRatio && centerDistance === minCenterDistance && line.top < earliestTop)
        ) {
          bestCandidate = line;
          maxOverlapRatio = overlapRatio;
          minCenterDistance = centerDistance;
          earliestTop = line.top;
        }
      }
    }

    if (bestCandidate) {
      // Expand candidate line boundary
      bestCandidate.top = Math.min(bestCandidate.top, rect.top);
      bestCandidate.bottom = Math.max(bestCandidate.bottom, rect.bottom);
      bestCandidate.left = Math.min(bestCandidate.left, rect.left);
      bestCandidate.right = Math.max(bestCandidate.right, rect.right);
      bestCandidate.count += 1;
    } else {
      // Create new visual line
      visualLines.push({
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        count: 1,
      });
    }
  }

  // 4. Deterministic sorting by visual vertical position, then horizontal
  visualLines.sort((a, b) => a.top - b.top || a.left - b.left);

  // 5. Construct distinct line metrics
  const lines: LineMetrics[] = visualLines.map((line, index) => {
    const occupiedLineWidthPx = Math.round((line.right - line.left) * 10) / 10;
    const fillPercentage = containerWidthPx > 0
      ? Math.round((occupiedLineWidthPx / containerWidthPx) * 100)
      : 0;

    return {
      lineNumber: index + 1,
      graphemeCount: line.count,
      occupiedLineWidthPx,
      containerWidthPx,
      fillPercentage,
    };
  });

  return {
    status: "valid",
    mode,
    containerWidthPx,
    totalLines: lines.length,
    totalUnits: graphemeRanges.length,
    lines,
  };
}

/* ------------------------------------------------------------------------------
   PAGE COMPONENT
   ------------------------------------------------------------------------------ */
export default function Step2VerificationPage() {
  const [inputValue, setInputValue] = React.useState("পদার্থবিজ্ঞান ১ম অধ্যায়");
  const [isWcagSpacing, setIsWcagSpacing] = React.useState(false);

  // Refs for measurement
  const refCandidate36 = React.useRef<HTMLParagraphElement>(null);
  const refCandidate42 = React.useRef<HTMLParagraphElement>(null);
  const refFluid = React.useRef<HTMLParagraphElement>(null);
  const refInvalid = React.useRef<HTMLParagraphElement>(null);

  // Measurement states
  const [report36, setReport36] = React.useState<TextMeasurementReport | null>(null);
  const [report42, setReport42] = React.useState<TextMeasurementReport | null>(null);
  const [reportFluid, setReportFluid] = React.useState<TextMeasurementReport | null>(null);
  const [reportInvalid, setReportInvalid] = React.useState<TextMeasurementReport | null>(null);

  const runMeasurements = React.useCallback(() => {
    if (refCandidate36.current) {
      setReport36(measureRenderedParagraph(refCandidate36.current));
    }
    if (refCandidate42.current) {
      setReport42(measureRenderedParagraph(refCandidate42.current));
    }
    if (refFluid.current) {
      setReportFluid(measureRenderedParagraph(refFluid.current));
    }
    if (refInvalid.current) {
      setReportInvalid(measureRenderedParagraph(refInvalid.current));
    }
  }, []);

  React.useEffect(() => {
    // Run after fonts load and hydration
    const timer = setTimeout(() => {
      runMeasurements();
    }, 200);

    window.addEventListener("resize", runMeasurements);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", runMeasurements);
    };
  }, [runMeasurements]);

  const wcagOverrideClasses = isWcagSpacing
    ? "[&_*]:!leading-[1.5] [&_*]:!tracking-[0.12em] [&_*]:![word-spacing:0.16em] [&_p]:!mb-[2em]"
    : "";

  return (
    <main className={`min-h-screen bg-background text-foreground p-4 sm:p-8 max-w-5xl mx-auto space-y-10 ${wcagOverrideClasses}`}>
      {/* 1. Header Toolbar */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            <span>Phase 1 — Step 2</span>
            <Separator orientation="vertical" className="h-3" />
            <span>Typography & Design System Refinement</span>
          </div>
          <h1 className="text-heading-h1">ClassOrbit Design System Verification</h1>
          <p className="text-body-small text-muted-foreground mt-1">
            টেম্পোরারি ভেরিফিকেশন হারনেস — ফেজ ১ স্টেপ ২ টাইপোগ্রাফি, স্কেলিং ও রিডিং-উইডথ পরিমাপ।
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant={isWcagSpacing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsWcagSpacing(!isWcagSpacing)}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>WCAG 1.4.12 টেস্ট মোড: {isWcagSpacing ? "অন (ON)" : "অফ (OFF)"}</span>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* 2. Typographic Scale Showcase (H1 - H6 + Overline + Body) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-h2">১. টাইপোগ্রাফিক হায়ারার্কি স্কেল (H1–H6, Overline & Body)</h2>
          <span className="text-overline">টাইপোগ্রাফি টোকেন</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-h4">সম্পূর্ণ টাইপোগ্রাফি হায়ারার্কি ম্যাট্রিক্স</CardTitle>
            <CardDescription className="text-body-small">
              হিন্দ শিলিগুড়ি এবং ইন্টার ফন্টের সমন্বয়ে সাবলীল ও স্পষ্ট হায়ারার্কি।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 border-b border-border pb-6">
              <div>
                <span className="text-xs text-muted-foreground font-mono">H1 (text-heading-h1: 30px / 36px / 48px, bold, leading 1.35/1.3)</span>
                <h1 className="text-heading-h1">H1: আধুনিক ডিজিটাল শিক্ষামাধ্যম ClassOrbit</h1>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">H2 (text-heading-h2: 24px / 30px, bold, leading 1.4/1.35)</span>
                <h2 className="text-heading-h2">H2: মাধ্যমিক পাঠ্যক্রম ও অধ্যায়ভিত্তিক প্রস্তুতি</h2>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">H3 (text-heading-h3: 20px / 24px, semibold, leading 1.4/1.35)</span>
                <h3 className="text-heading-h3">H3: পদার্থবিজ্ঞান — ১ম অধ্যায়: ভৌত রাশি ও পরিমাপ</h3>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">H4 (text-heading-h4: 18px / 20px, semibold, leading 1.45/1.4)</span>
                <h4 className="text-heading-h4">H4: পরিমাপের আন্তর্জাতিক পদ্ধতি ও উপসর্গসমূহ</h4>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">H5 (text-heading-h5: 16px / 18px, semibold, leading 1.5/1.45)</span>
                <h5 className="text-heading-h5">H5: স্লাইড ক্যালিপার্স ও ভার্নিয়ার স্কেলের ব্যবহার</h5>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">H6 (text-heading-h6: 14px / 16px, semibold, leading 1.5)</span>
                <h6 className="text-heading-h6">H6: ত্রুটি ও নির্ভুলতা বিশ্লেষণ (Experimental Errors)</h6>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">Overline (text-overline: 12px, semibold, uppercase, tracking-wider)</span>
                <div>
                  <span className="text-overline">এনসিটিবি ২০২৩ শিক্ষাক্রম • নবম-দশম শ্রেণি</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground font-mono">Body Lead (text-body-lead: 18px, leading 1.7)</span>
                <p className="text-body-lead">
                  প্রকৃতির মৌলিক নিয়মগুলো পর্যবেক্ষণ ও বিশ্লেষণের মাধ্যমে বিজ্ঞান মানব সভ্যতাকে এগিয়ে নিয়েছে।
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">Body Base (text-body-base: 16px, leading 1.65)</span>
                <p className="text-body-base">
                  পদার্থবিজ্ঞানের ভিত্তি হলো সঠিক পরিমাপ এবং গাণিতিক সম্পর্ক স্থাপন। যেকোনো পরীক্ষণ সম্পন্ন করার পূর্বে যথাযথ একক ও যন্ত্রপাতি নির্বাচন করা অপরিহার্য।
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">Body Small (text-body-small: 14px, leading 1.6)</span>
                <p className="text-body-small">
                  লক্ষ্য করুন: ভার্নিয়ার স্কেলের পাঠ নেওয়ার সময় দৃষ্টি লম্বভাবে স্থাপন করতে হবে যাতে লম্বন ত্রুটি পরিহার করা যায়।
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono">Caption (text-caption: 12px, leading normal)</span>
                <p className="text-caption">
                  চিত্র ১.১: স্লাইড ক্যালিপার্সের সাহায্যে দণ্ডের দৈর্ঘ্য পরিমাপ পদ্ধতি (উৎস: এনসিটিবি পাঠ্যবই)।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Reading Width Candidates & DOM Measurement Protocol */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-heading-h2">২. বাংলা রিডিং-উইডথ ও DOM লাইন পরিমাপ</h2>
            <p className="text-body-small text-muted-foreground">
              Range.getClientRects() এবং Intl.Segmenter ভিত্তিক রেন্ডার্ড লাইন ও গ্রাফিম ক্লাস্টার বিতরণ।
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={runMeasurements} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>পুনরায় পরিমাপ করুন</span>
          </Button>
        </div>

        {/* Mode Pill Indicator */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/60 border border-border text-xs">
          <span className="font-semibold text-foreground">সক্রিয় পরিমাপ মোড (Active Mode):</span>
          <Badge variant="secondary">
            {report36?.status === "valid" ? report36.mode : "লোড হচ্ছে..."}
          </Badge>
          <span className="text-muted-foreground hidden sm:inline">
            (Intl.Segmenter উপলব্ধ থাকলে গ্রাফিম ক্লাস্টার, অন্যথায় স্বয়ংক্রিয় কোড-পয়েন্ট ফলব্যাক)
          </span>
        </div>

        {/* Candidate A: 36rem */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-heading-h4">ক্যান্ডিডেট A: max-w-reading-compact (36rem / 576px)</CardTitle>
              <Badge variant="outline">Corpus A: একটানা শিক্ষামূলক গদ্য</Badge>
            </div>
            <CardDescription className="text-body-small">
              একক কলামের পাঠ্যবই পড়ার জন্য কম্প্যাক্ট ক্যান্ডিডেট উইডথ।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-w-reading-compact border-l-2 border-primary/40 pl-4 py-1">
              <p ref={refCandidate36} className="text-body-base">
                {CORPUS_A_PROSE}
              </p>
            </div>

            {report36?.status === "valid" && (
              <div className="bg-muted/40 p-3 rounded-lg border border-border/80 text-xs space-y-2">
                <div className="flex flex-wrap gap-4 font-semibold text-foreground">
                  <span>কন্টেইনার উইডথ: {report36.containerWidthPx}px</span>
                  <span>মোট লাইন সংখ্যা: {report36.totalLines}টি</span>
                  <span>মোট গ্রাফিম সংখ্যা: {report36.totalUnits}টি</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {report36.lines.map((l) => (
                    <div key={l.lineNumber} className="p-2 bg-background rounded border border-border/60">
                      <span className="font-medium">লাইন {l.lineNumber}:</span>{" "}
                      <span>{l.graphemeCount} গ্রাফিম</span>
                      <div className="text-muted-foreground text-[10px]">
                        {l.occupiedLineWidthPx}px ({l.fillPercentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Candidate B: 42rem */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-heading-h4">ক্যান্ডিডেট B: max-w-reading (42rem / 672px)</CardTitle>
              <Badge variant="outline">Corpus B: গাণিতিক সূত্র ও একক</Badge>
            </div>
            <CardDescription className="text-body-small">
              ইনলাইন সমীকরণ ও একক সংবলিত পাঠ্যবই পড়ার স্ট্যান্ডার্ড ক্যান্ডিডেট উইডথ।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-w-reading border-l-2 border-primary/40 pl-4 py-1">
              <p ref={refCandidate42} className="text-body-base">
                {CORPUS_B_MATH}
              </p>
            </div>

            {report42?.status === "valid" && (
              <div className="bg-muted/40 p-3 rounded-lg border border-border/80 text-xs space-y-2">
                <div className="flex flex-wrap gap-4 font-semibold text-foreground">
                  <span>কন্টেইনার উইডথ: {report42.containerWidthPx}px</span>
                  <span>মোট লাইন সংখ্যা: {report42.totalLines}টি</span>
                  <span>মোট গ্রাফিম সংখ্যা: {report42.totalUnits}টি</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {report42.lines.map((l) => (
                    <div key={l.lineNumber} className="p-2 bg-background rounded border border-border/60">
                      <span className="font-medium">লাইন {l.lineNumber}:</span>{" "}
                      <span>{l.graphemeCount} গ্রাফিম</span>
                      <div className="text-muted-foreground text-[10px]">
                        {l.occupiedLineWidthPx}px ({l.fillPercentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Candidate C: Fluid Width Control */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-heading-h4">ক্যান্ডিডেট C: আনকনস্ট্রেইন্ড ফ্লুইড উইডথ (w-full Control)</CardTitle>
              <Badge variant="outline">Corpus C: দ্বৈতভাষিক কনটেন্ট</Badge>
            </div>
            <CardDescription className="text-body-small">
              কোনো কন্টেইনার উইডথ সীমাবদ্ধতা ব্যতীত বেসলাইন তুলনা।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full border-l-2 border-primary/40 pl-4 py-1">
              <p ref={refFluid} className="text-body-base">
                {CORPUS_C_BILINGUAL}
              </p>
            </div>

            {reportFluid?.status === "valid" && (
              <div className="bg-muted/40 p-3 rounded-lg border border-border/80 text-xs space-y-2">
                <div className="flex flex-wrap gap-4 font-semibold text-foreground">
                  <span>কন্টেইনার উইডথ: {reportFluid.containerWidthPx}px</span>
                  <span>মোট লাইন সংখ্যা: {reportFluid.totalLines}টি</span>
                  <span>মোট গ্রাফিম সংখ্যা: {reportFluid.totalUnits}টি</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {reportFluid.lines.map((l) => (
                    <div key={l.lineNumber} className="p-2 bg-background rounded border border-border/60">
                      <span className="font-medium">লাইন {l.lineNumber}:</span>{" "}
                      <span>{l.graphemeCount} গ্রাফিম</span>
                      <div className="text-muted-foreground text-[10px]">
                        {l.occupiedLineWidthPx}px ({l.fillPercentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invalid DOM Guard Test Case */}
        <Card className="border-destructive/30">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <CardTitle className="text-heading-h5">নেগেটিভ টেস্ট: ইনভ্যালিড DOM স্ট্রাকচার গার্ড</CardTitle>
            </div>
            <CardDescription className="text-body-small">
              একাধিক স্প্লিট চাইল্ড নোড থাকলে অ্যালগরিদম সাথে সাথে status: &quot;invalid&quot; রিপোর্ট করে কি না পরীক্ষা।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Intentionally nested span nodes to trigger validation failure */}
            <p ref={refInvalid} className="text-body-base">
              <span>প্রথম অংশ </span>
              <span>দ্বিতীয় অংশ (স্প্লিট নোড)</span>
            </p>

            {reportInvalid?.status === "invalid" && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold">ভ্যালিডেশন গার্ড সফলভাবে ট্রিগার হয়েছে: </span>
                  <span>{reportInvalid.reason}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 4. Core UI Primitives Verification (Preserved from Step 1) */}
      <section className="space-y-4">
        <h2 className="text-heading-h2">৩. কোর UI প্রিমিটিভ যাচাইকরণ (Preserved from Step 1)</h2>

        {/* Button Matrix */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-h4">বাটন ভেরিয়েন্ট ও ইন্টারঅ্যাক্টিভ স্টেট</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">ডিফল্ট বাটন (Default)</Button>
              <Button variant="secondary">সেকেন্ডারি বাটন (Secondary)</Button>
              <Button variant="destructive">মুছে ফেলুন (Destructive)</Button>
              <Button variant="outline">আউটলাইন (Outline)</Button>
              <Button variant="ghost">ঘোস্ট বাটন (Ghost)</Button>
              <Button variant="link">লিংক বাটন (Link)</Button>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">স্মল (sm)</Button>
              <Button size="default">ডিফল্ট (default)</Button>
              <Button size="lg">লার্জ বাটন (lg)</Button>
              <Button size="icon" aria-label="বুকমার্ক করুন">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button disabled variant="default">নিষ্ক্রিয় (Disabled)</Button>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-h5">ব্যাজ প্রিমিটিভ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">বিজ্ঞান (Primary)</Badge>
                <Badge variant="secondary">আবশ্যিক পাঠ (Secondary)</Badge>
                <Badge variant="destructive">সংশোধিত সিলেবাস (Destructive)</Badge>
                <Badge variant="outline">এনসিটিবি ২০২৩ (Outline)</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-h5">ইনপুট প্রিমিটিভ (WCAG &ge; 3:1)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <label htmlFor="search-test" className="text-sm font-medium">অনুসন্ধান ফিল্ড:</label>
              <Input
                id="search-test"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="অনুসন্ধান করুন..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Tabs, Dialog & Sheet */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-h4">ট্যাব, ডায়ালগ ও ড্রয়ার প্রিমিটিভ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="physics" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="physics">পদার্থবিজ্ঞান</TabsTrigger>
                <TabsTrigger value="chemistry">রসায়ন</TabsTrigger>
                <TabsTrigger value="biology">জীববিজ্ঞান</TabsTrigger>
              </TabsList>
              <TabsContent value="physics" className="pt-4 text-body-small">
                পদার্থবিজ্ঞান: ভৌত রাশি, পরিমাপের একক ও আন্তর্জাতিক পদ্ধতি।
              </TabsContent>
              <TabsContent value="chemistry" className="pt-4 text-body-small">
                রসায়ন: পদার্থের ধারণা, রাসায়নিক পরিবর্তন ও অনুসন্ধান পদ্ধতি।
              </TabsContent>
              <TabsContent value="biology" className="pt-4 text-body-small">
                জীববিজ্ঞান: জীবন পাঠ, শ্রেণিবিন্যাস ও জীবদেহের গঠন।
              </TabsContent>
            </Tabs>

            <Separator />

            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    ডায়ালগ খুলুন (Dialog)
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-heading-h4">অধ্যায় বিবরণী</DialogTitle>
                    <DialogDescription className="text-body-small">
                      ভৌত রাশি ও পরিমাপ সংক্রান্ত সংক্ষিপ্ত নির্দেশিকা।
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2 text-body-base">
                    পরিমাপের যন্ত্রপাতি: স্লাইড ক্যালিপার্স ও স্ক্রু গজ।
                  </div>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button variant="secondary">বাতিল</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="default">সম্পন্ন</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Layers className="h-4 w-4" />
                    শীট ড্রয়ার খুলুন (Sheet)
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle className="text-heading-h4">সাইডবার ড্রয়ার</SheetTitle>
                    <SheetDescription className="text-body-small">
                      মোবাইল নেভিগেশনের জন্য অনুমোদিত শীট প্রিমিটিভ।
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-2 text-body-small">
                    <p>ডান দিক থেকে মসৃণ অ্যানিমেশনে উন্মোচিত ড্রয়ার।</p>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full">ড্রয়ার বন্ধ করুন</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
