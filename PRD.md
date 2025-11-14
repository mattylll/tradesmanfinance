# TradesmanFinance.co.uk - Product Requirements Document
**Version:** 2.0  
**Date:** January 2025  
**Status:** Active Development

---

## 1. Executive Summary

TradesmanFinance.co.uk is a finance brokerage website specifically designed for UK tradespeople. The site connects tradespeople with appropriate finance solutions for equipment, vehicles, and working capital needs. This PRD outlines a complete redesign focused on authentic, straight-talking communication that resonates with experienced tradespeople.

---

## 2. Brand Strategy

### 2.1 Brand Personality: "The Seasoned Professional"
Think of a master tradesman with 20+ years under their belt. They don't sugarcoat, they don't waste time with fluff, but when they speak, everyone listens because they know their stuff inside and out.

### 2.2 Tone Characteristics
- **Gruff but Caring**: "Look, I'll give it to you straight - no finance means no job. Simple as that."
- **Experience-Driven**: "I've seen every cowboy operation in the book, and that's not us."
- **Practical Wisdom**: "You want fancy words or do you want your invoice paid?"
- **Respectful Directness**: "You're running a business, not a charity. Let's get you the cash flow you need."

### 2.3 Key Differentiators
- No corporate finance-speak
- Industry understanding shown through language
- Visual authenticity with real tradespeople
- Transparent process without complexity
- Professional without being condescending

---

## 3. Visual Design System

### 3.1 Color Palette
```css
/* Primary Colors */
--deep-steel-blue: #2C5282;    /* Trust, reliability */
--light-steel: #F7FAFC;        /* Clean background */
--slate-gray: #4A5568;          /* Borders, secondary text */
--charcoal: #2D3748;            /* Text, shadows */

/* Accent Colors */
--success-green: #48BB78;      /* Positive actions */
--warning-amber: #ED8936;      /* Alerts, CTAs */
--error-red: #F56565;          /* Errors, urgent */

/* Neutral Scale */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

### 3.2 Typography System
```css
/* Font Stack */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', Monaco, Consolas, monospace;

