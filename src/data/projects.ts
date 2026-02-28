export interface Project {
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Syncify",
    tagline: "YouTube → Spotify Playlist Converter",
    description:
      "A seamless tool that converts YouTube playlists to Spotify using intelligent fuzzy matching. Handles OAuth 2.0 flows for both platforms, gracefully manages API rate limits, and reduced manual playlist migration effort by 95%.",
    techStack: [
      "React.js",
      "Node.js",
      "OAuth 2.0",
      "YouTube API",
      "Spotify API",
      "Fuzzy Matching",
    ],
    highlights: [
      "OAuth 2.0 dual-platform auth",
      "Fuzzy matching algorithm for song accuracy",
      "Intelligent rate limit handling",
      "95% reduction in manual effort",
    ],
    github: "https://github.com/vishal-jadeja/syncify",
  },
  {
    title: "Real-Time Tournament System",
    tagline: "High-Concurrency Competitive Platform",
    description:
      "A production-grade tournament platform handling 1500+ concurrent users with sub-200ms latency. Features real-time WebSocket updates, optimized MongoDB queries, payment microservices with race condition resolution, and atomic transaction handling.",
    techStack: [
      "Node.js",
      "WebSockets",
      "MongoDB",
      "Razorpay",
      "Stripe",
      "Microservices",
      "Redis",
    ],
    highlights: [
      "1500+ concurrent users",
      "Sub-200ms latency",
      "60% reduction in API polling load",
      "Race condition resolution in payments",
      "45% MongoDB latency reduction",
    ],
    github: "https://github.com/vishal-jadeja/tournament-system",
  },
];
