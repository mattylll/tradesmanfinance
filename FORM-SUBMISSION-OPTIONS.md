# Form Submission Options for TradesmanFinance.co.uk

Currently, your contact form is configured to submit to a Node.js backend API, but you need to set up one of these options to receive enquiries:

## Option 1: Use the Existing Backend (Recommended)
The site already has a complete Node.js/Express backend with email integration.

### Setup Steps:
1. **Configure Environment Variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your credentials:
   # - SENDGRID_API_KEY (for emails)
   # - MONGODB_URI (for database)
   # - Your email address for notifications
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Backend Features**
   - Sends email notifications to you
   - Stores leads in MongoDB
   - Automatic lead scoring
   - SMS notifications (optional with Twilio)
   - CRM integration (optional with GoHighLevel)

## Option 2: Use a Form Service (Quick Setup)

### A. Formspree (Easiest)
1. Sign up at https://formspree.io
2. Get your form endpoint
3. Update the form action:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### B. Netlify Forms (If hosting on Netlify)
1. Add to your form:
   ```html
   <form id="contactForm" netlify>
   ```
2. Forms automatically processed by Netlify

### C. Web3Forms (No signup required)
1. Get access key at https://web3forms.com
2. Add hidden field to form:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
   ```

## Option 3: Simple Email-Only Solution
I can create a simple PHP script if you're hosting on a traditional server:

```php
<?php
// save as /api/submit-form.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "your-email@example.com";
    $subject = "New Finance Enquiry";
    $message = "Name: " . $_POST['name'] . "\n";
    $message .= "Email: " . $_POST['email'] . "\n";
    $message .= "Business: " . $_POST['business'] . "\n";
    $message .= "Amount: " . $_POST['amount'] . "\n";
    $message .= "Message: " . $_POST['message'];
    
    mail($to, $subject, $message);
    echo json_encode(["success" => true]);
}
?>
```

## Option 4: Google Forms Integration
1. Create a Google Form with matching fields
2. Use Google Apps Script to send emails
3. Embed or redirect to the form

## Current Configuration
The form currently tries to submit to:
- **Local**: http://localhost:3001/api/leads/submit
- **Production**: https://api.tradesmanfinance.co.uk/api/leads/submit

## Temporary Testing Solution
For immediate testing without backend:

```javascript
// Add to main.js temporarily
async function submitFormToAPI(data) {
    // Log to console for testing
    console.log('Form submission:', data);
    
    // Show success message
    alert('Form submitted! Check console for data.');
    
    // For production, replace with actual submission
    return { success: true };
}
```

## Which Option Should You Choose?

- **Have technical skills?** → Use Option 1 (Backend)
- **Want it working in 5 minutes?** → Use Option 2A (Formspree)
- **Hosting on Netlify?** → Use Option 2B
- **Traditional PHP hosting?** → Use Option 3
- **Non-technical?** → Use Option 4 (Google Forms)

Let me know which option you prefer and I'll help you set it up!