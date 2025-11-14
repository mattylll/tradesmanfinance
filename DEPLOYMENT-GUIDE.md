# 🚀 QUICK DEPLOYMENT GUIDE - Tradesman Finance

## ⚡ FASTEST METHOD (15 minutes)

### Step 1: Siteground Setup (5 mins)
1. Log into Siteground → Site Tools
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. Delete any existing files (backup first if needed)

### Step 2: Upload Files (5 mins)

#### Option A: Via Siteground File Manager
1. Download your repo as ZIP from GitHub: 
   - Go to https://github.com/mattylll/tradesmanfinance
   - Click green "Code" button → Download ZIP
2. Upload ZIP to Siteground File Manager
3. Extract in `public_html` folder
4. Delete these folders after upload:
   - `backend/` (not needed for frontend)
   - `.git/`
   - Any `.sh` files

#### Option B: Via FTP (FileZilla)
1. Connect to Siteground:
   - Host: Your Siteground server (check Site Tools → FTP Accounts)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
2. Upload these folders/files to `public_html`:
   - All `.html` files
   - `public/` folder
   - `trades/` folder
   - `includes/` folder
   - `robots.txt`

### Step 3: DNS Setup at 123-reg (2 mins)
1. Log into 123-reg Control Panel
2. Go to Domain Management → Select your domain
3. Click "Manage DNS" (or "Advanced DNS")
4. Update/Add these records:

```
Type    Name    Value                   TTL
A       @       [Siteground IP]         1 Hour
A       www     [Siteground IP]         1 Hour
```

To find your Siteground IP:
- Siteground → Site Tools → Dashboard
- Look for "Site Information" → "IP Address"

### Step 4: SSL Certificate (2 mins)
1. In Siteground Site Tools → Security → SSL Manager
2. Select "Let's Encrypt"
3. Choose your domain
4. Click "Get" for free SSL
5. Enable "HTTPS Enforce"

### Step 5: Create .htaccess (1 min)
Create this file in `public_html/.htaccess`:

```apache
Options -Indexes +FollowSymLinks
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L,QSA]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## ✅ VERIFICATION CHECKLIST

After deployment, check:
- [ ] Site loads at https://tradesmanfinance.co.uk
- [ ] SSL padlock shows in browser
- [ ] Homepage calculator works
- [ ] Trade pages load correctly
- [ ] Contact form displays (won't submit without backend)
- [ ] Mobile responsive works

---

## 🔥 IMMEDIATE ISSUES?

### Site not loading?
- DNS can take 5-30 mins to propagate
- Check with: https://www.whatsmydns.net/#A/tradesmanfinance.co.uk

### SSL not working?
- Wait 5 mins after setup
- Clear browser cache
- Try incognito/private window

### Forms not working?
- Normal! Backend API needed for form submission
- Forms will store data locally for now

---

## 📞 NEXT STEPS (Optional - Backend)

Once frontend is live, you can add backend later:

### Option 1: Use External Service
- Deploy backend to Railway.app or Render.com (free tier)
- Update form endpoints to external API

### Option 2: Siteground Node.js (if available)
- Check if your plan supports Node.js
- Upload backend files
- Set up MongoDB Atlas (cloud database)

### Option 3: Keep Forms Local
- Forms work with localStorage
- No email notifications but captures leads

---

## 🚨 EMERGENCY CONTACTS

**Siteground Support**: Available 24/7 via chat in Site Tools
**123-reg Support**: 0330 221 1007
**DNS Propagation Check**: whatsmydns.net

---

## 🎯 QUICK WIN - GO LIVE NOW!

**Just do Steps 1-5 above = Your site is LIVE in 15 minutes!**

Backend/API can be added later without affecting the live site.