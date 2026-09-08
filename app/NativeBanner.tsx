"use client";

import { useEffect, useRef } from "react";

export default function NativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl31239783.profitableratecpmnetwork.com/8daefcf097fe5f6ad1628571bf66468b/invoke.js";
    containerRef.current?.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      id="container-8daefcf097fe5f6ad1628571bf66468b"
    />
  );
}
