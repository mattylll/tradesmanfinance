"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useRef } from "react";

// Check if Convex is configured (at module level for SSR safety)
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // Use ref to lazily initialize the client only once
  const clientRef = useRef<ConvexReactClient | null>(null);

  // If Convex URL is not configured, just render children without wrapper
  // This allows the site to build and run without Convex during development
  if (!CONVEX_URL) {
    return <>{children}</>;
  }

  // Lazily create the client (only in browser)
  if (!clientRef.current && typeof window !== "undefined") {
    clientRef.current = new ConvexReactClient(CONVEX_URL);
  }

  // During SSR or if client not ready, render children directly
  if (!clientRef.current) {
    return <>{children}</>;
  }

  return <ConvexProvider client={clientRef.current}>{children}</ConvexProvider>;
}
