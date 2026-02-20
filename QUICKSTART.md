# Quick Start Guide

## DBOptima - AI-Powered Database Optimization Platform

**King Group Of Technology** | **Muhammad Jawad, CEO & Founder**

---

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Python AI service dependencies
cd ai-service
pip install -r requirements.txt
cd ..
```

### Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local with your actual values
```

### Step 3: Start Development Servers

```bash
# Terminal 1: Start AI Service
cd ai-service
uvicorn app:app --reload --port 8000

# Terminal 2: Start Next.js Application
npm run dev
```

**Open [http://localhost:3000](http://localhost:3000)**

---

## 🔑 Default Login Credentials

**Email:** `admin@kingtech.com`  
**Password:** `password`

---

## 📁 Project Structure Overview

```
DataBase Optimization Tool/
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── api/               # API Routes (auth, health)
│   │   ├── (pages)/           # Application Pages
│   │   │   ├── page.tsx       # Login page
│   │   │   ├── signup/        # Sign up page
│   │   │   ├── forgot-password/
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── databases/     # DB connections
│   │   │   ├── optimizer/     # Query optimizer
│   │   │   ├── indexes/       # Index advisor
│   │   │   ├── alerts/        # Alerts & notifications
│   │   │   ├── reports/       # Reports generation
│   │   │   └── team/          # Team management
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/ui/         # Reusable UI Components
│   ├── hooks/                 # Custom React Hooks
│   └── lib/                   # Utility Functions
├── ai-service/               # Python AI Microservice
│   ├── app.py               # FastAPI application
│   └── requirements.txt       # Python dependencies
├── README.md                 # Full documentation
└── package.json             # Node.js dependencies
```

---

## 🎯 Key Features Available

1. **Dashboard** - Real-time metrics and monitoring
2. **Database Management** - Multi-database connections (PostgreSQL, MySQL, MongoDB, Redis)
3. **Query Optimizer** - AI-powered query analysis and optimization
4. **Index Advisor** - Smart index recommendations
5. **Alerts System** - Real-time notifications and monitoring
6. **Reports** - PDF/CSV report generation
7. **Team Management** - Role-based access control

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

---

## 🌐 API Endpoints

### AI Service (Python/FastAPI)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service info |
| `/health` | GET | Health check |
| `/analyze-query` | POST | Analyze SQL query |
| `/recommend-indexes` | POST | Get index recommendations |
| `/estimate-performance` | POST | Estimate query performance |

### Next.js API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/health` | GET | System health check |

---

## 🎨 Design System

- **Glassmorphism** UI with backdrop blur effects
- **Dark/Light** mode support
- **Responsive** layouts for all devices
- **Smooth animations** with Framer Motion
- **Accessible** components with Radix UI
- **Premium** enterprise-grade aesthetics

---

## 👥 User Roles

- **Admin** - Full system access and user management
- **DBA** - Database management and optimization
- **Developer** - Query analysis and optimization tools
- **Viewer** - Read-only access to reports and metrics

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** `Cannot find module '@radix-ui/react-*'`
**Solution:** Run `npm install` to install missing dependencies

**Issue:** `Python AI service not connecting`
**Solution:** Ensure the AI service is running on port 8000

**Issue:** `Database connection errors`
**Solution:** Check your DATABASE_URL in .env.local

---

## 📞 Support

**King Group Of Technology**
- **Website:** https://kingtech.com
- **Email:** support@kingtech.com
- **Founder:** Muhammad Jawad

---

## 📄 License

Proprietary software owned by King Group Of Technology.

© 2024 King Group Of Technology. All rights reserved.

---

**Built with ❤️ by King Group Of Technology**
