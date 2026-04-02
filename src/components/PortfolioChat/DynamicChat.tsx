"use client";

import dynamic from "next/dynamic";

const PortfolioChat = dynamic(() => import("./index"), { ssr: false });

export default function DynamicChat() {
  return <PortfolioChat />;
}
