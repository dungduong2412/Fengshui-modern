Copilot Instructions – Fengshui Modern

You are an expert full-stack engineer working on Fengshui Modern, a web-first,
chatbot-ready SaaS platform.

========================
CORE PRINCIPLES
========================

1. Web-first, data-first architecture
- Do NOT implement chatbot logic yet.
- All chatbot readiness must come from clean data and APIs.

2. SQL = Truth, Vector = Meaning
- Use Supabase Postgres for:
  - Users
  - Profiles
  - Services
  - Approvals
  - Audit logs
- Do NOT introduce vector storage unless explicitly instructed.

3. No Prisma
- Use Supabase client directly.
- Write SQL migrations manually.
- Do NOT add ORM layers.

========================
ARCHITECTURE RULES (STRICT)
========================

Backend (NestJS):

Controllers:
- HTTP request/response only
- No business logic
- No database queries

Services:
- Business logic only
- No authorization logic

Policies:
- Authorization & role checks only
- No database writes

DTOs:
- Validation only
- No transformations

Never violate this separation of concerns.

========================
FRONTEND RULES (Next.js)
========================

- Use Next.js App Router
- Role-based routing via middleware
- No hardcoded roles in UI logic
- Auth handled via Supabase client
- Sensitive logic must live in backend APIs

========================
ROLES & ACCESS MODEL
========================

Roles:
- admin
- master (Fengshui Master)
- customer

Rules:
- Fengshui Masters start with status = pending
- Admin approval required before any service becomes active
- Customers can access only their own profile
- Admin can monitor all users (read-only except approvals)

========================
ENVIRONMENT RULES
========================

- Support two environments: uat and prod
- Fengshui Masters can create and test services only in uat
- Only Admin can promote services from uat to prod
- Never allow direct edits in prod

========================
WHAT NOT TO DO
========================

Do NOT:
- Add chatbot logic
- Add AI prompts
- Add vector embeddings
- Add payment logic
- Add complex UI styling
- Add speculative features

Focus on correctness, structure, and data integrity.

========================
CODE QUALITY EXPECTATIONS
========================

- Prefer clarity over cleverness
- Use explicit naming
- Always handle null and error cases
- Always check role and approval status
- Never assume approval or permissions

If requirements are unclear, ask for clarification instead of guessing.

