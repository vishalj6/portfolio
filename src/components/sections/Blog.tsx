'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  }).toUpperCase();
}

const STACK_STYLES = [
  { opacity: 1, zIndex: 10, y: 0, scale: 1 },
  { opacity: 0.6, zIndex: 9, y: -40, scale: 0.94 },
  { opacity: 0.3, zIndex: 8, y: -70, scale: 0.88 },
];

export default function Blog() {
  const [topIndex, setTopIndex] = useState(0);

  const orderedPosts = blogPosts.map((_, i) =>
    blogPosts[(topIndex + i) % blogPosts.length]
  );

  function cycleNext() {
    setTopIndex((prev) => (prev + 1) % blogPosts.length);
  }

  return (
    <section id="blog" className="py-8 px-5 sm:px-8 bg-bg">
      <div className="max-w-[840px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="font-bold text-text-main text-2xl">Blog</h2>
        </motion.div>

        <div className="flex flex-col items-center gap-10">

          {/* Stacked card deck */}
          <div
            className="relative w-full max-w-[560px] mx-auto"
            style={{ height: 340, perspective: 1000 }}
          >
            {orderedPosts.slice(0, 3).map((post, i) => {
              const s = STACK_STYLES[i];
              return (
                <motion.div
                  key={post.slug}
                  animate={{ opacity: s.opacity, y: s.y, scale: s.scale }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute inset-x-0 bottom-0 mx-auto w-full overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-2 group"
                  style={{
                    zIndex: s.zIndex,
                    originY: 'bottom',
                    aspectRatio: '16/9',
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[20px] flex flex-col bg-white/40 dark:bg-white/5">

                    {/* Image */}
                    <div className="relative h-[65%] w-full overflow-hidden rounded-xl shrink-0">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                          sizes="560px"
                        />
                      ) : (
                        <div className="h-full w-full bg-[var(--theme-card)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="text-[10px] font-mono text-white/70 tracking-[0.18em] uppercase">
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex-1 px-4 sm:px-5 py-3 flex items-center justify-between min-h-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-text-main text-lg sm:text-2xl leading-snug tracking-tight truncate pb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {post.title}
                        </h3>
                        <p className="text-[11px] text-text-muted font-mono line-clamp-1 mt-1 opacity-80">
                          {post.description}
                        </p>
                      </div>
                      <a
                        href={post.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 shrink-0 w-10 h-10 rounded-full bg-[var(--theme-text-main)] text-[var(--theme-bg)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md"
                        aria-label={`Read ${post.title}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </a>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto z-20">
            <button
              onClick={cycleNext}
              className="flex justify-center h-11 w-full sm:w-auto items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--theme-card)] backdrop-blur-md px-6 text-sm font-medium text-text-muted hover:text-text-main hover:bg-[var(--theme-surface)] transition-all active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
              Next Article
            </button>
            <a
              href="#"
              className="h-10 flex justify-center w-full sm:w-auto items-center gap-2 rounded-full bg-[var(--theme-text-main)] px-8 text-sm font-medium text-[var(--theme-bg)] hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              View All Stories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
