"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

// Clerk theme customization to match brand colors
const clerkAppearance = {
  variables: {
    colorPrimary: "#ff6b35", // Industrial orange
    colorText: "#1a1a1a",
    colorTextSecondary: "#4a4a4a",
    colorBackground: "#ffffff",
    colorInputBackground: "#f5f5f5",
    colorInputText: "#1a1a1a",
    borderRadius: "0.5rem",
    fontFamily: "'Work Sans', 'Arial', sans-serif",
  },
  elements: {
    card: {
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "0.75rem",
    },
    primaryButton: {
      backgroundColor: "#ff6b35",
      "&:hover": {
        backgroundColor: "#e55a2b",
      },
    },
    formButtonPrimary: {
      backgroundColor: "#ff6b35",
      "&:hover": {
        backgroundColor: "#e55a2b",
      },
    },
  },
};

// Check if Clerk is configured
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function ClerkClientProvider({ children }: { children: ReactNode }) {
  // If Clerk is not configured, just render children without wrapper
  // This allows the site to build and run without Clerk during development
  if (!isClerkConfigured) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider appearance={clerkAppearance}>
      {children}
    </ClerkProvider>
  );
}
