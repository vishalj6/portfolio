export interface Project {
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github: string;
  live?: string;
  imageUrl?: string;
  status?: "in-progress" | "completed";
}

export const projects: Project[] = [
  {
    title: "Mintmark",
    tagline: "Personal Branding & Knowledge Platform",
    description:
      "A passive-first personal branding platform that turns what you learn into platform-ready content for LinkedIn, X, and Medium — simultaneously. Features a unified activity heatmap across all learning sources, AI-powered content generation via BYOK, and a personal knowledge assistant scoped strictly to your own notes and posts.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "React 19",
      "Supabase",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS v4",
      "Trigger.dev",
      "Upstash Redis",
    ],
    highlights: [
      "BYOK AI layer supporting Claude, GPT, Gemini, and Groq",
      "Unified heatmap aggregating GitHub, LeetCode, notes, and sessions",
      "Per-platform AI instructions with simultaneous content generation",
      "RAG-powered personal knowledge assistant with strict tenant isolation",
      "Early access waitlist with referral queue mechanics",
    ],
    github: "https://github.com/vishal-jadeja/mintmark",
    imageUrl: "/images/MintMark-EA.webp",
    status: "in-progress",
    live: "https://mintmark-vishal.vercel.app",
  },
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
    imageUrl: "/images/syncify-image.webp",
    live: "https://syncify-vishal.netlify.app",
  },
  {
    title: "Amazon Clone",
    tagline: "E-Commerce Web Application",
    description:
      "User-side e-commerce platform replicating Amazon's core features — JWT authentication, product catalog, shopping cart, and order processing. Built with a mobile-first responsive UI using React.js and Redux, backed by scalable MongoDB schemas with efficient indexing.",
    techStack: [
      "React.js",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    highlights: [
      "JWT authentication system",
      "Product catalog with cart & orders",
      "Mobile-first responsive UI",
      "Scalable MongoDB schema design",
    ],
    github: "https://github.com/vishal-jadeja/AmazonClone",
    imageUrl: "/images/amazon-clone.webp",
  },
  {
    title: "Movie Recommendation System",
    tagline: "Content-Based Film Discovery Engine",
    description:
      "A content-based movie recommender that finds similar films using cosine similarity on TF-IDF vectorized metadata — genres, keywords, cast, and crew. Built as an interactive Streamlit app where you pick a movie and instantly get five tailored recommendations.",
    techStack: [
      "Python",
      "Streamlit",
      "Scikit-learn",
      "Pandas",
      "TMDB API",
      "Cosine Similarity",
      "TF-IDF",
    ],
    highlights: [
      "Cosine similarity on TF-IDF vectorized movie metadata",
      "Combines genres, keywords, cast, and crew as features",
      "Real-time poster fetching via TMDB API",
      "Interactive Streamlit UI with instant recommendations",
    ],
    github: "https://github.com/vishal-jadeja/Movie-Recommendation-System",
  },
];