import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
        <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Phase 0: Project Foundation
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          ClassOrbit
        </h1>

        <p className="mb-6 text-base text-muted-foreground sm:text-lg">
          ষষ্ঠ থেকে দশম শ্রেণির শিক্ষার্থীদের জন্য পাঠ্যবই ভিত্তিক আধুনিক ডিজিটাল শিক্ষামাধ্যম।
        </p>

        <div className="mb-8 grid grid-cols-2 gap-3 text-left text-xs sm:grid-cols-4 sm:text-sm">
          <div className="rounded-lg border border-border/80 bg-muted/40 p-3">
            <span className="font-semibold text-foreground">Frontend</span>
            <p className="text-muted-foreground">Next.js App Router</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/40 p-3">
            <span className="font-semibold text-foreground">Language</span>
            <p className="text-muted-foreground">TypeScript Strict</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/40 p-3">
            <span className="font-semibold text-foreground">Styling</span>
            <p className="text-muted-foreground">Tailwind CSS</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/40 p-3">
            <span className="font-semibold text-foreground">UI Primitives</span>
            <p className="text-muted-foreground">shadcn/ui</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="default" size="default">
            ভিত্তি কাঠামো প্রস্তুত (Phase 0)
          </Button>
          <Button variant="outline" size="default">
            PRD v1.1 Architecture
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Note: Phase 1 — UI/UX Design will begin upon explicit architectural review and approval.
        </p>
      </div>
    </main>
  );
}
