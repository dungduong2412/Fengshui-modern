# Fengshui Modern – Web-First Platform

## Overview

Fengshui Modern is a multi-tenant Fengshui service platform where:

- Fengshui Masters provide services
- Customers consume services
- Admin governs quality, approval, and compliance

The system is designed web-first, with chatbot integration planned only
after data quality reaches gold standard.

---

## Tech Stack

- Frontend: Next.js (App Router)
- Backend: NestJS
- Database & Auth: Supabase (Postgres)
- Workflow (future): n8n
- Development: GitHub Codespaces

---

## Core Principles

- SQL is the source of truth
- Vector data is reserved for explanation and interpretation (future)
- No business logic in controllers
- No authorization logic in services
- No direct production edits

---

## User Roles

### Admin
- Approves Fengshui Masters
- Approves services
- Monitors users and activity

### Fengshui Master
- Registers and awaits approval
- Manages own profile
- Creates services in UAT only

### Customer
- Registers account
- Manages personal profile (DOB, gender, etc.)
- Views and consumes services

---

## Application Flow

### Public Pages
- Home: list approved services
- Sign up as Fengshui Master
- Sign up as Customer
- Login

### After Login
Role-based routing:
- /dashboard/admin
- /dashboard/master
- /dashboard/customer

---

## Database Strategy

### SQL (Supabase Postgres)

Used for:
- Users and roles
- Customer profiles (gold layer)
- Fengshui Masters
- Services
- Approval states
- Audit logs

This data is:
- Deterministic
- Auditable
- Reusable across services
- Chatbot-ready

### Vector (Future)

Reserved for:
- Fengshui explanations
- Educational content
- Natural language interpretation

Vector data never determines outcomes.

---

## Environment Model

- UAT
  - Fengshui Master testing
  - Admin review and approval
- PROD
  - Customer-facing
  - Admin-controlled promotion only

---

## Project Structure

frontend/
  app/
    page.tsx              # Home
    login/
    signup/
      master/
      customer/
    dashboard/
      admin/
      master/
      customer/

backend/
  src/
    modules/
      auth/
      users/
      masters/
      customers/
      services/
      admin/

---

## Out of Scope (Current Phase)

- Chatbot
- AI logic
- Vector embeddings
- Payments
- Automation workflows

These will be added only after data quality validation.

---

## Definition of "Ready for Chatbot"

- Customer profiles are complete and accurate
- Services have strict input/output schemas
- Admin approval workflows are enforced
- No business logic leaks into UI or LLMs

---

## Next Milestones

1. Supabase auth and schema setup
2. Fengshui Master and Customer onboarding
3. Admin approval dashboards
4. Service creation in UAT
5. Data validation hardening

---

## Final Note

This project prioritizes trust, correctness, and long-term scalability
over short-term speed.

Once data integrity is achieved, chatbot integration will be trivial.
