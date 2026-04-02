"use client";

import styles from "./PortfolioChat.module.css";

const QUESTIONS = [
  "What's your tech stack?",
  "Tell me about MintMark",
  "Are you open to work?",
  "What are you learning?",
  "Do you have a girlfriend? 👀",
];

interface Props {
  onSelect: (question: string) => void;
  disabled: boolean;
}

export default function StarterQuestions({ onSelect, disabled }: Props) {
  return (
    <div className={styles.starters}>
      <p className={styles.starterLabel}>Ask something →</p>
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
  );
}
