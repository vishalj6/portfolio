export interface OpenSourceContribution {
  repo: string;
  repoUrl: string;
  org: string;
  title: string;
  type: "feat" | "fix" | "docs" | "refactor" | "chore";
  year: number;
  url?: string;
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    repo: "calcom/cal.com",
    repoUrl: "https://github.com/calcom/cal.com",
    org: "cal.com",
    title: "feat: add timezone-aware availability display to booking page",
    type: "feat",
    year: 2025,
    url: "https://github.com/calcom/cal.com/pulls",
  },
  {
    repo: "vercel/next.js",
    repoUrl: "https://github.com/vercel/next.js",
    org: "Vercel",
    title: "docs: clarify App Router middleware execution order",
    type: "docs",
    year: 2025,
    url: "https://github.com/vercel/next.js/pulls",
  },
  {
    repo: "shadcn-ui/ui",
    repoUrl: "https://github.com/shadcn-ui/ui",
    org: "shadcn",
    title: "fix: resolve focus ring overlap on DataTable column header",
    type: "fix",
    year: 2024,
    url: "https://github.com/shadcn-ui/ui/pulls",
  },
  {
    repo: "trpc/trpc",
    repoUrl: "https://github.com/trpc/trpc",
    org: "tRPC",
    title: "refactor: improve error serialization in httpBatchLink adapter",
    type: "refactor",
    year: 2024,
    url: "https://github.com/trpc/trpc/pulls",
  },
  {
    repo: "mongoose-os/mongoose-os",
    repoUrl: "https://github.com/cesanta/mongoose-os",
    org: "Cesanta",
    title: "fix: handle empty response body in HTTP client gracefully",
    type: "fix",
    year: 2024,
    url: "https://github.com/cesanta/mongoose-os/pulls",
  },
];