/* Type Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### 3.3 Spacing System
```css
/* Spacing Scale (8px base) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### 3.4 Component Design Principles
- **Shadows**: Subtle depth (0 4px 6px rgba(0,0,0,0.1))
- **Borders**: Minimal, functional (1px solid var(--gray-200))
- **Radius**: Slight softness (4px default, 8px for cards)
- **Transitions**: Quick and efficient (200ms ease-out)
- **Hover States**: Clear but not dramatic
- **Focus States**: High contrast for accessibility

---

## 4. Content Strategy

### 4.1 Homepage Messaging

#### Hero Section
**Headline**: "Finance That Actually Works for Tradespeople"  
**Subheading**: "No corporate nonsense. No endless paperwork. Just the cash flow your business needs to keep moving."  
**CTA**: "Get Your Quote" / "Call Now: 020 3778 0274"

#### Problem Section
"You know the drill. Customer promises to pay in 30 days. Thirty becomes sixty. Sixty becomes 'the cheque's in the post.' Meanwhile, your suppliers want paying, your lads need wages, and you're juggling credit cards like a circus act."

#### Solution Section
"We've been doing this for 15 years. We know exactly how trade businesses work because we work with them every day. No algorithm deciding your fate - real people who understand that your van needs fuel tomorrow, not next month."

#### Process Section
"Here's how it actually works: You send us your invoice. We check it's legitimate (takes about an hour, not three weeks). Money hits your account. Customer pays us later. You get on with the job. Simple."

### 4.2 Service Pages Content Structure
1. **Clear Problem Statement** - What's breaking businesses
2. **Our Solution** - How we fix it (no jargon)
3. **The Numbers** - Rates, terms, amounts (transparent)
4. **The Process** - Step by step, no surprises
5. **Who Qualifies** - Straight answers
6. **Next Steps** - Clear action items

### 4.3 Trade-Specific Pages
Each trade page should include:
- Trade-specific challenges (e.g., "Electricians: Part P compliance costs")
- Relevant finance solutions
- Typical loan amounts for that trade
- Real examples (anonymized)
- Trade-specific testimonials

---

## 5. Technical Requirements

### 5.1 Performance Targets
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90
- **Core Web Vitals**: All green

### 5.2 Browser Support
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 5.3 Device Support
- Mobile: 320px minimum width
- Tablet: 768px breakpoint
- Desktop: 1024px+ optimal
- Large screens: Max width 1400px

### 5.4 Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- Color contrast ratios (4.5:1 minimum)
- Focus indicators on all interactive elements

### 5.5 SEO Requirements
- Semantic HTML structure
- Meta descriptions (150-160 chars)
- Open Graph tags
- Schema.org markup for local business
- XML sitemap
- Canonical URLs
- Mobile-friendly design

---

## 6. Page Inventory

### 6.1 Main Pages
1. Homepage (index.html)
2. About Us (about.html)
3. Services (services.html)
4. Contact (contact.html)
5. Privacy Policy (privacy-policy.html)
6. Accessibility Statement (accessibility-statement.html)

### 6.2 Trade Pages (20 total)
- electrician-finance.html
- plumber-finance.html
- builder-finance.html
- carpenter-finance.html
- heating-engineer-finance.html
- roofer-finance.html
- painter-decorator-finance.html
- plasterer-finance.html
- bathroom-fitter-finance.html
- kitchen-fitter-finance.html
- tiler-finance.html
- bricklayer-finance.html
- groundworker-finance.html
- scaffolder-finance.html
- landscaper-finance.html
- window-fitter-finance.html
- flooring-contractor-finance.html
- demolition-finance.html
- air-conditioning-finance.html
- shop-fitter-finance.html

### 6.3 Location Pages
19 major UK cities × 5 key trades = 95 location-specific pages
- Pattern: /trades/locations/[city]/[trade]-finance.html

---

## 7. Feature Requirements

### 7.1 Loan Calculator
- **Input Fields**: Loan amount, term length, credit rating
- **Output**: Monthly payment, total cost, APR range
- **Behavior**: Real-time calculation, no page reload
- **Validation**: Sensible min/max values

### 7.2 Lead Capture Forms
- **Required Fields**: Name, Business name, Email, Phone, Amount needed
- **Optional Fields**: Trade type, Urgency, Purpose
- **Validation**: Client-side and server-side
- **Confirmation**: Clear success message
- **Fallback**: Multiple submission options

### 7.3 Trust Indicators
- FCA authorization badge
- Years in business counter
- Number of businesses helped
- Trustpilot/Google reviews widget
- Industry association logos
- Security badges (SSL, data protection)

### 7.4 Contact Options
- Click-to-call phone numbers
- WhatsApp Business integration
- Live chat (business hours only)
- Contact form
- Email address (visible)
- Callback request

---

## 8. Debug Framework Requirements

### 8.1 Console Debugging
- Categorized logging (INFO, WARN, ERROR, DEBUG)
- Performance metrics tracking
- Network request monitoring
- Form submission tracking
- User interaction logging

### 8.2 Visual Debug Mode
- CSS load verification
- JavaScript error indicators
- Network status display
- Performance metrics overlay
- Responsive breakpoint indicators

### 8.3 Error Handling
- Graceful fallbacks for all features
- User-friendly error messages
- Error reporting to console
- Recovery suggestions
- Offline mode detection

---

## 9. Development Phases

### Phase 1: Foundation (Sprint 1)
- Design system implementation
- Debug framework setup
- Component library creation

### Phase 2: Core Pages (Sprint 2)
- Homepage redesign
- Main page templates
- Navigation system

### Phase 3: Trade Pages (Sprint 3)
- Trade page template
- Content population
- Internal linking

### Phase 4: Location Pages (Sprint 4)
- Location template system
- SEO optimization
- Sitemap generation

### Phase 5: Interactive Features (Sprint 5)
- Form system
- Calculator enhancement
- Lead capture

### Phase 6: Polish & Launch (Sprint 6)
- Testing & QA
- Performance optimization
- Launch preparation

---

## 10. Success Metrics

### 10.1 User Metrics
- Bounce rate < 40%
- Average session duration > 2 minutes
- Pages per session > 3
- Mobile usage > 60%

### 10.2 Conversion Metrics
- Form completion rate > 15%
- Phone call clicks > 5%
- Calculator usage > 30%
- Quote requests > 10% of visitors

### 10.3 Technical Metrics
- Page load time < 3 seconds
- Zero JavaScript errors
- 100% uptime
- Mobile usability score > 95

---

## 11. Competitive Analysis Notes

### Key Competitors
1. **ideal4finance.com** - Corporate, clean, lacks personality
2. **kandoo.co.uk** - Modern but generic, no trade focus
3. **iwoca.co.uk** - Tech-forward but too complex

### Our Differentiation
- Authentic trade-focused messaging
- No-nonsense design approach
- Transparent process explanation
- Real tradesperson imagery
- Industry-specific understanding

---

## 12. Risk Mitigation

### Technical Risks
- **CSS Loading Issues**: Multiple fallback styles
- **JavaScript Failures**: Progressive enhancement
- **Form Submission Failures**: Multiple submission methods
- **Browser Incompatibility**: Graceful degradation

### Business Risks
- **Low Conversion**: A/B testing capability
- **Poor SEO Performance**: Technical SEO checklist
- **Mobile Experience**: Mobile-first development
- **Accessibility Issues**: Regular audits

---

## 13. Maintenance & Updates

### Regular Updates
- Content refresh quarterly
- Testimonial updates monthly
- Rate updates as needed
- Blog posts weekly (if applicable)

### Technical Maintenance
- Security updates monthly
- Performance monitoring daily
- Backup schedule daily
- Analytics review weekly

---

## Appendix A: Messaging Examples

### Headlines That Work
- "Get Paid Tomorrow, Not Next Quarter"
- "Your Invoice Is Worth Cash Today"
- "Stop Being Your Customer's Bank"
- "Equipment Finance Without the Runaround"

### Headlines to Avoid
- "Empowering Trade Businesses" (too corporate)
- "Your Success Is Our Mission" (meaningless)
- "Innovative Finance Solutions" (jargon)
- "Transform Your Cash Flow" (overselling)

---

## Appendix B: Visual References

### Good Examples
- Clean, readable layouts
- Authentic workplace photography
- Clear data presentation
- Simple, effective icons

### Avoid
- Stock photos of people in suits
- Purple gradients or "fintech" aesthetics
- Overcomplicated graphics
- Excessive animations

---

**Document Version History**
- v2.0 - January 2025 - Complete redesign specification
- v1.0 - Original specification (deprecated)

**Document Owner**: TradesmanFinance.co.uk Development Team  
**Last Updated**: January 2025  
**Next Review**: February 2025