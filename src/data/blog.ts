export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  url?: string;
  imageUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Building Real-Time Systems with WebSockets at Scale",
    description:
      "How we architected a WebSocket-based real-time gaming platform supporting 1500+ concurrent users — handling race conditions, connection pooling, and graceful reconnection.",
    date: "2025-03-12",
    readTime: "8 min read",
    tags: ["WebSockets", "Node.js", "System Design"],
    slug: "building-realtime-systems-websockets",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
  },
  {
    title: "Eliminating Race Conditions in Distributed Systems",
    description:
      "A deep dive into idempotent API design, ACID transactions, and optimistic locking strategies I used to fix silent data corruption bugs in production.",
    date: "2025-01-28",
    readTime: "6 min read",
    tags: ["Distributed Systems", "MongoDB", "Backend"],
    slug: "eliminating-race-conditions",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "RAG Pipelines: From Prototype to Production",
    description:
      "Lessons learned building a production-ready RAG pipeline — choosing the right vector store, chunking strategies, prompt injection defense, and evaluation metrics.",
    date: "2024-12-10",
    readTime: "10 min read",
    tags: ["AI", "RAG", "Supabase", "LLM"],
    slug: "rag-pipelines-production",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2032&auto=format&fit=crop",
  },
];
