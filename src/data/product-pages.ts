/**
 * Product Pages Data
 * Comprehensive content for all finance product pages
 * Addresses SEO, trust signals, and content depth requirements
 */

export interface ProductTestimonial {
  quote: string;
  name: string;
  trade: string;
  business: string;
  location: string;
  amount: string;
  rating: number;
}

export interface FinanceTypeInfo {
  name: string;
  description: string;
  ownAsset: boolean;
  taxBenefits: string;
  bestFor: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductPageData {
  slug: string;
  name: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  accentColor: string;

  // Consistent messaging - pick ONE decision time
  decisionTime: string; // e.g., "4 hours", "24 hours", "same day"
  decisionTimeDisplay: string; // e.g., "4hr Decisions", "Same-Day Decisions"

  // Real phone number
  phoneNumber: string;
  phoneDisplay: string;

  // Rate indication for transparency
  ratesFrom: string; // e.g., "5.9% APR"
  representativeExample?: {
    amount: string;
    term: string;
    monthlyPayment: string;
    totalRepayable: string;
    apr: string;
  };

  // Finance range
  minFinance: string;
  maxFinance: string;
  minTerm: string;
  maxTerm: string;
  minDeposit: string;

  // Hero stats (3 key stats)
  heroStats: Array<{
    value: string;
    label: string;
  }>;

  // Benefits with accurate descriptions
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  // Categories/Types for this product
  categories: Array<{
    title: string;
    items: string[];
    image?: string;
  }>;

  // Finance types with clear explanation
  financeTypes: FinanceTypeInfo[];

  // Expanded FAQs (8-10 per product)
  faqs: ProductFAQ[];

  // Testimonials (2-3 per product)
  testimonials: ProductTestimonial[];

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// Real phone number for the business
const PHONE_NUMBER = "0800 086 9015";
const PHONE_DISPLAY = "0800 086 9015";

export const productPages: Record<string, ProductPageData> = {
  'vehicle-finance': {
    slug: 'vehicle-finance',
    name: 'Vehicle Finance',
    heroTitle: 'Get Your Work Van on the Road',
    heroHighlight: 'Van',
    heroDescription: 'Finance your work vehicle with flexible terms and competitive rates. From vans to trucks, we specialise in getting tradesmen mobile.',
    accentColor: '#0ea5a5',

    // Consistent messaging - lead with fastest realistic time
    decisionTime: '4 hours',
    decisionTimeDisplay: '4hr Decisions',

    phoneNumber: PHONE_NUMBER,
    phoneDisplay: PHONE_DISPLAY,

    // Rate transparency
    ratesFrom: '6.9% APR',
    representativeExample: {
      amount: '£25,000',
      term: '48 months',
      monthlyPayment: '£590',
      totalRepayable: '£28,320',
      apr: '8.9% APR representative',
    },

    minFinance: '£5,000',
    maxFinance: '£100,000',
    minTerm: '12 months',
    maxTerm: '60 months',
    minDeposit: '0%',

    heroStats: [
      { value: '£100K', label: 'Max Finance' },
      { value: '0%', label: 'Min Deposit' },
      { value: '5yrs', label: 'Max Term' },
    ],

    benefits: [
      {
        title: '4-Hour Decisions',
        description: 'Get a decision on your vehicle finance within 4 hours of application',
        icon: 'Clock',
      },
      {
        title: 'Rates from 6.9% APR',
        description: 'Competitive rates from our panel of specialist trade lenders',
        icon: 'Percent',
      },
      {
        title: 'Flexible Deposits',
        description: 'Choose from 0% to 20% deposit - whatever suits your cashflow',
        icon: 'Calculator',
      },
      {
        title: 'Own the Vehicle',
        description: 'With HP finance, the vehicle is yours at the end of the agreement',
        icon: 'Shield',
      },
    ],

    categories: [
      {
        title: 'Vans',
        items: ['Ford Transit', 'Mercedes Sprinter', 'VW Transporter', 'Renault Trafic', 'Citroen Berlingo'],
      },
      {
        title: 'Pickup Trucks',
        items: ['Ford Ranger', 'Toyota Hilux', 'Nissan Navara', 'Mitsubishi L200', 'VW Amarok'],
      },
      {
        title: 'Commercial Vehicles',
        items: ['Box trucks', 'Flatbed trucks', 'Luton vans', 'Dropside trucks', 'Tipper trucks'],
      },
      {
        title: 'Specialist Vehicles',
        items: ['Cherry pickers', 'Refrigerated vans', 'Tool storage vans', 'Mobile workshops', 'Welfare units'],
      },
    ],

    financeTypes: [
      {
        name: 'Hire Purchase (HP)',
        description: 'You pay fixed monthly instalments and own the vehicle outright once all payments are made. The vehicle is used as security for the loan.',
        ownAsset: true,
        taxBenefits: 'Claim capital allowances on the full purchase price. Interest payments are tax-deductible as a business expense.',
        bestFor: 'Tradesmen who want to own their vehicle outright and claim tax relief on the purchase.',
      },
      {
        name: 'Lease Purchase',
        description: 'Similar to HP but with lower monthly payments and a larger final "balloon" payment at the end of the term.',
        ownAsset: true,
        taxBenefits: 'Capital allowances claimable. Interest is a deductible expense.',
        bestFor: 'Those who want to own the vehicle but need lower monthly outgoings during the term.',
      },
      {
        name: 'Contract Hire (Leasing)',
        description: 'You rent the vehicle for a fixed period with fixed monthly payments. Return the vehicle at the end - you never own it.',
        ownAsset: false,
        taxBenefits: 'Monthly payments are 100% tax-deductible as a business expense if used solely for business.',
        bestFor: 'Tradesmen who want a new vehicle every 2-4 years and prefer not to deal with selling.',
      },
    ],

    faqs: [
      {
        question: 'Can I finance a used van?',
        answer: 'Yes, we finance both new and used vehicles. For used vehicles, we typically require them to be under 7 years old at the end of the agreement with reasonable mileage. Many tradesmen prefer quality used vans as they offer better value.',
      },
      {
        question: 'What deposit do I need for van finance?',
        answer: 'We offer flexible deposit options from 0% to 20%. A larger deposit typically means lower monthly payments and may secure better rates. However, many tradesmen prefer the 0% option to preserve working capital.',
      },
      {
        question: 'How long can I spread van finance payments?',
        answer: 'Vehicle finance terms range from 12 to 60 months. Longer terms mean lower monthly payments but more interest overall. Most tradesmen choose 36-48 months as a good balance.',
      },
      {
        question: 'What\'s the difference between HP and leasing?',
        answer: 'With Hire Purchase (HP), you own the vehicle after the final payment and can claim capital allowances. With leasing (Contract Hire), you return the vehicle at the end but monthly payments are fully tax-deductible. HP is better if you want to own the van; leasing suits those who want a new vehicle every few years.',
      },
      {
        question: 'Can I get van finance if I\'m self-employed?',
        answer: 'Yes, we specialise in financing for self-employed tradesmen. We look at your trading history and ability to repay rather than just employment status. Most self-employed applicants need 6+ months of trading history.',
      },
      {
        question: 'What credit score do I need for van finance?',
        answer: 'We consider all credit histories, including those with past issues. While a good credit score helps secure the best rates, we have lenders who specialise in helping tradesmen with less-than-perfect credit. We look at the full picture, not just a score.',
      },
      {
        question: 'Can I upgrade my van during the finance agreement?',
        answer: 'Yes, many of our finance options allow early settlement if you want to upgrade. There may be a settlement fee, but we can often roll any remaining balance into the new agreement, making it easy to upgrade when your business grows.',
      },
      {
        question: 'What happens at the end of the van finance agreement?',
        answer: 'With HP: you own the van outright and can keep using it, sell it, or part-exchange for a new one. With Lease: you return the van (meeting fair wear and mileage terms) and can start a new agreement on a newer vehicle.',
      },
      {
        question: 'Is van finance tax-efficient for tradesmen?',
        answer: 'Yes. With HP, you can claim capital allowances (up to 100% in year one for new commercial vehicles under the Annual Investment Allowance) plus deduct interest as an expense. With leasing, 100% of payments are deductible if used for business. Consult your accountant for advice specific to your situation.',
      },
      {
        question: 'How quickly can I get my van after approval?',
        answer: 'Once approved and paperwork is signed, funds are typically released within 24-48 hours. If buying from a dealer, they can usually release the vehicle within a few days of receiving payment.',
      },
    ],

    testimonials: [
      {
        quote: 'Needed to replace my Transit sharpish after it died. Got approved in 3 hours and had the new van by Friday. The monthly payments actually worked out less than I expected.',
        name: 'Dave M.',
        trade: 'Plumber',
        business: 'DM Plumbing Services',
        location: 'Birmingham',
        amount: '£28,000',
        rating: 5,
      },
      {
        quote: 'First time getting finance as a new business. Other places turned me down but these guys looked at my order book and got me approved. Brilliant service.',
        name: 'Chris T.',
        trade: 'Electrician',
        business: 'CT Electrical',
        location: 'Manchester',
        amount: '£22,000',
        rating: 5,
      },
      {
        quote: 'Upgraded from a small van to a proper Sprinter with racking. The HP option means I own it outright in 4 years and my accountant loves the tax benefits.',
        name: 'Steve R.',
        trade: 'Carpenter',
        business: 'S.R. Joinery',
        location: 'Leeds',
        amount: '£35,000',
        rating: 5,
      },
    ],

    metaTitle: 'Van Finance for Tradesmen | 0% Deposit, 4hr Decisions | Tradesman Finance',
    metaDescription: 'Finance your work van with 0% deposit options and 4-hour decisions. Flexible terms from 1-5 years for all trades. Rates from 6.9% APR. Get your free quote today.',
    keywords: ['van finance', 'vehicle finance tradesmen', 'work van finance', 'commercial vehicle finance', 'van HP', 'van leasing tradesmen'],
  },

  'equipment-finance': {
    slug: 'equipment-finance',
    name: 'Equipment Finance',
    heroTitle: 'Finance the Tools You Need to Grow',
    heroHighlight: 'Tools',
    heroDescription: 'Get the specialist equipment your trade business needs without the upfront cost. From power tools to heavy machinery, we make equipment finance simple.',
    accentColor: '#ff6b35',

    decisionTime: '4 hours',
    decisionTimeDisplay: '4hr Decisions',

    phoneNumber: PHONE_NUMBER,
    phoneDisplay: PHONE_DISPLAY,

    ratesFrom: '5.9% APR',
    representativeExample: {
      amount: '£10,000',
      term: '36 months',
      monthlyPayment: '£310',
      totalRepayable: '£11,160',
      apr: '7.9% APR representative',
    },

    minFinance: '£1,000',
    maxFinance: '£500,000',
    minTerm: '12 months',
    maxTerm: '60 months',
    minDeposit: '0%',

    heroStats: [
      { value: '£500K', label: 'Max Finance' },
      { value: '4hrs', label: 'Decision Time' },
      { value: '92%', label: 'Approval Rate' },
    ],

    benefits: [
      {
        title: '4-Hour Decisions',
        description: 'Get a decision within 4 hours of your application - often faster',
        icon: 'Clock',
      },
      {
        title: 'Fixed Monthly Payments',
        description: 'Budget with confidence - your payments stay the same throughout',
        icon: 'Shield',
      },
      {
        title: 'Fast Funding',
        description: 'Funds typically released within 48 hours of approval',
        icon: 'Zap',
      },
      {
        title: 'Rates from 5.9% APR',
        description: 'Competitive rates from our panel of specialist lenders',
        icon: 'Percent',
      },
    ],

    categories: [
      {
        title: 'Power Tools',
        items: ['Drills & drivers', 'Circular saws', 'Impact wrenches', 'Sanders & grinders', 'Nail guns'],
      },
      {
        title: 'Diagnostic Equipment',
        items: ['Multimeters', 'Thermal cameras', 'Pipe inspection cameras', 'Pressure testers', 'Gas analysers'],
      },
      {
        title: 'Heavy Machinery',
        items: ['Mini excavators', 'Scaffolding systems', 'Lifts & platforms', 'Compressors', 'Generators'],
      },
      {
        title: 'Specialist Equipment',
        items: ['Welding equipment', 'Pipe threading machines', 'Cable pullers', 'HVAC equipment', 'Testing rigs'],
      },
    ],

    financeTypes: [
      {
        name: 'Hire Purchase (HP)',
        description: 'Fixed monthly payments with ownership at the end. The equipment serves as security for the finance.',
        ownAsset: true,
        taxBenefits: 'Claim capital allowances (up to 100% under AIA for qualifying equipment). Interest is tax-deductible.',
        bestFor: 'Equipment you\'ll use for years and want to own outright.',
      },
      {
        name: 'Finance Lease',
        description: 'Lower monthly payments than HP. At the end, you can continue leasing at a reduced rate, return, or sell on our behalf.',
        ownAsset: false,
        taxBenefits: 'Full rental payments are tax-deductible. Particularly beneficial for high-value equipment.',
        bestFor: 'High-value equipment where you want lower monthly costs and full tax deductibility.',
      },
      {
        name: 'Operating Lease',
        description: 'Rent equipment for a fixed period at fixed monthly cost. Upgrade to newer equipment at the end.',
        ownAsset: false,
        taxBenefits: 'Full payments deductible. Equipment stays off your balance sheet.',
        bestFor: 'Technology or equipment that quickly becomes outdated and needs regular upgrading.',
      },
    ],

    faqs: [
      {
        question: 'What equipment can I finance?',
        answer: 'We finance virtually any trade equipment - from hand tools and power tools to heavy machinery, diagnostic equipment, vehicles, and specialist tools. If it helps your business, we can likely finance it. The minimum is £1,000.',
      },
      {
        question: 'How much can I borrow for equipment?',
        answer: 'Equipment finance is available from £1,000 to £500,000 depending on your business circumstances and the equipment value. For amounts over £100,000, we may require additional documentation.',
      },
      {
        question: 'Do I need a deposit for equipment finance?',
        answer: 'Many of our equipment finance options require no deposit. However, putting down a deposit (typically 10-20%) can reduce your monthly payments and may help secure a better interest rate.',
      },
      {
        question: 'Can I finance used equipment?',
        answer: 'Yes, we can finance both new and used equipment, as long as it\'s in good working condition and from a reputable supplier. For used equipment, we may ask for an independent valuation.',
      },
      {
        question: 'What\'s the difference between HP and leasing for equipment?',
        answer: 'With Hire Purchase, you own the equipment after the final payment and can claim capital allowances. With leasing, you return or sell the equipment at the end, but monthly payments are fully tax-deductible. HP suits equipment you\'ll keep long-term; leasing suits equipment you\'ll upgrade regularly.',
      },
      {
        question: 'Can I get equipment finance with bad credit?',
        answer: 'Yes, we consider all credit backgrounds. We look at your trading history, current work pipeline, and ability to repay - not just your credit score. Many of our successful applicants have had credit issues in the past.',
      },
      {
        question: 'How quickly can I get the equipment after approval?',
        answer: 'Once approved and paperwork signed, we can pay the supplier within 24-48 hours. Some suppliers hold stock and can deliver immediately; others may have lead times.',
      },
      {
        question: 'Can I finance equipment from any supplier?',
        answer: 'Yes, you can choose your own supplier - whether that\'s a major retailer like Screwfix or Toolstation, a specialist supplier, or even a private sale. We pay the supplier directly once approved.',
      },
      {
        question: 'Is equipment finance tax-efficient?',
        answer: 'Yes. With HP, you can claim capital allowances (potentially 100% in year one under the Annual Investment Allowance) plus deduct interest. With leasing, 100% of payments are deductible. Always consult your accountant for advice specific to your situation.',
      },
      {
        question: 'What happens if the equipment breaks down?',
        answer: 'You\'re responsible for maintenance and repairs during the finance term, just like if you\'d bought it outright. We recommend equipment insurance or extended warranties for high-value items.',
      },
    ],

    testimonials: [
      {
        quote: 'Financed a complete Festool dust extraction system. The monthly payments are manageable and the gear pays for itself on every job. Should have done it years ago.',
        name: 'Mark J.',
        trade: 'Carpenter',
        business: 'MJ Carpentry',
        location: 'Bristol',
        amount: '£8,500',
        rating: 5,
      },
      {
        quote: 'Got a thermal imaging camera and full Megger test kit on finance. Win work I couldn\'t before and the equipment\'s already paid for itself.',
        name: 'Tony B.',
        trade: 'Electrician',
        business: 'T.B. Electrical Services',
        location: 'Sheffield',
        amount: '£12,000',
        rating: 5,
      },
      {
        quote: 'We financed a mini excavator and it\'s transformed what jobs we can take on. The process was straightforward and the payments fit our cashflow.',
        name: 'Paul & Sons',
        trade: 'Groundworkers',
        business: 'Paul & Sons Groundworks',
        location: 'Kent',
        amount: '£45,000',
        rating: 5,
      },
    ],

    metaTitle: 'Equipment Finance for Tradesmen | Rates from 5.9% APR | Tradesman Finance',
    metaDescription: 'Finance trade equipment from £1,000 to £500,000. 4-hour decisions, 0% deposit options, rates from 5.9% APR. Power tools to heavy machinery. Get your free quote.',
    keywords: ['equipment finance', 'tool finance', 'trade equipment finance', 'power tool finance', 'machinery finance'],
  },

  'business-loans': {
    slug: 'business-loans',
    name: 'Business Loans',
    heroTitle: 'Flexible Funding for Your Trade Business',
    heroHighlight: 'Funding',
    heroDescription: 'Unsecured business loans designed for tradesmen. Use the funds for anything your business needs - expansion, stock, marketing, or bridging cashflow gaps.',
    accentColor: '#6366f1',

    decisionTime: 'same day',
    decisionTimeDisplay: 'Same-Day Decisions',

    phoneNumber: PHONE_NUMBER,
    phoneDisplay: PHONE_DISPLAY,

    ratesFrom: '7.9% APR',
    representativeExample: {
      amount: '£25,000',
      term: '36 months',
      monthlyPayment: '£795',
      totalRepayable: '£28,620',
      apr: '9.9% APR representative',
    },

    minFinance: '£5,000',
    maxFinance: '£500,000',
    minTerm: '6 months',
    maxTerm: '60 months',
    minDeposit: 'N/A',

    heroStats: [
      { value: '£500K', label: 'Max Loan' },
      { value: 'Same Day', label: 'Decisions' },
      { value: 'Unsecured', label: 'No Assets Needed' },
    ],

    benefits: [
      {
        title: 'Same-Day Decisions',
        description: 'Apply in the morning, get a decision by end of day',
        icon: 'Clock',
      },
      {
        title: 'Unsecured Options',
        description: 'No need to put up property or vehicles as security',
        icon: 'Shield',
      },
      {
        title: 'Use for Anything',
        description: 'Stock, expansion, marketing, staff - you decide how to use it',
        icon: 'Zap',
      },
      {
        title: 'Rates from 7.9% APR',
        description: 'Competitive rates based on your business profile',
        icon: 'Percent',
      },
    ],

    categories: [
      {
        title: 'Growth & Expansion',
        items: ['Take on larger contracts', 'Open new premises', 'Enter new markets', 'Hire additional staff'],
      },
      {
        title: 'Stock & Materials',
        items: ['Bulk buy materials', 'Seasonal stock', 'Supplier discounts', 'New product lines'],
      },
      {
        title: 'Marketing & Sales',
        items: ['Website & digital marketing', 'Vehicle livery', 'Trade show attendance', 'Brand development'],
      },
      {
        title: 'Cashflow Management',
        items: ['Bridge payment gaps', 'Cover slow-paying clients', 'Seasonal fluctuations', 'Tax payments'],
      },
    ],

    financeTypes: [
      {
        name: 'Unsecured Business Loan',
        description: 'Borrow based on your business performance without putting up assets as security. Higher rates but lower risk to your assets.',
        ownAsset: true,
        taxBenefits: 'Interest payments are tax-deductible as a business expense.',
        bestFor: 'Quick funding needs where you don\'t want to risk assets.',
      },
      {
        name: 'Secured Business Loan',
        description: 'Use property, vehicles, or equipment as security for lower rates and higher borrowing limits.',
        ownAsset: true,
        taxBenefits: 'Interest payments are tax-deductible. Potential capital allowances if used to buy assets.',
        bestFor: 'Larger amounts where you have assets to secure against and want the best rates.',
      },
    ],

    faqs: [
      {
        question: 'What can I use a business loan for?',
        answer: 'Anything that helps your business - expansion, equipment, stock, staff, marketing, cashflow, refurbishment, or working capital. Unlike equipment finance, there are no restrictions on how you use the funds.',
      },
      {
        question: 'How much can I borrow?',
        answer: 'Business loans range from £5,000 to £500,000. The amount you can borrow depends on your annual turnover, trading history, and credit profile. Typically, you can borrow up to 50% of annual turnover.',
      },
      {
        question: 'Do I need to put up security?',
        answer: 'Not always. We offer unsecured business loans up to £250,000 based on your business performance. For larger amounts or better rates, secured options using property or assets are available.',
      },
      {
        question: 'How long have I been trading to qualify?',
        answer: 'Most lenders require at least 6-12 months of trading history. Some start-up loans are available for newer businesses with strong business plans, though rates may be higher.',
      },
      {
        question: 'What documents do I need to apply?',
        answer: 'Typically: 3 months\' business bank statements, latest accounts or tax returns, proof of identity, and proof of address. We can often get an initial decision with just bank statements.',
      },
      {
        question: 'How quickly can I get the money?',
        answer: 'Same-day decisions are standard. Once approved and paperwork signed, funds are usually in your account within 24-48 hours. For urgent needs, some lenders offer same-day funding.',
      },
      {
        question: 'Will applying affect my credit score?',
        answer: 'Initial quotes use a "soft search" that doesn\'t affect your credit score. A full credit check (which may leave a mark) only happens when you formally apply after accepting a quote.',
      },
      {
        question: 'Can I repay early?',
        answer: 'Yes, most of our business loans allow early repayment. Some have early settlement fees (typically 1-2 months\' interest), while others have no penalties. We\'ll confirm the terms before you commit.',
      },
      {
        question: 'Is business loan interest tax-deductible?',
        answer: 'Yes, interest on business loans is a tax-deductible expense. This effectively reduces the real cost of borrowing. Consult your accountant for advice specific to your situation.',
      },
      {
        question: 'Can I get a business loan with bad credit?',
        answer: 'Yes, we work with lenders who consider all credit backgrounds. Your trading history and current business performance often matter more than past credit issues. Rates may be higher but options exist.',
      },
    ],

    testimonials: [
      {
        quote: 'Needed working capital to take on a big contract. Got approved for £40k in one day and had the money 48 hours later. That contract made us £25k profit.',
        name: 'James K.',
        trade: 'Builder',
        business: 'JK Construction',
        location: 'Liverpool',
        amount: '£40,000',
        rating: 5,
      },
      {
        quote: 'Used the loan to bulk-buy materials when suppliers had a sale. Saved 20% on materials for 6 months\' worth of jobs. The loan interest was nothing compared to the savings.',
        name: 'Alan P.',
        trade: 'Plumber',
        business: 'A.P. Heating & Plumbing',
        location: 'Newcastle',
        amount: '£15,000',
        rating: 5,
      },
      {
        quote: 'Took a loan to invest in marketing and a new website. Enquiries doubled within 3 months. Best business decision I\'ve made.',
        name: 'Sarah L.',
        trade: 'Decorator',
        business: 'SL Decorating',
        location: 'Oxford',
        amount: '£8,000',
        rating: 5,
      },
    ],

    metaTitle: 'Business Loans for Tradesmen | Same-Day Decisions | Tradesman Finance',
    metaDescription: 'Flexible business loans from £5,000 to £500,000 for UK tradesmen. Same-day decisions, unsecured options, rates from 7.9% APR. Apply for your free quote today.',
    keywords: ['business loans tradesmen', 'trade business loan', 'unsecured business loan', 'working capital loan', 'small business loan'],
  },

  'invoice-finance': {
    slug: 'invoice-finance',
    name: 'Invoice Finance',
    heroTitle: 'Unlock Cash Tied Up in Invoices',
    heroHighlight: 'Cash',
    heroDescription: 'Stop waiting 30, 60, or 90 days to get paid. Release up to 90% of your invoice value within 24 hours and improve your cashflow overnight.',
    accentColor: '#f59e0b',

    decisionTime: '24 hours',
    decisionTimeDisplay: '24hr Setup',

    phoneNumber: PHONE_NUMBER,
    phoneDisplay: PHONE_DISPLAY,

    ratesFrom: '0.5% per invoice',

    minFinance: '£10,000',
    maxFinance: '£2,000,000',
    minTerm: 'Flexible',
    maxTerm: 'Ongoing',
    minDeposit: 'N/A',

    heroStats: [
      { value: '90%', label: 'Advance Rate' },
      { value: '24hrs', label: 'Funds Released' },
      { value: '£2M', label: 'Max Facility' },
    ],

    benefits: [
      {
        title: 'Get Paid in 24 Hours',
        description: 'Release up to 90% of invoice value the same day you raise it',
        icon: 'Zap',
      },
      {
        title: 'Improve Cashflow',
        description: 'Never wait weeks or months for payment again',
        icon: 'TrendingUp',
      },
      {
        title: 'Take on Bigger Jobs',
        description: 'Fund materials and wages while waiting for payment',
        icon: 'Shield',
      },
      {
        title: 'Simple Fees',
        description: 'Typically 0.5-2% per invoice - no hidden charges',
        icon: 'Percent',
      },
    ],

    categories: [
      {
        title: 'Invoice Factoring',
        items: ['Release 90% of invoice value upfront', 'Factor company handles collections', 'Best for high-volume invoicing', 'Credit control included'],
      },
      {
        title: 'Invoice Discounting',
        items: ['Confidential - clients don\'t know', 'You maintain customer relationships', 'You handle collections', 'Best for established businesses'],
      },
      {
        title: 'Selective Invoice Finance',
        items: ['Choose which invoices to finance', 'Pay only for what you use', 'No ongoing commitment', 'Ideal for occasional cashflow gaps'],
      },
      {
        title: 'Construction Finance',
        items: ['Application/certificate-based lending', 'Stage payment financing', 'Retention release', 'Specialist construction focus'],
      },
    ],

    financeTypes: [
      {
        name: 'Invoice Factoring',
        description: 'Sell your invoices to a factoring company who advance you 80-90% immediately and handle collections. They pay you the balance (minus fees) when your customer pays.',
        ownAsset: true,
        taxBenefits: 'Factoring fees are tax-deductible as a business expense.',
        bestFor: 'Businesses with many invoices who want to outsource credit control.',
      },
      {
        name: 'Invoice Discounting',
        description: 'Like factoring, but confidential. You continue to collect payments from customers who don\'t know you\'re using finance. More hands-on but protects client relationships.',
        ownAsset: true,
        taxBenefits: 'Discounting fees are tax-deductible.',
        bestFor: 'Larger businesses who want to maintain direct customer relationships.',
      },
      {
        name: 'Selective Invoice Finance',
        description: 'Pick and choose which invoices to finance as needed. No ongoing commitment - just use when you have a cashflow gap or a big invoice to a slow payer.',
        ownAsset: true,
        taxBenefits: 'Fees on financed invoices are tax-deductible.',
        bestFor: 'Occasional cashflow needs without committing to an ongoing facility.',
      },
    ],

    faqs: [
      {
        question: 'How does invoice finance work?',
        answer: 'You raise an invoice as normal and send a copy to the finance provider. They advance you 80-90% of the value within 24 hours. When your customer pays, you receive the remaining balance minus a small fee (typically 0.5-2%).',
      },
      {
        question: 'Will my customers know I\'m using invoice finance?',
        answer: 'With factoring, yes - the factor contacts your customers directly for payment. With invoice discounting, no - it\'s confidential and you continue collecting payments as normal.',
      },
      {
        question: 'What invoices can I finance?',
        answer: 'Most trade invoices to other businesses (B2B) are eligible. Invoices to consumers or those with payment disputes are usually excluded. Construction stage applications and certificates can also be financed.',
      },
      {
        question: 'How much can I release from each invoice?',
        answer: 'Typically 80-90% of the invoice value upfront. The exact percentage depends on your industry, customer quality, and the finance provider. Construction typically gets 70-80%.',
      },
      {
        question: 'What does invoice finance cost?',
        answer: 'Costs are typically 0.5-2% of the invoice value plus an annual facility fee. The exact rate depends on your invoice volume, customer payment terms, and credit quality. We\'ll give you exact figures before you commit.',
      },
      {
        question: 'How quickly can I get set up?',
        answer: 'Typically 24-48 hours for initial setup and credit checks. Once set up, new invoices can be advanced within hours of submission.',
      },
      {
        question: 'Is invoice finance only for businesses in trouble?',
        answer: 'No - it\'s widely used by successful, growing businesses. It\'s particularly useful when growing fast (need to fund materials before being paid), taking on larger contracts, or dealing with slow-paying customers.',
      },
      {
        question: 'What if my customer doesn\'t pay?',
        answer: 'With non-recourse factoring, the factor takes the risk of non-payment. With recourse factoring, you\'re responsible if the customer doesn\'t pay. We\'ll explain the options and implications clearly.',
      },
    ],

    testimonials: [
      {
        quote: 'Commercial customers pay 60-90 days. Invoice finance means I get most of the money within a day. Game changer for cashflow.',
        name: 'Mike S.',
        trade: 'Electrician',
        business: 'Spark Commercial',
        location: 'London',
        amount: '£150,000 facility',
        rating: 5,
      },
      {
        quote: 'Was turning down big jobs because I couldn\'t afford the materials upfront. Now I invoice, get paid instantly, and buy what I need. Turnover up 40%.',
        name: 'David R.',
        trade: 'Builder',
        business: 'D.R. Construction',
        location: 'Edinburgh',
        amount: '£75,000 facility',
        rating: 5,
      },
    ],

    metaTitle: 'Invoice Finance for Tradesmen | Get Paid in 24 Hours | Tradesman Finance',
    metaDescription: 'Release up to 90% of your invoice value within 24 hours. Stop waiting to get paid. Invoice factoring and discounting from 0.5%. Free quote for tradesmen.',
    keywords: ['invoice finance', 'invoice factoring tradesmen', 'invoice discounting', 'construction invoice finance', 'trade invoice finance'],
  },

  'asset-finance': {
    slug: 'asset-finance',
    name: 'Asset Finance',
    heroTitle: 'Spread the Cost of Any Business Asset',
    heroHighlight: 'Cost',
    heroDescription: 'Finance any business asset - from vehicles and equipment to property and stock. Preserve your working capital while getting what your business needs.',
    accentColor: '#ec4899',

    decisionTime: '4 hours',
    decisionTimeDisplay: '4hr Decisions',

    phoneNumber: PHONE_NUMBER,
    phoneDisplay: PHONE_DISPLAY,

    ratesFrom: '5.9% APR',
    representativeExample: {
      amount: '£50,000',
      term: '48 months',
      monthlyPayment: '£1,150',
      totalRepayable: '£55,200',
      apr: '7.4% APR representative',
    },

    minFinance: '£1,000',
    maxFinance: '£1,000,000',
    minTerm: '12 months',
    maxTerm: '84 months',
    minDeposit: '0%',

    heroStats: [
      { value: '£1M', label: 'Max Finance' },
      { value: '4hrs', label: 'Decision Time' },
      { value: '7yrs', label: 'Max Term' },
    ],

    benefits: [
      {
        title: '4-Hour Decisions',
        description: 'Fast decisions so you can move quickly when opportunities arise',
        icon: 'Clock',
      },
      {
        title: 'Preserve Cash',
        description: 'Keep your working capital for day-to-day operations',
        icon: 'Shield',
      },
      {
        title: 'Tax Efficient',
        description: 'Claim capital allowances or deduct lease payments from taxable profit',
        icon: 'Percent',
      },
      {
        title: 'Flexible Options',
        description: 'HP, lease, or refinance - choose what suits your business',
        icon: 'Calculator',
      },
    ],

    categories: [
      {
        title: 'Vehicles',
        items: ['Vans & trucks', 'Pickup trucks', 'Specialist vehicles', 'Fleet finance'],
      },
      {
        title: 'Equipment',
        items: ['Power tools', 'Machinery', 'Diagnostic equipment', 'Workshop equipment'],
      },
      {
        title: 'Technology',
        items: ['Computer equipment', 'Software licences', 'Communication systems', 'Security systems'],
      },
      {
        title: 'Property & Fixtures',
        items: ['Commercial property', 'Office fit-outs', 'Workshop improvements', 'Storage solutions'],
      },
    ],

    financeTypes: [
      {
        name: 'Hire Purchase (HP)',
        description: 'Fixed monthly payments with ownership at the end. The most popular option for tradesmen who want to own the asset.',
        ownAsset: true,
        taxBenefits: 'Claim capital allowances (potentially 100% in year one). Interest is tax-deductible.',
        bestFor: 'Assets you want to own outright like vehicles and equipment.',
      },
      {
        name: 'Finance Lease',
        description: 'Regular payments with no large deposit. At the end, continue at a reduced rental, sell the asset and keep most of the proceeds, or return it.',
        ownAsset: false,
        taxBenefits: 'Full lease payments are tax-deductible.',
        bestFor: 'Higher-value assets where you want lower monthly costs and tax efficiency.',
      },
      {
        name: 'Refinance',
        description: 'Release equity tied up in assets you already own. Borrow against vehicles, equipment, or other business assets.',
        ownAsset: true,
        taxBenefits: 'Interest is tax-deductible. No capital allowance impact on already-owned assets.',
        bestFor: 'Releasing cash from existing assets for new opportunities or cashflow.',
      },
    ],

    faqs: [
      {
        question: 'What assets can be financed?',
        answer: 'Almost anything with a resale value - vehicles, machinery, equipment, technology, fixtures, even stock. Some soft assets (like software) can be included in packages with hard assets.',
      },
      {
        question: 'What\'s the difference between HP and leasing?',
        answer: 'With HP, you own the asset after the final payment and can claim capital allowances. With leasing, you don\'t own it but payments are fully tax-deductible. HP suits assets you\'ll keep long-term; leasing suits assets you\'ll upgrade regularly.',
      },
      {
        question: 'Can I refinance assets I already own?',
        answer: 'Yes, refinancing lets you release equity from vehicles, equipment, or other assets you own outright. It\'s like a loan secured against the asset value. Great for releasing working capital.',
      },
      {
        question: 'How long can I spread payments?',
        answer: 'Terms range from 12 to 84 months depending on the asset type and its useful life. Vehicles are typically 3-5 years; equipment 2-5 years; larger assets up to 7 years.',
      },
      {
        question: 'Do I need a deposit?',
        answer: 'We offer 0% deposit options on many assets. A deposit (typically 10-20%) reduces monthly payments and may secure better rates, but isn\'t required.',
      },
      {
        question: 'Is asset finance tax-efficient?',
        answer: 'Yes. With HP, claim capital allowances (up to 100% in year one under AIA) plus deduct interest. With leasing, 100% of payments are deductible. Always consult your accountant.',
      },
    ],

    testimonials: [
      {
        quote: 'Refinanced our van to release £15k for a new opportunity. Still had 18 months on the original finance but they sorted it all out. Used the cash to buy equipment that\'s earning every day.',
        name: 'Kevin M.',
        trade: 'Heating Engineer',
        business: 'K.M. Heating Services',
        location: 'Nottingham',
        amount: '£15,000',
        rating: 5,
      },
      {
        quote: 'Asset finance made sense for our workshop refit. Spread £80k over 5 years instead of wiping out our reserves. Payments come from the extra work the new setup lets us take on.',
        name: 'Williams Bros',
        trade: 'Metalworkers',
        business: 'Williams Bros Engineering',
        location: 'South Wales',
        amount: '£80,000',
        rating: 5,
      },
    ],

    metaTitle: 'Asset Finance for Tradesmen | Rates from 5.9% APR | Tradesman Finance',
    metaDescription: 'Finance any business asset from £1,000 to £1M. Vehicles, equipment, technology. 4-hour decisions, 0% deposit options, rates from 5.9% APR. Get your free quote.',
    keywords: ['asset finance', 'asset finance tradesmen', 'equipment HP', 'asset refinance', 'business asset finance'],
  },

  'cashflow-finance': {
    slug: 'cashflow-finance',
    name: 'Cashflow Finance',
    heroTitle: 'Keep Your Business Running Smoothly',
    heroHighlight: 'Running',
    heroDescription: 'Short-term funding solutions to bridge gaps, manage seasonal fluctuations, and keep your trade business operating without interruption.',
    accentColor: '#10b981',

    decisionTime: 'same day',
    decisionTimeDisplay: 'Same-Day Funding',

    phoneNumber: PHONE_NUMBER,
    phoneDisplay: PHONE_DISPLAY,

    ratesFrom: '0.8% monthly',

    minFinance: '£2,500',
    maxFinance: '£250,000',
    minTerm: '1 month',
    maxTerm: '24 months',
    minDeposit: 'N/A',

    heroStats: [
      { value: '£250K', label: 'Max Funding' },
      { value: 'Same Day', label: 'Funding' },
      { value: 'Flexible', label: 'Repayment' },
    ],

    benefits: [
      {
        title: 'Same-Day Funding',
        description: 'Apply today, receive funds today for urgent cashflow needs',
        icon: 'Zap',
      },
      {
        title: 'Short-Term Options',
        description: 'From 1 month to 24 months - borrow only for as long as you need',
        icon: 'Clock',
      },
      {
        title: 'Flexible Repayment',
        description: 'Match repayments to your income cycle - weekly, monthly, or on invoice payments',
        icon: 'TrendingUp',
      },
      {
        title: 'Simple Process',
        description: 'Minimal paperwork - often just bank statements to apply',
        icon: 'Shield',
      },
    ],

    categories: [
      {
        title: 'Bridging Finance',
        items: ['Gap between jobs paying', 'Waiting for big invoice', 'Property chain breaks', 'Quick opportunity funding'],
      },
      {
        title: 'Merchant Cash Advance',
        items: ['Advance on card payments', 'Repay as you earn', 'Automatic collection', 'No fixed payments'],
      },
      {
        title: 'Revenue-Based Finance',
        items: ['Based on turnover', 'Flexible repayments', 'Scales with business', 'Quick access'],
      },
      {
        title: 'Overdraft Alternatives',
        items: ['Credit lines', 'Revolving facilities', 'Draw as needed', 'Only pay for what you use'],
      },
    ],

    financeTypes: [
      {
        name: 'Short-Term Business Loan',
        description: 'A fixed-term loan for 1-24 months with regular repayments. Good for known, short-term funding needs.',
        ownAsset: true,
        taxBenefits: 'Interest is tax-deductible as a business expense.',
        bestFor: 'Specific short-term needs like a tax payment or stock purchase.',
      },
      {
        name: 'Merchant Cash Advance',
        description: 'Receive an advance based on your card transaction history. Repay automatically as a percentage of daily card sales.',
        ownAsset: true,
        taxBenefits: 'Fees are tax-deductible.',
        bestFor: 'Businesses with regular card payments who want repayments that flex with income.',
      },
      {
        name: 'Revolving Credit Facility',
        description: 'Like an overdraft but often easier to get. Draw funds when needed up to your limit, repay, and draw again.',
        ownAsset: true,
        taxBenefits: 'Interest on drawn amounts is tax-deductible.',
        bestFor: 'Ongoing cashflow management where needs vary month to month.',
      },
    ],

    faqs: [
      {
        question: 'What is cashflow finance?',
        answer: 'Cashflow finance is short-term funding to help manage gaps between paying expenses and receiving income. It\'s particularly useful for tradesmen who often have to buy materials and pay suppliers before being paid for the work.',
      },
      {
        question: 'How quickly can I get cashflow funding?',
        answer: 'Many cashflow products offer same-day funding. Apply in the morning with bank statements and you can often have funds by the afternoon or next morning.',
      },
      {
        question: 'Is cashflow finance expensive?',
        answer: 'Short-term finance typically has higher rates than longer-term loans because you\'re borrowing for a shorter period. However, the total interest paid is often lower because you\'re not borrowing for years. We\'ll always show you the total cost before you commit.',
      },
      {
        question: 'What\'s a merchant cash advance?',
        answer: 'You receive an upfront cash advance based on your card transaction history. You repay automatically as a fixed percentage (typically 10-15%) of your daily card sales. Good months repay faster; quiet months repay slower.',
      },
      {
        question: 'Do I need security for cashflow finance?',
        answer: 'Most cashflow products are unsecured, meaning you don\'t need to put up property or assets. Approval is based on your business performance and bank statements.',
      },
      {
        question: 'What documents do I need?',
        answer: 'Usually just 3-6 months of business bank statements. Some lenders can connect directly to your bank for instant verification. Minimal paperwork compared to traditional loans.',
      },
    ],

    testimonials: [
      {
        quote: 'VAT bill landed and I was waiting on two big invoices. Got a cashflow loan for 3 months, paid HMRC on time, repaid when my invoices cleared. Saved me a penalty.',
        name: 'Gary W.',
        trade: 'Builder',
        business: 'G.W. Building Services',
        location: 'Manchester',
        amount: '£12,000',
        rating: 5,
      },
      {
        quote: 'Take a lot of card payments so merchant cash advance works perfectly. Repayments flex with how busy I am. Never have to worry about fixed monthly payments.',
        name: 'Emma T.',
        trade: 'Decorator',
        business: 'Perfect Finish Decorating',
        location: 'Brighton',
        amount: '£8,000',
        rating: 5,
      },
    ],

    metaTitle: 'Cashflow Finance for Tradesmen | Same-Day Funding | Tradesman Finance',
    metaDescription: 'Short-term cashflow funding for UK tradesmen. Same-day decisions and funding. Bridge payment gaps, manage seasonal fluctuations. From £2,500 to £250,000.',
    keywords: ['cashflow finance', 'short-term business loan', 'merchant cash advance', 'working capital', 'bridge finance'],
  },
};

// Helper functions
export function getProductPage(slug: string): ProductPageData | undefined {
  return productPages[slug];
}

export function getAllProductSlugs(): string[] {
  return Object.keys(productPages);
}

export function getProductTestimonials(slug: string): ProductTestimonial[] {
  return productPages[slug]?.testimonials || [];
}

export function getProductFAQs(slug: string): ProductFAQ[] {
  return productPages[slug]?.faqs || [];
}
