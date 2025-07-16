# My Exam Dashboard - Complete Setup Guide

## 🚀 Features Implemented

### ✅ Core Features
- **User Authentication** - JWT-based auth with signup/login
- **Exam Management** - CRUD operations for exams
- **Categories** - Organized exam categories
- **Saved Exams** - Bookmark system for users
- **Dashboard** - Personalized overview with tabs
- **Responsive Design** - Mobile-first with TailwindCSS

### ✅ AI & Automation
- **AI News Integration** - OpenAI + NewsAPI for exam news
- **Email Notifications** - Deadline reminders via Nodemailer
- **Cron Jobs** - Automated news fetching and reminders
- **News Summarization** - GPT-powered news summaries

### ✅ Admin Panel
- **Exam Management** - Add/edit/delete exams
- **News Fetching** - Manual trigger for AI news
- **User Management** - View and manage system

### ✅ Search & Filters
- **Text Search** - Search by name, description, eligibility
- **Category Filter** - Filter by exam category
- **Status Filter** - Open/closed applications
- **Date Range** - Filter by exam dates

## 📋 Quick Setup

### 1. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your keys:
```bash
cp .env.local.example .env.local
```

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `OPENAI_API_KEY` - OpenAI API key
- `NEWS_API_KEY` - NewsAPI key
- `EMAIL_USER` - Gmail address
- `EMAIL_PASS` - Gmail app password
- `CRON_SECRET` - Secret for cron jobs

### 2. Database Setup
```bash
# Start MongoDB locally or use MongoDB Atlas
# The app will auto-create collections on first run
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
# App runs on http://localhost:8000
```

### 5. Setup Categories (One-time)
Visit `/admin` to add exam categories like:
- UPSC
- JEE
- SSC
- Banking
- GATE
- Defence
- NEET
- CAT
- CLAT
- IBPS

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Exams
- `GET /api/exams/upcoming` - Get upcoming exams
- `GET /api/exams/search` - Search exams with filters
- `GET /api/exams/[id]` - Get specific exam details

### User Features
- `GET /api/user/savedExams` - Get user's saved exams
- `POST /api/user/savedExams` - Save an exam
- `DELETE /api/user/savedExams` - Remove saved exam

### News
- `GET /api/news/latest` - Get latest AI-summarized news
- `POST /api/admin/fetch-news` - Trigger news fetching (admin)

### Admin
- `GET /admin` - Admin dashboard
- `POST /api/admin/exams` - Add new exam
- `DELETE /api/admin/exams/[id]` - Delete exam

## 🤖 AI Features Setup

### News Fetching
```bash
# Manual news fetch
npm run fetch-news

# Set up cron job (every 6 hours)
# Add to crontab:
0 */6 * * * cd /path/to/project && npm run fetch-news
```

### Email Reminders
```bash
# Manual reminder send
npm run send-reminders

# Set up daily cron job
# Add to crontab:
0 9 * * * cd /path/to/project && npm run send-reminders
```

## 🎯 Usage Guide

### For Users
1. **Sign Up** - Create account at `/signup`
2. **Browse Exams** - Visit `/exams` to see all exams
3. **Save Exams** - Click bookmark icon to save
4. **Dashboard** - View saved exams and countdowns at `/dashboard`
5. **News** - Stay updated with `/news`

### For Admins
1. **Access Admin** - Visit `/admin`
2. **Add Exams** - Use the form to add new exams
3. **Manage Exams** - View and delete existing exams
4. **Fetch News** - Click "Fetch Latest News" button

## 🌐 Deployment

### Vercel (Frontend)
```bash
vercel --prod
```

### Environment Variables for Production
- Set all environment variables in Vercel dashboard
- Configure MongoDB Atlas for database
- Set up Gmail app password for email

### Cron Jobs in Production
- Use Vercel Cron Jobs or external service like:
  - EasyCron
  - Cron-job.org
  - AWS Lambda + CloudWatch

## 📊 Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI GPT-3.5, NewsAPI
- **Email**: Nodemailer with Gmail
- **Authentication**: JWT tokens
- **UI**: Shadcn/ui components

## 🔍 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Exam browsing and saving
- [ ] Dashboard countdown display
- [ ] News fetching and display
- [ ] Admin panel functionality
- [ ] Email notifications
- [ ] Search and filters
- [ ] Responsive design on mobile

### API Testing
```bash
# Test endpoints with curl
curl http://localhost:8000/api/exams/upcoming
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

## 🆘 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Check MONGODB_URI format
2. **Email Issues**: Ensure Gmail app password is correct
3. **AI News**: Verify OpenAI and NewsAPI keys
4. **CORS Issues**: Check NEXT_PUBLIC_URL matches your domain

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📞 Support
For issues or questions:
1. Check the browser console for errors
2. Verify all environment variables
3. Ensure MongoDB is running
4. Check email configuration
