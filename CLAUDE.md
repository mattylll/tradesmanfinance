# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting the Frontend
```bash
./start.sh
# Alternative methods:
python3 -m http.server 8080  # Recommended
php -S localhost:8080         # If PHP available
npx http-server -p 8080       # If Node.js available
```

Access the site at: http://localhost:8080

### Starting the Backend
```bash
cd backend
./setup.sh              # First time setup
npm install             # Install dependencies
npm run dev             # Development server with hot reload
npm run dev:api         # API server only
npm run dev:worker      # Queue worker only
npm start               # Production server
```

Backend API runs on: http://localhost:3001

### Testing & Quality Commands
```bash
# Backend testing
cd backend
npm test                # Run Jest tests
npm run lint            # ESLint check

# Database operations
npm run db:migrate      # Run migrations
npm run db:seed         # Seed database
```

### Production Deployment
```bash
./prepare-production.sh        # Create production-ready package
./validate-production.sh       # Validate production files
./deploy-to-siteground.sh     # Deploy to SiteGround hosting
```

### Required Services
- MongoDB (local or Atlas cloud)
- Redis (local or cloud)
- SendGrid account (email)
- Twilio account (SMS)
- GoHighLevel account (optional CRM)

## Architecture Overview

### Tech Stack
- **Frontend**: Pure HTML, CSS, JavaScript (no framework)
- **Backend**: Node.js + Express + MongoDB
- **Queue System**: Bull + Redis for job processing
- **Email**: SendGrid for transactional emails
- **SMS**: Twilio for text messaging
- **CRM**: GoHighLevel integration (optional)
- **Styling**: Custom CSS with industrial design system
- **Fonts**: Google Fonts (Bebas Neue, Work Sans, Roboto)

### Key Design System (industrial.css)
- **Colors**: Steel grays (#1a1a1a, #2d2d2d), Industrial orange (#ff6b35), Safety yellow (#ffd93d)
- **Typography**: Bebas Neue (headings), Work Sans (UI), Roboto (body)
- **Effects**: Brutal shadows, snap transitions, industrial animations

### Core Components

#### 1. Trade Finance Pages
- Individual landing pages for each trade (electrician, plumber, builder, etc.)
- Location-specific pages in `/trades/locations/[city]/[trade]-finance.html`
- Shared form configuration via `trade-form-configs.js`

#### 2. Interactive Elements
- **Loan Calculator**: Handled by `main.js` and `accessible-calculator.js`
- **Dropdown Navigation**: Managed by `dropdown-menu.js` with fixes in `dropdown-fix.css`
- **Stats Animations**: Counter animations in `stats-animation.js`
- **Industrial Animations**: Loading screens and transitions in `industrial-animations.js`

#### 3. Form System
- Dynamic trade-specific forms configured in `trade-form-configs.js`
- Form handling logic in `trade-forms.js`
- Stores data locally (no backend integration)

### File Organization
```
/
├── *.html                    # Main pages
├── trades/                   # Trade-specific pages
│   ├── [trade]-finance.html  # Individual trade pages
│   └── locations/            # Location-specific variations
├── includes/                 # Reusable HTML components
├── public/
│   ├── css/                  # Stylesheets (no preprocessors)
│   ├── js/                   # JavaScript (vanilla, no transpilation)
│   ├── images/              # Static assets
│   └── data/                # JSON data files
```

### CSS Architecture
Multiple CSS files for separation of concerns:
- `industrial.css`: Core design system
- `industrial-complete.css`: Extended components
- `*-fix.css`: Specific bug fixes and overrides
- Component-specific CSS (dropdown-menu, trade-forms, etc.)

### JavaScript Patterns
- All JavaScript is vanilla ES6+
- DOM manipulation via querySelector
- Event delegation for dynamic content
- No module system (all scripts loaded globally)

## Backend Architecture

### API Structure
- `/api/leads` - Lead management endpoints
- `/api/automations` - Workflow control
- `/api/webhooks` - External service webhooks
- `/api/admin` - Dashboard and reporting

### Key Backend Features
1. **Lead Scoring**: Automatic scoring based on finance amount, urgency, business metrics
2. **Multi-Channel Automation**: Email + SMS + Call triggers
3. **Queue Processing**: Bull + Redis async job handling for scalability
4. **Webhook Support**: GoHighLevel, Twilio, SendGrid integrations
5. **Real-time Notifications**: Instant alerts for high-value leads
6. **Worker Process**: Separate queue worker for background job processing

### Automation Workflows
- **New Lead**: Welcome → Sales Alert → Follow-ups → Nurturing
- **Urgency-Based Timing**: 
  - Urgent: 30 min → 2 hours → 24 hours
  - This Week: 2 hours → 24 hours → 3 days
  - This Month: 24 hours → 3 days → 7 days
  - Planning: 3 days → 7 days → 14 days
- **Business Hours**: SMS only sent during 9am-6pm Mon-Fri
- **Lead Assignment**: Auto-assign based on score (70+ = hot lead) and availability

## Important Considerations

1. **Full-Stack Application**: Frontend connects to Node.js backend API
2. **SEO Optimized**: Each page has unique meta tags and structured data
3. **Accessibility**: WCAG compliance with skip links, ARIA labels, keyboard navigation
4. **Performance**: Uses resource hints (preconnect, dns-prefetch) for external resources
5. **Responsive**: Mobile-first design with industrial aesthetic maintained across breakpoints
6. **Security**: Rate limiting, input validation, CORS configured
7. **Monitoring**: Winston logging, queue health checks, error tracking
8. **No Build Process**: Frontend uses vanilla JavaScript - no bundling or transpilation needed
9. **Form Storage**: Forms currently store data locally only - backend integration pending