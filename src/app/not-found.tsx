import Link from "next/link";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import {
  Home,
  Search,
  Phone,
  ArrowRight,
  Wrench,
  MapPin,
  HelpCircle,
} from "lucide-react";

export default function NotFound() {
  const popularPages = [
    {
      title: "Electrician Finance",
      href: "/trades/electrician",
      icon: Wrench,
    },
    {
      title: "Plumber Finance",
      href: "/trades/plumber",
      icon: Wrench,
    },
    {
      title: "Builder Finance",
      href: "/trades/builder",
      icon: Wrench,
    },
    {
      title: "All Trades",
      href: "/trades",
      icon: Search,
    },
    {
      title: "Find by Location",
      href: "/trades/locations",
      icon: MapPin,
    },
    {
      title: "Contact Us",
      href: "/contact",
      icon: Phone,
    },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Display */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. It may have been moved,
              deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/trades">
                <Search className="mr-2 h-4 w-4" />
                Browse Trades
              </Link>
            </Button>
          </div>

          {/* Popular Pages */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-bold mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Looking for something specific?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {popularPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted hover:border-primary/50 transition-colors text-sm"
                  >
                    <page.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{page.title}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              Still can't find what you need?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Contact our team for help
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
