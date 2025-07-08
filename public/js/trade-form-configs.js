/**
 * Trade Form Configurations
 * Specific form flows for each of the 20 trades
 */

const tradeFormConfigs = {
    electrician: {
        tradeId: 'electrician',
        tradeName: 'Electrician',
        icon: '⚡',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "And your business name?",
                placeholder: 'Smith Electrical Services',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best number to reach you?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for your quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'yearsTrading',
                question: "How long have you been a sparky?",
                required: true,
                summaryLabel: 'Experience',
                options: [
                    { value: '0-2', label: '0-2 years', icon: '🌱' },
                    { value: '3-5', label: '3-5 years', icon: '⚡' },
                    { value: '6-10', label: '6-10 years', icon: '💪' },
                    { value: '10+', label: '10+ years', icon: '👑' }
                ]
            },
            {
                type: 'checkbox-cards',
                id: 'certifications',
                question: "Which certifications do you hold?",
                summaryLabel: 'Certifications',
                options: [
                    { value: 'niceic', label: 'NICEIC', icon: '✓' },
                    { value: 'napit', label: 'NAPIT', icon: '✓' },
                    { value: 'eca', label: 'ECA', icon: '✓' },
                    { value: '18th-edition', label: '18th Edition', icon: '✓' },
                    { value: 'part-p', label: 'Part P', icon: '✓' },
                    { value: 'working-towards', label: 'Working Towards', icon: '📚' }
                ]
            },
            {
                type: 'select-cards',
                id: 'workType',
                question: "What type of electrical work?",
                required: true,
                summaryLabel: 'Work Type',
                options: [
                    { value: 'domestic', label: 'Domestic', icon: '🏠', description: 'Houses & flats' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢', description: 'Offices & shops' },
                    { value: 'industrial', label: 'Industrial', icon: '🏭', description: 'Factories & warehouses' },
                    { value: 'mixed', label: 'Mixed', icon: '🔄', description: 'Bit of everything' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding do you need?",
                min: 1000,
                max: 150000,
                step: 1000,
                defaultValue: 25000,
                required: true,
                summaryLabel: 'Amount needed',
                hint: 'Don\'t worry, this isn\'t final'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'test-equipment', label: 'Test Equipment', icon: '🔧', description: 'MFT, PAT testers, etc.' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'New or used' },
                    { value: 'tools', label: 'Tools', icon: '🔨', description: 'Power tools, hand tools' },
                    { value: 'working-capital', label: 'Working Capital', icon: '💷', description: 'Cash flow, materials' },
                    { value: 'expansion', label: 'Business Growth', icon: '📈', description: 'Hire staff, new premises' }
                ]
            },
            {
                type: 'select-cards',
                id: 'urgency',
                question: "How soon do you need it?",
                required: true,
                summaryLabel: 'Urgency',
                options: [
                    { value: 'asap', label: 'ASAP', icon: '🏃' },
                    { value: 'week', label: 'This week', icon: '📅' },
                    { value: 'month', label: 'This month', icon: '📆' },
                    { value: 'planning', label: 'Just planning', icon: '🤔' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit score?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Excellent' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Needs work' }
                ]
            },
            {
                type: 'textarea',
                id: 'additionalInfo',
                question: "Anything else we should know?",
                placeholder: 'E.g., specific equipment model, upcoming contract, etc.',
                summaryLabel: 'Additional info'
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Perfect! Let's review your application:"
            }
        ]
    },
    
    plumber: {
        tradeId: 'plumber',
        tradeName: 'Plumber',
        icon: '🔧',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "And your plumbing business name?",
                placeholder: 'Smith Plumbing & Heating',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best number to reach you?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for your quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'yearsTrading',
                question: "How long in the plumbing game?",
                required: true,
                summaryLabel: 'Experience',
                options: [
                    { value: '0-2', label: '0-2 years', icon: '🌱' },
                    { value: '3-5', label: '3-5 years', icon: '🔧' },
                    { value: '6-10', label: '6-10 years', icon: '💪' },
                    { value: '10+', label: '10+ years', icon: '👑' }
                ]
            },
            {
                type: 'checkbox-cards',
                id: 'certifications',
                question: "Your qualifications?",
                summaryLabel: 'Qualifications',
                options: [
                    { value: 'gas-safe', label: 'Gas Safe', icon: '🔥' },
                    { value: 'water-regs', label: 'Water Regs', icon: '💧' },
                    { value: 'unvented', label: 'Unvented', icon: '♨️' },
                    { value: 'lpg', label: 'LPG', icon: '⛽' },
                    { value: 'oil', label: 'Oil', icon: '🛢️' },
                    { value: 'renewable', label: 'Renewable', icon: '♻️' }
                ]
            },
            {
                type: 'select-cards',
                id: 'speciality',
                question: "What's your speciality?",
                required: true,
                summaryLabel: 'Speciality',
                options: [
                    { value: 'general', label: 'General Plumbing', icon: '🔧' },
                    { value: 'bathrooms', label: 'Bathrooms', icon: '🚿' },
                    { value: 'heating', label: 'Heating Systems', icon: '🔥' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢' },
                    { value: 'drainage', label: 'Drainage', icon: '🚰' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding do you need?",
                min: 1000,
                max: 150000,
                step: 1000,
                defaultValue: 20000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'pipe-tools', label: 'Pipe Tools', icon: '🔧', description: 'Threading, press tools' },
                    { value: 'drain-equipment', label: 'Drain Equipment', icon: '📹', description: 'Cameras, jetters' },
                    { value: 'van', label: 'Van', icon: '🚐', description: 'New or used' },
                    { value: 'boilers', label: 'Boiler Stock', icon: '🔥', description: 'Inventory' },
                    { value: 'cash-flow', label: 'Cash Flow', icon: '💷', description: 'Working capital' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Spot on' },
                    { value: 'good', emoji: '🙂', label: 'Pretty good' },
                    { value: 'fair', emoji: '😐', label: 'OK' },
                    { value: 'poor', emoji: '😟', label: 'Been better' }
                ]
            },
            {
                type: 'textarea',
                id: 'additionalInfo',
                question: "Anything else?",
                placeholder: 'Specific equipment, upcoming jobs, etc.'
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Great! Let's check everything:"
            }
        ]
    },
    
    builder: {
        tradeId: 'builder',
        tradeName: 'Builder',
        icon: '🏗️',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your construction company name?",
                placeholder: 'Smith Construction Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'companySize',
                question: "How big's your crew?",
                required: true,
                summaryLabel: 'Company size',
                options: [
                    { value: 'sole-trader', label: 'Just me', icon: '👤' },
                    { value: '2-5', label: '2-5 people', icon: '👥' },
                    { value: '6-15', label: '6-15 people', icon: '👷' },
                    { value: '15+', label: '15+ people', icon: '🏗️' }
                ]
            },
            {
                type: 'checkbox-cards',
                id: 'buildingTypes',
                question: "What do you build?",
                summaryLabel: 'Project types',
                options: [
                    { value: 'extensions', label: 'Extensions', icon: '🏠' },
                    { value: 'new-build', label: 'New Build', icon: '🏗️' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢' },
                    { value: 'renovation', label: 'Renovation', icon: '🔨' },
                    { value: 'conversions', label: 'Conversions', icon: '🔄' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 5000,
                max: 500000,
                step: 5000,
                defaultValue: 50000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the finance for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'plant', label: 'Plant/Machinery', icon: '🚜', description: 'Diggers, dumpers' },
                    { value: 'tools', label: 'Tools', icon: '🔨', description: 'Power tools, equipment' },
                    { value: 'vehicle', label: 'Vehicles', icon: '🚚', description: 'Vans, trucks' },
                    { value: 'project', label: 'Project Finance', icon: '📊', description: 'Cash flow for job' },
                    { value: 'growth', label: 'Expansion', icon: '📈', description: 'Grow the business' }
                ]
            },
            {
                type: 'select-cards',
                id: 'projectValue',
                question: "Typical project value?",
                required: true,
                summaryLabel: 'Project size',
                options: [
                    { value: '0-50k', label: 'Up to £50k', icon: '💷' },
                    { value: '50-150k', label: '£50k - £150k', icon: '💷💷' },
                    { value: '150-500k', label: '£150k - £500k', icon: '💷💷💷' },
                    { value: '500k+', label: '£500k+', icon: '💷💷💷💷' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit score status?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Solid' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Working on it' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Nearly there! Review your details:"
            }
        ]
    },
    
    carpenter: {
        tradeId: 'carpenter',
        tradeName: 'Carpenter',
        icon: '🔨',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your carpentry business name?",
                placeholder: 'Smith Carpentry & Joinery',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best number for you?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'carpentryType',
                question: "What type of carpentry?",
                required: true,
                summaryLabel: 'Speciality',
                options: [
                    { value: 'site', label: 'Site Carpentry', icon: '🏗️', description: 'First & second fix' },
                    { value: 'bench', label: 'Bench Joinery', icon: '🪑', description: 'Workshop based' },
                    { value: 'finish', label: 'Finish Carpentry', icon: '✨', description: 'Detailed work' },
                    { value: 'mixed', label: 'Bit of both', icon: '🔄', description: 'Site & workshop' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding needed?",
                min: 1000,
                max: 100000,
                step: 1000,
                defaultValue: 15000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'machinery', label: 'Workshop Machinery', icon: '⚙️', description: 'Saws, planers, etc.' },
                    { value: 'tools', label: 'Hand/Power Tools', icon: '🔧', description: 'Festool, DeWalt, etc.' },
                    { value: 'van', label: 'Van/Transport', icon: '🚐', description: 'Tool transport' },
                    { value: 'workshop', label: 'Workshop Setup', icon: '🏭', description: 'Rent, fit-out' },
                    { value: 'materials', label: 'Materials Stock', icon: '🪵', description: 'Timber, supplies' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Top notch' },
                    { value: 'good', emoji: '🙂', label: 'Pretty good' },
                    { value: 'fair', emoji: '😐', label: 'Average' },
                    { value: 'poor', emoji: '😟', label: 'Needs work' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Perfect! Review your application:"
            }
        ]
    },
    
    'heating-engineer': {
        tradeId: 'heating-engineer',
        tradeName: 'Heating Engineer',
        icon: '🔥',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your heating business name?",
                placeholder: 'Smith Heating Services',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for your quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'qualifications',
                question: "Your Gas Safe categories?",
                summaryLabel: 'Qualifications',
                options: [
                    { value: 'ccn1', label: 'CCN1', icon: '✓' },
                    { value: 'cen1', label: 'CEN1', icon: '✓' },
                    { value: 'wat1', label: 'WAT1', icon: '✓' },
                    { value: 'cpa1', label: 'CPA1', icon: '✓' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢' },
                    { value: 'lpg', label: 'LPG', icon: '⛽' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 1000,
                max: 150000,
                step: 1000,
                defaultValue: 20000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'analysers', label: 'Gas Analysers', icon: '📊', description: 'Kane, Anton, etc.' },
                    { value: 'boilers', label: 'Boiler Stock', icon: '🔥', description: 'Inventory' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Mobile workshop' },
                    { value: 'tools', label: 'Tools/Equipment', icon: '🔧', description: 'General tools' },
                    { value: 'training', label: 'Training/Certs', icon: '📚', description: 'Upskilling' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit score check?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Excellent' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Poor' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Great! Let's review:"
            }
        ]
    },
    
    // Continue with remaining trades...
    roofer: {
        tradeId: 'roofer',
        tradeName: 'Roofer',
        icon: '🏠',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your roofing company name?",
                placeholder: 'Smith Roofing Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best number to reach you?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for your quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'roofingType',
                question: "What type of roofing work?",
                required: true,
                summaryLabel: 'Speciality',
                options: [
                    { value: 'pitched', label: 'Pitched Roofing', icon: '🏠', description: 'Tiles, slates' },
                    { value: 'flat', label: 'Flat Roofing', icon: '🏢', description: 'EPDM, felt, fibreglass' },
                    { value: 'commercial', label: 'Commercial', icon: '🏭', description: 'Industrial roofing' },
                    { value: 'all', label: 'All Types', icon: '🔄', description: 'Full service' }
                ]
            },
            {
                type: 'checkbox-cards',
                id: 'certifications',
                question: "Your accreditations?",
                summaryLabel: 'Accreditations',
                options: [
                    { value: 'nfrc', label: 'NFRC Member', icon: '✓' },
                    { value: 'competent-roofer', label: 'Competent Roofer', icon: '✓' },
                    { value: 'trustmark', label: 'TrustMark', icon: '✓' },
                    { value: 'chas', label: 'CHAS', icon: '✓' },
                    { value: 'safe-contractor', label: 'SafeContractor', icon: '✓' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 1000,
                max: 200000,
                step: 1000,
                defaultValue: 30000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'scaffolding', label: 'Scaffolding', icon: '🏗️', description: 'Purchase or hire' },
                    { value: 'safety', label: 'Safety Equipment', icon: '🦺', description: 'Harnesses, edge protection' },
                    { value: 'tools', label: 'Tools & Equipment', icon: '🔨', description: 'Nail guns, ladders' },
                    { value: 'vehicle', label: 'Van/Truck', icon: '🚐', description: 'Transport' },
                    { value: 'materials', label: 'Material Stock', icon: '📦', description: 'Tiles, felt, etc.' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Excellent' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Poor' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Great! Let's review:"
            }
        ]
    },
    
    plasterer: {
        tradeId: 'plasterer',
        tradeName: 'Plasterer',
        icon: '🏗️',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your plastering business name?",
                placeholder: 'Smith Plastering Services',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'plasteringType',
                question: "What type of plastering?",
                required: true,
                summaryLabel: 'Speciality',
                options: [
                    { value: 'internal', label: 'Internal Plastering', icon: '🏠', description: 'Skimming, boarding' },
                    { value: 'external', label: 'External Rendering', icon: '🏘️', description: 'Render systems' },
                    { value: 'decorative', label: 'Decorative', icon: '✨', description: 'Cornice, mouldings' },
                    { value: 'all', label: 'All Types', icon: '🔄', description: 'Full service' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding needed?",
                min: 1000,
                max: 100000,
                step: 1000,
                defaultValue: 15000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'mixer', label: 'Plastering Machine', icon: '⚙️', description: 'Spray machines, mixers' },
                    { value: 'scaffolding', label: 'Access Equipment', icon: '🪜', description: 'Scaffolding, towers' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Transport' },
                    { value: 'tools', label: 'Hand Tools', icon: '🔧', description: 'Trowels, floats, etc.' },
                    { value: 'cash-flow', label: 'Working Capital', icon: '💷', description: 'Materials, wages' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit score status?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Top notch' },
                    { value: 'good', emoji: '🙂', label: 'Pretty good' },
                    { value: 'fair', emoji: '😐', label: 'Average' },
                    { value: 'poor', emoji: '😟', label: 'Needs work' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Perfect! Review your application:"
            }
        ]
    },
    
    'painter-decorator': {
        tradeId: 'painter-decorator',
        tradeName: 'Painter & Decorator',
        icon: '🎨',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your decorating business name?",
                placeholder: 'Smith Decorating Services',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Phone number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for your quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'workType',
                question: "What type of work?",
                required: true,
                summaryLabel: 'Work type',
                options: [
                    { value: 'domestic', label: 'Domestic', icon: '🏠', description: 'Homes & flats' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢', description: 'Offices & shops' },
                    { value: 'specialist', label: 'Specialist', icon: '✨', description: 'Wallpaper, effects' },
                    { value: 'all', label: 'All Types', icon: '🔄', description: 'Full service' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 1000,
                max: 75000,
                step: 1000,
                defaultValue: 10000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'spray-equipment', label: 'Spray Equipment', icon: '🎨', description: 'Airless sprayers' },
                    { value: 'access', label: 'Access Equipment', icon: '🪜', description: 'Scaffolding, platforms' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Transport' },
                    { value: 'tools', label: 'Tools & Kit', icon: '🖌️', description: 'Brushes, rollers' },
                    { value: 'cash-flow', label: 'Cash Flow', icon: '💷', description: 'Materials, wages' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Spot on' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'OK' },
                    { value: 'poor', emoji: '😟', label: 'Been better' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Nearly done! Check your details:"
            }
        ]
    },
    
    tiler: {
        tradeId: 'tiler',
        tradeName: 'Tiler',
        icon: '🏠',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your tiling business name?",
                placeholder: 'Smith Tiling Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best number for you?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'tilingType',
                question: "What type of tiling?",
                required: true,
                summaryLabel: 'Speciality',
                options: [
                    { value: 'walls-floors', label: 'Walls & Floors', icon: '🏠', description: 'General tiling' },
                    { value: 'bathrooms', label: 'Bathrooms', icon: '🚿', description: 'Wet rooms, showers' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢', description: 'Large format' },
                    { value: 'specialist', label: 'Specialist', icon: '💎', description: 'Natural stone, mosaic' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding?",
                min: 1000,
                max: 75000,
                step: 1000,
                defaultValue: 12000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'wet-cutter', label: 'Wet Cutters', icon: '⚙️', description: 'Bridge saws, cutters' },
                    { value: 'levelling', label: 'Levelling Systems', icon: '📐', description: 'Clips, wedges' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Transport' },
                    { value: 'tools', label: 'Hand Tools', icon: '🔧', description: 'Mixers, trowels' },
                    { value: 'cash-flow', label: 'Working Capital', icon: '💷', description: 'Materials' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit check?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Perfect' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Poor' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Great! Review your details:"
            }
        ]
    },
    
    bricklayer: {
        tradeId: 'bricklayer',
        tradeName: 'Bricklayer',
        icon: '🧱',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your bricklaying business?",
                placeholder: 'Smith Bricklaying Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'workType',
                question: "What type of work?",
                required: true,
                summaryLabel: 'Work type',
                options: [
                    { value: 'new-build', label: 'New Build', icon: '🏗️', description: 'Houses, extensions' },
                    { value: 'renovation', label: 'Renovation', icon: '🏠', description: 'Repairs, repointing' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢', description: 'Large projects' },
                    { value: 'specialist', label: 'Specialist', icon: '✨', description: 'Stone, heritage' }
                ]
            },
            {
                type: 'select-cards',
                id: 'teamSize',
                question: "How many in your gang?",
                required: true,
                summaryLabel: 'Team size',
                options: [
                    { value: 'solo', label: 'Just me', icon: '👤' },
                    { value: '2-3', label: '2-3 people', icon: '👥' },
                    { value: '4-6', label: '4-6 people', icon: '👷' },
                    { value: '6+', label: '6+ people', icon: '🏗️' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding?",
                min: 1000,
                max: 150000,
                step: 1000,
                defaultValue: 25000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'mixer', label: 'Mixer/Equipment', icon: '🏗️', description: 'Cement mixers, saws' },
                    { value: 'scaffolding', label: 'Scaffolding', icon: '🪜', description: 'Access equipment' },
                    { value: 'vehicle', label: 'Vehicle', icon: '🚚', description: 'Van, truck' },
                    { value: 'tools', label: 'Tools', icon: '🔨', description: 'Levels, lines, etc.' },
                    { value: 'project', label: 'Project Finance', icon: '💷', description: 'Materials, labour' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit status?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Solid' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Working on it' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Let's check everything:"
            }
        ]
    },
    
    scaffolder: {
        tradeId: 'scaffolder',
        tradeName: 'Scaffolder',
        icon: '🏗️',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your scaffolding company?",
                placeholder: 'Smith Scaffolding Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'accreditations',
                question: "Your accreditations?",
                summaryLabel: 'Accreditations',
                options: [
                    { value: 'cisrs', label: 'CISRS', icon: '✓' },
                    { value: 'nasc', label: 'NASC Member', icon: '✓' },
                    { value: 'chas', label: 'CHAS', icon: '✓' },
                    { value: 'ipaf', label: 'IPAF', icon: '✓' },
                    { value: 'safe-contractor', label: 'SafeContractor', icon: '✓' }
                ]
            },
            {
                type: 'select-cards',
                id: 'scaffoldType',
                question: "What type of scaffolding?",
                required: true,
                summaryLabel: 'Scaffold type',
                options: [
                    { value: 'tube-fitting', label: 'Tube & Fitting', icon: '🏗️', description: 'Traditional' },
                    { value: 'system', label: 'System Scaffold', icon: '🏭', description: 'Layher, Kwikstage' },
                    { value: 'mobile', label: 'Mobile Towers', icon: '🎲', description: 'Alloy towers' },
                    { value: 'all', label: 'All Types', icon: '🔄', description: 'Full service' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 5000,
                max: 300000,
                step: 5000,
                defaultValue: 50000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'scaffold-stock', label: 'Scaffold Stock', icon: '🏗️', description: 'Tubes, boards, fittings' },
                    { value: 'lorry', label: 'Lorry/Truck', icon: '🚚', description: 'HIAB, flatbed' },
                    { value: 'safety-kit', label: 'Safety Equipment', icon: '🦺', description: 'Harnesses, netting' },
                    { value: 'yard', label: 'Yard/Storage', icon: '🏭', description: 'Premises, racking' },
                    { value: 'growth', label: 'Business Growth', icon: '📈', description: 'Expansion capital' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Top notch' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'OK' },
                    { value: 'poor', emoji: '😟', label: 'Been better' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Right, let's review:"
            }
        ]
    },
    
    landscaper: {
        tradeId: 'landscaper',
        tradeName: 'Landscaper',
        icon: '🌿',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your landscaping business?",
                placeholder: 'Smith Landscapes',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Phone number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for your quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'landscapeType',
                question: "What type of landscaping?",
                required: true,
                summaryLabel: 'Speciality',
                options: [
                    { value: 'design-build', label: 'Design & Build', icon: '🌿', description: 'Full projects' },
                    { value: 'hard-landscape', label: 'Hard Landscaping', icon: '🧱', description: 'Patios, driveways' },
                    { value: 'soft-landscape', label: 'Soft Landscaping', icon: '🌳', description: 'Planting, turf' },
                    { value: 'maintenance', label: 'Maintenance', icon: '✂️', description: 'Regular upkeep' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding needed?",
                min: 1000,
                max: 150000,
                step: 1000,
                defaultValue: 20000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'digger', label: 'Digger/Excavator', icon: '🚜', description: 'Mini diggers, etc.' },
                    { value: 'machinery', label: 'Machinery', icon: '🚜', description: 'Mowers, chippers' },
                    { value: 'vehicle', label: 'Vehicle/Trailer', icon: '🚚', description: 'Truck, tipper' },
                    { value: 'tools', label: 'Tools & Equipment', icon: '🔧', description: 'Chainsaws, etc.' },
                    { value: 'project', label: 'Project Finance', icon: '💷', description: 'Materials, labour' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit score check?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Blooming' },
                    { value: 'good', emoji: '🙂', label: 'Growing well' },
                    { value: 'fair', emoji: '😐', label: 'Needs water' },
                    { value: 'poor', emoji: '😟', label: 'Bit wilted' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Perfect! Let's review:"
            }
        ]
    },
    
    'bathroom-fitter': {
        tradeId: 'bathroom-fitter',
        tradeName: 'Bathroom Fitter',
        icon: '🚿',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your bathroom fitting business?",
                placeholder: 'Smith Bathrooms Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best number to reach you?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'services',
                question: "What services do you offer?",
                summaryLabel: 'Services',
                options: [
                    { value: 'design', label: 'Design', icon: '📝' },
                    { value: 'plumbing', label: 'Plumbing', icon: '🔧' },
                    { value: 'tiling', label: 'Tiling', icon: '🏠' },
                    { value: 'electrics', label: 'Electrics', icon: '⚡' },
                    { value: 'full-install', label: 'Full Install', icon: '🚿' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 1000,
                max: 100000,
                step: 1000,
                defaultValue: 15000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'showroom', label: 'Showroom', icon: '🏬', description: 'Display setup' },
                    { value: 'stock', label: 'Stock/Inventory', icon: '📦', description: 'Suites, tiles' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Transport' },
                    { value: 'tools', label: 'Tools', icon: '🔧', description: 'Specialist equipment' },
                    { value: 'marketing', label: 'Marketing', icon: '📢', description: 'Grow business' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Sparkling' },
                    { value: 'good', emoji: '🙂', label: 'Clean' },
                    { value: 'fair', emoji: '😐', label: 'OK' },
                    { value: 'poor', emoji: '😟', label: 'Needs work' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Great! Review your application:"
            }
        ]
    },
    
    'flooring-contractor': {
        tradeId: 'flooring-contractor',
        tradeName: 'Flooring Contractor',
        icon: '🏠',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your flooring company?",
                placeholder: 'Smith Flooring Solutions',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'floorTypes',
                question: "What flooring do you fit?",
                summaryLabel: 'Floor types',
                options: [
                    { value: 'carpet', label: 'Carpet', icon: '🧯' },
                    { value: 'wood', label: 'Wood/Laminate', icon: '🥭' },
                    { value: 'vinyl', label: 'Vinyl/LVT', icon: '🔵' },
                    { value: 'tiles', label: 'Floor Tiles', icon: '◼️' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding?",
                min: 1000,
                max: 100000,
                step: 1000,
                defaultValue: 15000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'machinery', label: 'Floor Sanders', icon: '⚙️', description: 'Sanders, grinders' },
                    { value: 'stock', label: 'Stock/Samples', icon: '📦', description: 'Inventory' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Transport' },
                    { value: 'tools', label: 'Installation Tools', icon: '🔧', description: 'Stretchers, etc.' },
                    { value: 'showroom', label: 'Showroom', icon: '🏬', description: 'Display area' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit status?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Solid' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Needs work' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Nearly there! Check your details:"
            }
        ]
    },
    
    'window-fitter': {
        tradeId: 'window-fitter',
        tradeName: 'Window Fitter',
        icon: '🪟',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your window fitting business?",
                placeholder: 'Smith Windows & Doors',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Phone number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'productTypes',
                question: "What do you install?",
                summaryLabel: 'Products',
                options: [
                    { value: 'upvc-windows', label: 'uPVC Windows', icon: '🪟' },
                    { value: 'upvc-doors', label: 'uPVC Doors', icon: '🚪' },
                    { value: 'composite', label: 'Composite Doors', icon: '🚪' },
                    { value: 'bifolds', label: 'Bi-folds', icon: '🪟' },
                    { value: 'conservatories', label: 'Conservatories', icon: '🏠' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 2000,
                max: 150000,
                step: 1000,
                defaultValue: 25000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'stock', label: 'Stock/Inventory', icon: '📦', description: 'Windows, doors' },
                    { value: 'machinery', label: 'Machinery', icon: '⚙️', description: 'Cutting equipment' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Transport' },
                    { value: 'showroom', label: 'Showroom', icon: '🏬', description: 'Display centre' },
                    { value: 'marketing', label: 'Marketing', icon: '📢', description: 'Lead generation' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit check?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Crystal clear' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Bit foggy' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Perfect! Review your details:"
            }
        ]
    },
    
    locksmith: {
        tradeId: 'locksmith',
        tradeName: 'Locksmith',
        icon: '🔐',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your locksmith business?",
                placeholder: 'Smith Security Services',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "24hr contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'services',
                question: "What services do you offer?",
                summaryLabel: 'Services',
                options: [
                    { value: 'emergency', label: 'Emergency 24/7', icon: '🆘' },
                    { value: 'residential', label: 'Residential', icon: '🏠' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢' },
                    { value: 'auto', label: 'Auto Locksmith', icon: '🚗' },
                    { value: 'safe', label: 'Safe Work', icon: '🧾' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding?",
                min: 1000,
                max: 75000,
                step: 1000,
                defaultValue: 10000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'key-machines', label: 'Key Machines', icon: '🔐', description: 'Cutting equipment' },
                    { value: 'van-setup', label: 'Van Setup', icon: '🚐', description: 'Mobile workshop' },
                    { value: 'stock', label: 'Lock Stock', icon: '📦', description: 'Inventory' },
                    { value: 'tools', label: 'Specialist Tools', icon: '🔧', description: 'Picks, programmers' },
                    { value: 'shop', label: 'Shop/Premises', icon: '🏪', description: 'Retail space' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Locked in' },
                    { value: 'good', emoji: '🙂', label: 'Secure' },
                    { value: 'fair', emoji: '😐', label: 'OK' },
                    { value: 'poor', emoji: '😟', label: 'Needs a key' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Great! Review your application:"
            }
        ]
    },
    
    'shop-fitter': {
        tradeId: 'shop-fitter',
        tradeName: 'Shop Fitter',
        icon: '🏪',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your shop fitting company?",
                placeholder: 'Smith Retail Interiors',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'select-cards',
                id: 'projectType',
                question: "What type of projects?",
                required: true,
                summaryLabel: 'Project type',
                options: [
                    { value: 'retail', label: 'Retail Stores', icon: '🏬', description: 'High street shops' },
                    { value: 'hospitality', label: 'Hospitality', icon: '🍽️', description: 'Restaurants, bars' },
                    { value: 'office', label: 'Office Fit-out', icon: '🏢', description: 'Corporate spaces' },
                    { value: 'exhibition', label: 'Exhibition', icon: '🎪', description: 'Stands, displays' }
                ]
            },
            {
                type: 'select-cards',
                id: 'companySize',
                question: "Company size?",
                required: true,
                summaryLabel: 'Company size',
                options: [
                    { value: '1-5', label: '1-5 staff', icon: '👥' },
                    { value: '6-15', label: '6-15 staff', icon: '👷' },
                    { value: '16-30', label: '16-30 staff', icon: '🏗️' },
                    { value: '30+', label: '30+ staff', icon: '🏢' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding?",
                min: 5000,
                max: 500000,
                step: 5000,
                defaultValue: 50000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'machinery', label: 'CNC/Machinery', icon: '⚙️', description: 'Workshop equipment' },
                    { value: 'project-finance', label: 'Project Finance', icon: '📈', description: 'Cash flow' },
                    { value: 'materials', label: 'Materials Stock', icon: '📦', description: 'Inventory' },
                    { value: 'vehicles', label: 'Fleet', icon: '🚚', description: 'Vans, trucks' },
                    { value: 'expansion', label: 'Expansion', icon: '🚀', description: 'Growth capital' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit status?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Premium' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Needs work' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Perfect! Let's review:"
            }
        ]
    },
    
    'air-conditioning': {
        tradeId: 'air-conditioning',
        tradeName: 'Air Conditioning Engineer',
        icon: '❄️',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your AC business name?",
                placeholder: 'Smith Climate Control',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Phone number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'certifications',
                question: "Your F-Gas categories?",
                summaryLabel: 'Certifications',
                options: [
                    { value: 'cat1', label: 'Category 1', icon: '✓' },
                    { value: 'cat2', label: 'Category 2', icon: '✓' },
                    { value: 'cat3', label: 'Category 3', icon: '✓' },
                    { value: 'cat4', label: 'Category 4', icon: '✓' },
                    { value: 'refcom', label: 'REFCOM Elite', icon: '⭐' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much do you need?",
                min: 1000,
                max: 150000,
                step: 1000,
                defaultValue: 25000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'recovery', label: 'Recovery Equipment', icon: '🧪', description: 'F-Gas machines' },
                    { value: 'test-kit', label: 'Test Equipment', icon: '📊', description: 'Gauges, leak detectors' },
                    { value: 'van', label: 'Van/Vehicle', icon: '🚐', description: 'Service vehicle' },
                    { value: 'stock', label: 'Unit Stock', icon: '📦', description: 'AC units' },
                    { value: 'training', label: 'Training/Certs', icon: '📚', description: 'Upskilling' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "How's your credit?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Cool' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Warm' },
                    { value: 'poor', emoji: '😟', label: 'Needs cooling' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Great! Review your application:"
            }
        ]
    },
    
    groundworker: {
        tradeId: 'groundworker',
        tradeName: 'Groundworker',
        icon: '🚜',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your groundworks company?",
                placeholder: 'Smith Groundworks Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Best contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email address?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'services',
                question: "What groundwork services?",
                summaryLabel: 'Services',
                options: [
                    { value: 'foundations', label: 'Foundations', icon: '🏗️' },
                    { value: 'drainage', label: 'Drainage', icon: '💧' },
                    { value: 'utilities', label: 'Utilities', icon: '⚡' },
                    { value: 'roads', label: 'Roads/Paving', icon: '🛣️' },
                    { value: 'concrete', label: 'Concreting', icon: '🧊' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding needed?",
                min: 5000,
                max: 500000,
                step: 5000,
                defaultValue: 75000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's it for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'digger', label: 'Excavator/Digger', icon: '🚜', description: '360, mini digger' },
                    { value: 'dumper', label: 'Dumpers/Rollers', icon: '🚚', description: 'Site equipment' },
                    { value: 'lorry', label: 'Tipper Truck', icon: '🚛', description: 'Grab lorry' },
                    { value: 'tools', label: 'Small Plant', icon: '🔧', description: 'Compactors, etc.' },
                    { value: 'project', label: 'Project Finance', icon: '💷', description: 'Cash flow' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit check?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Rock solid' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Bit shaky' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Right, let's review:"
            }
        ]
    },
    
    demolition: {
        tradeId: 'demolition',
        tradeName: 'Demolition Contractor',
        icon: '💥',
        estimatedTime: 3,
        steps: [
            {
                type: 'welcome',
                id: 'welcome'
            },
            {
                type: 'text',
                id: 'name',
                question: "What's your name?",
                placeholder: 'John Smith',
                required: true,
                summaryLabel: 'Name'
            },
            {
                type: 'text',
                id: 'businessName',
                question: "Your demolition company?",
                placeholder: 'Smith Demolition Ltd',
                required: true,
                summaryLabel: 'Business'
            },
            {
                type: 'phone',
                id: 'phone',
                question: "Contact number?",
                placeholder: '07123 456789',
                required: true,
                summaryLabel: 'Phone'
            },
            {
                type: 'email',
                id: 'email',
                question: "Email for quote?",
                placeholder: 'john@example.com',
                required: true,
                summaryLabel: 'Email'
            },
            {
                type: 'checkbox-cards',
                id: 'licenses',
                question: "Your licenses/accreditations?",
                summaryLabel: 'Licenses',
                options: [
                    { value: 'nfdc', label: 'NFDC Member', icon: '✓' },
                    { value: 'ccdo', label: 'CCDO Card', icon: '✓' },
                    { value: 'waste-carrier', label: 'Waste Carrier', icon: '✓' },
                    { value: 'asbestos', label: 'Asbestos License', icon: '✓' },
                    { value: 'explosive', label: 'Explosives Cert', icon: '💥' }
                ]
            },
            {
                type: 'select-cards',
                id: 'demolitionType',
                question: "What type of demolition?",
                required: true,
                summaryLabel: 'Demolition type',
                options: [
                    { value: 'residential', label: 'Residential', icon: '🏠', description: 'Houses, garages' },
                    { value: 'commercial', label: 'Commercial', icon: '🏢', description: 'Offices, shops' },
                    { value: 'industrial', label: 'Industrial', icon: '🏭', description: 'Factories, plants' },
                    { value: 'specialist', label: 'Specialist', icon: '💥', description: 'Controlled, explosive' }
                ]
            },
            {
                type: 'slider',
                id: 'loanAmount',
                question: "How much funding?",
                min: 10000,
                max: 1000000,
                step: 10000,
                defaultValue: 100000,
                required: true,
                summaryLabel: 'Amount needed'
            },
            {
                type: 'select-cards',
                id: 'purpose',
                question: "What's the money for?",
                required: true,
                summaryLabel: 'Purpose',
                options: [
                    { value: 'excavator', label: 'High Reach Excavator', icon: '🚜', description: 'Demolition spec' },
                    { value: 'crusher', label: 'Crushers/Processors', icon: '⚙️', description: 'Recycling equipment' },
                    { value: 'trucks', label: 'Trucks/Tippers', icon: '🚛', description: 'Waste removal' },
                    { value: 'safety', label: 'Safety Equipment', icon: '🦺', description: 'Specialist kit' },
                    { value: 'project', label: 'Project Finance', icon: '💰', description: 'Large contracts' }
                ]
            },
            {
                type: 'emoji-select',
                id: 'creditScore',
                question: "Credit status?",
                required: true,
                summaryLabel: 'Credit',
                options: [
                    { value: 'excellent', emoji: '😊', label: 'Solid' },
                    { value: 'good', emoji: '🙂', label: 'Good' },
                    { value: 'fair', emoji: '😐', label: 'Fair' },
                    { value: 'poor', emoji: '😟', label: 'Needs rebuilding' }
                ]
            },
            {
                type: 'summary',
                id: 'summary',
                question: "Boom! Let's review:"
            }
        ]
    }
};

// Export for use
window.tradeFormConfigs = tradeFormConfigs;