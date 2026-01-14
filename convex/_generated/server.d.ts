/* eslint-disable */
/**
 * Generated server stub - will be replaced when running `npx convex dev`
 * This stub allows the project to build before Convex is fully configured
 */

import {
  GenericMutationCtx,
  GenericQueryCtx,
  GenericActionCtx,
  GenericDataModel,
} from "convex/server";
import { DataModel } from "./dataModel";

/**
 * Define a query in this Convex app's public API.
 */
export declare const query: import("convex/server").QueryBuilder<
  DataModel,
  "public"
>;

/**
 * Define a mutation in this Convex app's public API.
 */
export declare const mutation: import("convex/server").MutationBuilder<
  DataModel,
  "public"
>;

/**
 * Define an action in this Convex app's public API.
 */
export declare const action: import("convex/server").ActionBuilder<
  DataModel,
  "public"
>;

/**
 * Define an internal query.
 */
export declare const internalQuery: import("convex/server").QueryBuilder<
  DataModel,
  "internal"
>;

/**
 * Define an internal mutation.
 */
export declare const internalMutation: import("convex/server").MutationBuilder<
  DataModel,
  "internal"
>;

/**
 * Define an internal action.
 */
export declare const internalAction: import("convex/server").ActionBuilder<
  DataModel,
  "internal"
>;
