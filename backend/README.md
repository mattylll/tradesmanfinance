# Tradesman Finance Backend

Comprehensive lead management system with GoHighLevel integration, automated workflows, and multi-channel communication.

## Features

### 🚀 Core Functionality
- **Lead Capture & Scoring**: Automatic lead scoring based on business criteria
- **GoHighLevel Integration**: Bi-directional sync with GHL CRM
- **Multi-Channel Communication**: Email (SendGrid), SMS (Twilio), and call triggers
- **Automated Workflows**: Smart follow-up sequences based on lead urgency
- **Real-time Notifications**: Instant alerts for high-value leads
- **Case Management**: Complete finance application tracking

### 🤖 Automation Features
- Immediate welcome emails/SMS on form submission
- Urgency-based follow-up sequences
- Long-term nurturing campaigns
- Automatic lead assignment based on score
- Stale lead re-engagement
- Business hours compliance for SMS

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or cloud)
- Redis (for queue management)
- SendGrid account for emails
- Twilio account for SMS
- GoHighLevel account (optional)

### Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Start MongoDB and Redis:**
```bash
# MongoDB
mongod --dbpath /usr/local/var/mongodb

# Redis
redis-server
```

4. **Run the server:**
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## Environment Variables

### Required Services

#### Database
- `MONGODB_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection URL

#### Email (SendGrid)
- `SENDGRID_API_KEY` - Your SendGrid API key
- `SENDGRID_FROM_EMAIL` - Verified sender email
- `SENDGRID_FROM_NAME` - Sender name

#### SMS (Twilio)
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Your Twilio phone number

#### GoHighLevel (Optional but Recommended)
- `GHL_API_KEY` - GoHighLevel API key
- `GHL_LOCATION_ID` - Your GHL location ID
- `GHL_WEBHOOK_SECRET` - For webhook verification

## API Endpoints

### Lead Management

#### Create Lead
```http
POST /api/leads/submit
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "07123456789",
  "businessName": "Smith Electrical",
  "tradeType": "electrician",
  "financeDetails": {
    "amount": 50000,
    "purpose": "equipment",
    "urgency": "urgent"
  }
}
```

#### Get Lead
```http
GET /api/leads/:id
```

#### Update Lead Status
```http
PATCH /api/leads/:id/status
{
  "status": "qualified"
}
```

### Automation Controls

#### Get Automation Status
```http
GET /api/automations/lead/:leadId/status
```

#### Trigger Manual Action
```http
POST /api/automations/lead/:leadId/trigger
{
  "action": "first-followup"
}
```

### Admin Dashboard

#### Dashboard Overview
```http
GET /api/admin/dashboard
```

#### Export Leads
```http
GET /api/admin/leads/export?dateFrom=2024-01-01&dateTo=2024-12-31
```

## Automation Workflows

### New Lead Workflow
1. **Instant** - Welcome email + SMS
2. **Instant** - Sales team notification
3. **5 min** - Hot lead call trigger (score 70+)
4. **30 min-3 days** - Follow-up sequences (based on urgency)
5. **30 days+** - Long-term nurturing

### Follow-up Timing by Urgency
- **Urgent**: 30 min → 2 hours → 24 hours
- **This Week**: 2 hours → 24 hours → 3 days
- **This Month**: 24 hours → 3 days → 7 days
- **Planning**: 3 days → 7 days → 14 days

## Testing

### Test Email/SMS
```http
POST /api/automations/test/communication
{
  "type": "email",
  "to": "test@example.com",
  "content": "Test message"
}
```

## Production Deployment

### Recommended Hosting
- **Backend**: Railway, Render, or Heroku
- **Database**: MongoDB Atlas
- **Redis**: Redis Cloud or Upstash

### Environment Setup
1. Set all production environment variables
2. Enable CORS for your domain
3. Set up webhook URLs in GoHighLevel
4. Configure SendGrid domain authentication
5. Verify Twilio phone numbers

### Security Checklist
- [ ] Change all default secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring (Sentry)
- [ ] Configure backup strategy
- [ ] Test webhook security
- [ ] Enable HTTPS only

## Monitoring

### Health Check
```http
GET /health
```

### Queue Statistics
```http
GET /api/automations/queues/stats
```

## Support

For issues or questions:
- Check logs in `backend/logs/`
- Monitor queue health in Redis
- Review automation history in MongoDB

## License

© 2024 Tradesman Finance. All rights reserved.