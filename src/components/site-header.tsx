'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/registry/new-york-v4/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/registry/new-york-v4/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/registry/new-york-v4/ui/sheet';

const products = [
  { name: 'Equipment Finance', href: '/products/equipment-finance', description: 'Tools, machinery & trade equipment' },
  { name: 'Vehicle Finance', href: '/products/vehicle-finance', description: 'Vans, trucks & work vehicles' },
  { name: 'Business Loans', href: '/products/business-loans', description: 'Flexible funding £5K - £500K' },
  { name: 'Asset Finance', href: '/products/asset-finance', description: 'Hire purchase & leasing' },
  { name: 'Cashflow Finance', href: '/products/cashflow-finance', description: 'Working capital solutions' },
  { name: 'Invoice Finance', href: '/products/invoice-finance', description: 'Unlock unpaid invoices' },
];

const trades = [
  { name: 'Electrician', href: '/trades/electrician' },
  { name: 'Plumber', href: '/trades/plumber' },
  { name: 'Builder', href: '/trades/builder' },
  { name: 'Carpenter', href: '/trades/carpenter' },
  { name: 'Heating Engineer', href: '/trades/heating-engineer' },
  { name: 'Roofer', href: '/trades/roofer' },
  { name: 'Landscaper', href: '/trades/landscaper' },
  { name: 'View All Trades', href: '/trades' },
];

const locations = [
  { name: 'London', href: '/trades/locations/greater-london' },
  { name: 'Birmingham', href: '/trades/locations/west-midlands' },
  { name: 'Manchester', href: '/trades/locations/greater-manchester' },
  { name: 'Leeds', href: '/trades/locations/west-yorkshire' },
  { name: 'Glasgow', href: '/trades/locations/glasgow' },
  { name: 'View All Locations', href: '/trades/locations' },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/95 backdrop-blur-md supports-[backdrop-filter]:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff6b35] text-white font-bold">
            TF
          </div>
          <span className="hidden font-bold text-white sm:inline-block">
            Tradesman Finance
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white data-[state=open]:bg-gray-800 data-[state=open]:text-white">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2 bg-gray-900 border border-gray-800 rounded-lg">
                  {products.map((product) => (
                    <li key={product.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={product.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium leading-none text-[#ff6b35]">
                            {product.name}
                          </div>
                          <p className="line-clamp-1 text-xs text-gray-400 mt-1">
                            {product.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white data-[state=open]:bg-gray-800 data-[state=open]:text-white">
                Trades
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-gray-900 border border-gray-800 rounded-lg">
                  {trades.map((trade) => (
                    <li key={trade.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={trade.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium leading-none text-gray-200">
                            {trade.name}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white data-[state=open]:bg-gray-800 data-[state=open]:text-white">
                Locations
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-gray-900 border border-gray-800 rounded-lg">
                  {locations.map((location) => (
                    <li key={location.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={location.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium leading-none text-gray-200">
                            {location.name}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/calculators"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none"
                >
                  Calculators
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none"
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <Button className="bg-[#ff6b35] hover:bg-[#e55a2b]">
              Get a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 hover:text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-950 border-l border-gray-800">
            <nav className="flex flex-col gap-4 mt-8">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[#ff6b35]">Products</h3>
                {products.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="block text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-4">
                <Link
                  href="/trades"
                  className="text-lg font-medium text-white hover:text-[#ff6b35] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Trades
                </Link>
              </div>
              <Link
                href="/trades/locations"
                className="text-lg font-medium text-white hover:text-[#ff6b35] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Locations
              </Link>
              <Link
                href="/calculators"
                className="text-lg font-medium text-white hover:text-[#ff6b35] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculators
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium text-white hover:text-[#ff6b35] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium text-white hover:text-[#ff6b35] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-800">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
