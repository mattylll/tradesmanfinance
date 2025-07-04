# Tradesman Finance Website

A clean, standalone version of the Tradesman Finance website.

## Quick Start

1. Open Terminal
2. Navigate to this folder:
   ```bash
   cd "/Users/mattlenzie/Desktop/TradesmanFinance.co.uk Website"
   ```

3. Start the website:
   ```bash
   ./start.sh
   ```

4. Open your browser to: http://localhost:8080

## Alternative Start Methods

### Option 1: Python (Recommended)
```bash
python3 -m http.server 8080
```

### Option 2: PHP
```bash
php -S localhost:8080
```

### Option 3: Node.js
```bash
npx http-server -p 8080
```

## Files Structure

```
TradesmanFinance.co.uk Website/
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact form
├── privacy-policy.html # Privacy policy
├── accessibility-statement.html
├── public/
│   ├── css/
│   │   └── style.css   # Main stylesheet
│   ├── js/
│   │   └── main.js     # JavaScript functionality
│   └── images/         # Image assets
├── start.sh            # Startup script
└── README.md           # This file
```

## Features

- Interactive loan calculator
- Responsive design
- Contact form
- Modern UI/UX

## Notes

- The website runs completely standalone
- No backend server required for basic functionality
- Contact form will store data in browser (no email sending without backend)