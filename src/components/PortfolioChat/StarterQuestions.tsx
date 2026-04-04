"use client";

import styles from "./PortfolioChat.module.css";

const QUESTIONS = [
  "What's your tech stack?",
  "Tell me about MintMark",
  "Are you open to work?",
  "What are you learning?",
  "What's your favorite IPL team?",
];

interface Props {
  onSelect: (question: string) => void;
  disabled: boolean;
}

export default function StarterQuestions({ onSelect, disabled }: Props) {
  return (
    <div className={styles.starters}>
      <div className={styles.starterIntro}>
        <p className={styles.starterGreeting}>Hey there 👋</p>
        <p className={styles.starterLabel}>Ask me anything about Vishal →</p>
      </div>
      <div className={styles.starterChips}>
        {QUESTIONS.map((q) => (
          <button
            key={q}
            className={styles.starterChip}
            onClick={() => onSelect(q)}
            disabled={disabled}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
