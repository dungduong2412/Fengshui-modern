# Fengshui Modern – Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for database and auth)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dungduong2412/Fengshui-modern.git
cd Fengshui-modern
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

### Configuration

1. **Frontend Environment Variables**
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

2. **Backend Environment Variables**
```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase service key
```

### Running the Application

**Terminal 1 - Frontend (Port 3000)**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend (Port 3001)**
```bash
cd backend
npm run start:dev
```

Visit http://localhost:3000 to see the application.

---

## 📁 Project Structure

```
Fengshui-modern/
├── frontend/          # Next.js App Router
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── login/
│   │   ├── signup/
│   │   │   ├── customer/
│   │   │   └── master/
│   │   └── dashboard/
│   │       ├── admin/
│   │       ├── master/
│   │       └── customer/
│   └── package.json
│
├── backend/           # NestJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── modules/
│   │       ├── auth/        # Authentication
│   │       ├── users/       # User management
│   │       ├── masters/     # Fengshui Masters
│   │       ├── customers/   # Customer profiles
│   │       ├── services/    # Service management
│   │       └── admin/       # Admin operations
│   └── package.json
│
└── README.md
```

---

## 🏗️ Architecture

### Backend (NestJS)

**Strict Separation of Concerns:**

- **Controllers**: HTTP request/response only, no business logic
- **Services**: Business logic only, no authorization checks
- **Policies**: Authorization & role checks only, no database writes
- **DTOs**: Validation only, no transformations

### Frontend (Next.js)

- Uses App Router for file-based routing
- Role-based dashboard routing
- Supabase for authentication
- Tailwind CSS for styling

### Database (Supabase Postgres)

**SQL as source of truth:**
- Users and roles
- Customer profiles (gold layer)
- Fengshui Masters
- Services (UAT & PROD)
- Approval workflows
- Audit logs

---

## 👥 User Roles

### Admin
- Approves Fengshui Masters
- Approves services
- Promotes services from UAT to PROD
- Monitors all users (read-only)

### Fengshui Master
- Requires admin approval
- Creates and tests services in UAT
- Cannot edit production directly

### Customer
- Manages personal profile (DOB, gender)
- Views approved services
- Books consultations

---

## 🔄 Development Workflow

### Environment Strategy

**UAT (User Acceptance Testing)**
- Fengshui Masters create and test services
- Admin reviews and approves
- Safe testing environment

**PROD (Production)**
- Customer-facing only
- Admin-controlled promotion from UAT
- No direct edits allowed

---

## 🛠️ Available Commands

### Frontend
```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
```

### Backend
```bash
npm run start:dev   # Development with watch mode
npm run build       # Production build
npm run start:prod  # Start production server
npm run lint        # Run ESLint
npm run test        # Run tests
```

---

## 📝 Development Guidelines

### What NOT to do:
- ❌ Add chatbot logic (not yet)
- ❌ Add AI prompts or vector embeddings
- ❌ Use Prisma or other ORMs
- ❌ Mix business logic in controllers
- ❌ Mix authorization in services
- ❌ Allow direct production edits

### What TO do:
- ✅ Use Supabase client directly
- ✅ Write SQL migrations manually
- ✅ Keep separation of concerns strict
- ✅ Handle null and error cases
- ✅ Check role and approval status
- ✅ Prefer clarity over cleverness

---

## 🎯 Next Steps

1. [ ] Set up Supabase project
2. [ ] Create database schema and migrations
3. [ ] Implement Supabase authentication
4. [ ] Build user registration flows
5. [ ] Create admin approval system
6. [ ] Implement service management (UAT)
7. [ ] Build service promotion workflow
8. [ ] Add audit logging

---

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Copilot Instructions](.github/copilot-instructions.md)

---

## 📄 License

Private project - All rights reserved
