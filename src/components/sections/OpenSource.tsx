'use client';

import { motion } from 'framer-motion';
import { openSourceContributions } from '@/data/contributions';


// Git branch SVG icon (like Image 2)
function BranchIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 01-9 9" />
    </svg>
  );
}

// Arrow button
function ArrowBtn({ href }: { href?: string }) {
  return (
    <a
      href={href ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--glass-border)] text-text-muted hover:text-text-main hover:border-[rgba(255,255,255,0.18)] bg-[var(--theme-card)] transition-all duration-200 hover:-translate-y-0.5"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
}

export default function OpenSource() {
  return (
    <section id="opensource" className="py-16 px-5 sm:px-8 bg-bg">
      <div className="max-w-[840px] mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="font-bold text-text-main text-2xl mb-8"
        >
          Open Source
        </motion.h2>

        {/* Contribution list */}
        <div className="flex flex-col divide-y divide-[var(--glass-border)]">
          {openSourceContributions.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-4 py-5 group"
            >
              {/* Branch icon */}
              <BranchIcon className={`shrink-0 text-[#c27aff]`} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-text-main text-sm font-medium leading-snug group-hover:text-text-main transition-colors line-clamp-1">
                  <span className={`font-mono text-xs mr-1.5`}>{c.type}:</span>
                  {c.title.replace(/^(feat|fix|docs|refactor|chore):\s*/i, '')}
                  <span className="font-mono text-text-muted text-xs ml-2">{c.year}</span>
                </p>
                <a
                  href={c.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted text-xs mt-0.5 hover:text-text-main transition-colors"
                >
                  Contributed to {c.org}
                </a>
              </div>

              {/* Arrow */}
              <ArrowBtn href={c.url} />
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <a
            href="https://github.com/vishal-jadeja"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted text-sm hover:text-text-main transition-colors duration-200 flex items-center gap-2"
          >
            Show all contributions
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
