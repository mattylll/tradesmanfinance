/**
 * Global loading state for the application
 *
 * This component is automatically shown by Next.js during:
 * - Page transitions
 * - Data fetching with Suspense boundaries
 *
 * Uses a minimal loading indicator to avoid CLS and improve perceived performance.
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="text-center">
        {/* Animated logo/spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-gray-800 border-t-[#ff6b35] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] opacity-20 animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-sm font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
