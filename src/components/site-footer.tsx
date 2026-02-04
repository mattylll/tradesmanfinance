import Link from 'next/link';
import { FooterTrustBadges } from '@/components/seo/trust-signals';
import { Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/tradesman-finance/',
    icon: Linkedin,
    active: true,
  },
  {
    name: 'Facebook',
    href: '#', // Placeholder - update with actual URL
    icon: Facebook,
    active: false,
  },
  {
    name: 'X (Twitter)',
    href: '#', // Placeholder - update with actual URL
    icon: Twitter,
    active: false,
  },
  {
    name: 'Instagram',
    href: '#', // Placeholder - update with actual URL
    icon: Instagram,
    active: false,
  },
];

const footerLinks = {
  trades: [
    { name: 'Electrician Finance', href: '/trades/electrician' },
    { name: 'Plumber Finance', href: '/trades/plumber' },
    { name: 'Builder Finance', href: '/trades/builder' },
    { name: 'Carpenter Finance', href: '/trades/carpenter' },
    { name: 'Heating Engineer Finance', href: '/trades/heating-engineer' },
    { name: 'All Trades', href: '/trades' },
  ],
  locations: [
    { name: 'London', href: '/trades/locations/greater-london' },
    { name: 'Birmingham', href: '/trades/locations/west-midlands' },
    { name: 'Manchester', href: '/trades/locations/greater-manchester' },
    { name: 'Leeds', href: '/trades/locations/west-yorkshire' },
    { name: 'All Locations', href: '/trades/locations' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white font-bold">
                TF
              </div>
              <span className="font-bold">Tradesman Finance</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Specialist equipment finance and business loans for UK tradesmen.
              Get the equipment you need to grow your business.
            </p>

            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-foreground">Follow Us</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return social.active ? (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-600 text-white hover:bg-orange-700 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ) : (
                    <span
                      key={social.name}
                      aria-label={`${social.name} - Coming soon`}
                      title={`${social.name} - Coming soon`}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trades */}
          <div>
            <h3 className="font-semibold mb-4">Trades</h3>
            <ul className="space-y-2">
              {footerLinks.trades.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold mb-4">Popular Locations</h3>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges - E-E-A-T Signals */}
        <div className="mt-12 pt-8 border-t">
          <FooterTrustBadges />
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Tradesman Finance UK. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Tradesman Finance is a trading name. Specialist non-regulated business finance for UK trade companies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
