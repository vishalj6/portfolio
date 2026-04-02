"use client";

import styles from "./PortfolioChat.module.css";

export default function TypingIndicator() {
  return (
    <div className={styles.typingRow}>
      <div className={styles.typingBubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
