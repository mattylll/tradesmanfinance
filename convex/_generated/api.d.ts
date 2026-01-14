/* eslint-disable */
/**
 * Generated API stub - will be replaced when running `npx convex dev`
 * This stub allows the project to build before Convex is fully configured
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 */
declare const fullApi: ApiFromModules<{
  leads: typeof import("../leads");
  quotes: typeof import("../quotes");
}>;

export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
