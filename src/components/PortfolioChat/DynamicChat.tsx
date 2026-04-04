"use client";

import dynamic from "next/dynamic";

const PortfolioChat = dynamic(() => import("./index"));

export default function DynamicChat() {
  return <PortfolioChat />;
}
