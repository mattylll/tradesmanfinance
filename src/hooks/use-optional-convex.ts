"use client";

import { useConvex } from "convex/react";
import { useMutation as useConvexMutation, useQuery as useConvexQuery } from "convex/react";
import { FunctionReference, OptionalRestArgs, FunctionArgs, FunctionReturnType } from "convex/server";

/**
 * Check if Convex is properly configured and available
 */
export function useIsConvexAvailable(): boolean {
  try {
    const convex = useConvex();
    return !!convex;
  } catch {
    return false;
  }
}

/**
 * A safe version of useMutation that returns a no-op function when Convex isn't available
 */
export function useSafeMutation<Mutation extends FunctionReference<"mutation">>(
  mutation: Mutation
): (args: FunctionArgs<Mutation>) => Promise<FunctionReturnType<Mutation> | null> {
  const isAvailable = useIsConvexAvailable();

  // Always call the hook (rules of hooks), but wrap the result
  let realMutation: ReturnType<typeof useConvexMutation<Mutation>> | null = null;

  try {
    // This will throw if Convex isn't available
    realMutation = useConvexMutation(mutation);
  } catch {
    // Convex not available, that's fine
  }

  return async (args: FunctionArgs<Mutation>) => {
    if (!isAvailable || !realMutation) {
      console.log("[Convex] Mutation not available, skipping:", mutation);
      return null;
    }
    return realMutation(args);
  };
}

/**
 * A safe version of useQuery that returns undefined when Convex isn't available
 */
export function useSafeQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgs<Query>
): FunctionReturnType<Query> | undefined {
  const isAvailable = useIsConvexAvailable();

  try {
    if (!isAvailable) {
      return undefined;
    }
    return useConvexQuery(query, ...args);
  } catch {
    return undefined;
  }
}
