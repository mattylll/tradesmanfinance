# Production Deployment Checklist for TradesmanFinance.co.uk

## Current Status
- Frontend: ✅ Ready for deployment
- Backend: ⚠️ Requires configuration
- Database: ❌ Not configured
- Security: ✅ Code reviewed and secure

## Pre-Deployment Tasks

### 1. Environment Configuration ⚠️
- [ ] Copy `backend/.env.production` to `backend/.env`
- [ ] Update MongoDB connection string with production database
- [ ] Set up Redis instance (local or cloud)
- [ ] Generate strong JWT_SECRET (64+ characters)
- [ ] Generate strong ENCRYPTION_KEY (32 characters)
- [ ] Configure SendGrid API key for email
- [ ] Configure Twilio credentials for SMS
- [ ] Set up GoHighLevel integration (optional)

### 2. Database Setup ❌
- [ ] Create MongoDB Atlas account or set up MongoDB server
- [ ] Create database: `tradesman-finance`
- [ ] Set up database user with read/write permissions
- [ ] Configure IP whitelist for server access
- [ ] Test connection string

### 3. Third-Party Services ⚠️
#### SendGrid (Email)
- [ ] Create SendGrid account
- [ ] Verify domain: tradesmanfinance.co.uk
- [ ] Generate API key
- [ ] Set up email templates

#### Twilio (SMS)
- [ ] Create Twilio account
- [ ] Purchase UK phone number
- [ ] Configure webhook URLs
- [ ] Test SMS sending

#### Redis (Queue Management)
- [ ] Set up Redis instance
- [ ] Configure connection string
- [ ] Test connectivity

### 4. Frontend Optimization ⚠️
- [ ] Minify CSS files (optional but recommended)
- [ ] Minify JavaScript files (optional but recommended)
- [ ] Optimize images (compress for web)
- [ ] Update API endpoints to production URLs

### 5. Deployment Configuration ⚠️
- [ ] Update `deploy-to-siteground.sh` with correct credentials:
  - SITEGROUND_USER
  - SITEGROUND_HOST
  - SITEGROUND_PATH

### 6. DNS & SSL Setup ❌
- [ ] Configure DNS at 123-reg to point to SiteGround
- [ ] Enable SSL certificate in SiteGround
- [ ] Test HTTPS redirect

## Deployment Steps

### Frontend Deployment (SiteGround)
1. Run deployment script:
   ```bash
   ./deploy-to-siteground.sh
   ```
   Or manually upload `deploy_clean/` folder via FTP

2. Verify .htaccess is properly configured
3. Test all pages load correctly
4. Verify forms are working

### Backend Deployment Options

#### Option 1: VPS/Cloud Server (Recommended)
1. Set up Node.js 18+ on server
2. Clone repository
3. Install dependencies:
   ```bash
   cd backend
   npm install --production
   ```
4. Set up PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name tradesman-api
   pm2 start src/worker.js --name tradesman-worker
   pm2 save
   pm2 startup
   ```

#### Option 2: Heroku/Railway/Render
1. Create new app
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## Post-Deployment Verification

### Critical Tests
- [ ] Homepage loads with SSL
- [ ] Calculator works correctly
- [ ] Forms submit successfully
- [ ] API health check: `https://api.tradesmanfinance.co.uk/health`
- [ ] API readiness: `https://api.tradesmanfinance.co.uk/ready`

### Monitoring Setup
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error logging (Sentry, LogRocket)
- [ ] Set up Google Analytics
- [ ] Configure server monitoring

## Security Checklist
- [x] No hardcoded secrets in code
- [x] Input validation on all forms
- [x] Rate limiting configured
- [x] CORS properly configured
- [x] Security headers in place
- [ ] SSL certificate active
- [ ] Firewall rules configured
- [ ] Regular backup schedule

## Known Issues to Address
1. **Environment Variables**: All production credentials need to be set
2. **Database**: MongoDB connection not yet configured
3. **API Domain**: Need to set up api.tradesmanfinance.co.uk subdomain
4. **Image Optimization**: Images should be compressed for faster loading

## Quick Start Commands

### Local Testing
```bash
# Frontend
./start.sh

# Backend
cd backend
npm install
npm run dev
```

### Production Start
```bash
# Backend API
cd backend
NODE_ENV=production npm start

# Worker Process
cd backend
NODE_ENV=production npm run start:worker
```

## Support Contacts
- Domain: 123-reg
- Hosting: SiteGround
- Email: SendGrid support
- SMS: Twilio support

## Next Steps Priority
1. **HIGH**: Set up production database (MongoDB)
2. **HIGH**: Configure environment variables
3. **HIGH**: Set up SSL certificate
4. **MEDIUM**: Configure third-party services (SendGrid, Twilio)
5. **LOW**: Optimize assets (minification, compression)

---

**Last Updated**: Today
**Status**: Ready for deployment with configuration required