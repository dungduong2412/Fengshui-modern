# Database Schema Quick Reference

## Tables Overview

### 1. system_users
**Purpose**: Core user table linked to Supabase auth

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | References auth.users.id |
| username | VARCHAR | Unique username |
| role | ENUM | admin, master, customer |
| status | ENUM | pending, approved, rejected, inactive, active |
| login_count | INTEGER | Track login frequency |
| created_at | TIMESTAMPTZ | Auto-set |
| updated_at | TIMESTAMPTZ | Auto-updated |

**Indexes**: role, status, username

---

### 2. customers
**Purpose**: Customer profile data (gold layer for chatbot)

| Column | Type | Description |
|--------|------|-------------|
| user_id | UUID (PK, FK) | References system_users.id |
| dob | DATE | Date of birth (for Fengshui) |
| gender | ENUM | male, female, other |
| avatar_url | TEXT | Profile picture URL |
| phone | VARCHAR(20) | Contact phone |
| email | VARCHAR(255) | Contact email |
| timezone | VARCHAR(50) | Default UTC |
| created_at | TIMESTAMPTZ | Auto-set |
| updated_at | TIMESTAMPTZ | Auto-updated |

**Indexes**: email, phone, gender

---

### 3. fengshui_masters
**Purpose**: Master profiles requiring admin approval

| Column | Type | Description |
|--------|------|-------------|
| user_id | UUID (PK, FK) | References system_users.id |
| full_name | VARCHAR(255) | Full legal name |
| phone | VARCHAR(20) | Contact phone |
| email | VARCHAR(255) | Contact email |
| avatar_url | TEXT | Profile picture |
| display_name | VARCHAR(255) | Public display name |
| bio | TEXT | Professional bio |
| certification_files | JSONB | Array of cert URLs |
| service_name | VARCHAR(255) | Primary service |
| service_description | TEXT | Service details |
| uat_enabled | BOOLEAN | Can use UAT (default true) |
| approved_at | TIMESTAMPTZ | Admin approval timestamp |
| created_at | TIMESTAMPTZ | Auto-set |
| updated_at | TIMESTAMPTZ | Auto-updated |

**Indexes**: email, phone, approved_at, uat_enabled

---

### 4. services
**Purpose**: Service management across UAT and PROD

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Service ID |
| master_id | UUID (FK) | References fengshui_masters.user_id |
| name | VARCHAR(255) | Service name |
| description | TEXT | Service description |
| environment | ENUM | uat, prod |
| status | ENUM | pending, approved, rejected, inactive, active |
| input_schema | JSONB | JSON schema for inputs |
| output_schema | JSONB | JSON schema for outputs |
| approved_at | TIMESTAMPTZ | Admin approval |
| promoted_at | TIMESTAMPTZ | UAT to PROD promotion |
| created_at | TIMESTAMPTZ | Auto-set |
| updated_at | TIMESTAMPTZ | Auto-updated |

**Indexes**: master_id, environment, status, approved_at

---

### 5. audit_logs
**Purpose**: Audit trail for all important actions

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Log entry ID |
| user_id | UUID (FK) | References system_users.id |
| action | VARCHAR(100) | Action performed |
| resource_type | VARCHAR(50) | Type of resource |
| resource_id | UUID | ID of affected resource |
| details | JSONB | Additional context |
| ip_address | INET | User IP |
| user_agent | TEXT | Browser/client info |
| created_at | TIMESTAMPTZ | Action timestamp |

**Indexes**: user_id, action, resource_type, created_at

---

## Enums

### user_role
- `admin` - System administrator
- `master` - Fengshui Master
- `customer` - Service customer

### user_status
- `pending` - Awaiting approval
- `approved` - Approved by admin
- `rejected` - Denied by admin
- `inactive` - Temporarily disabled
- `active` - Fully operational

### gender_type
- `male`
- `female`
- `other`

### environment_type
- `uat` - User Acceptance Testing
- `prod` - Production

---

## Views

### pending_masters
Shows masters awaiting admin approval

### pending_services
Shows services awaiting admin approval

### approved_prod_services
Shows all approved production services

---

## Security (RLS Policies)

### system_users
- Users can view/update own profile
- Admin can view/update all users

### customers
- Customers can view/update own profile
- Admin can view all customers

### fengshui_masters
- Masters can view/update own profile
- Admin can view/update all masters

### services
- Masters can view own services
- Masters can create services in UAT only
- Masters can update own UAT services
- Admin can view/update all services
- Customers can view approved PROD services only

### audit_logs
- Only admin can view
- System can insert

---

## Workflows

### Master Approval Workflow
1. User signs up with role `master`
2. Status set to `pending`
3. Admin reviews via `pending_masters` view
4. Admin updates status to `approved`
5. Sets `approved_at` timestamp
6. Master can now create services

### Service Promotion Workflow
1. Master creates service in `uat` environment
2. Status set to `pending`
3. Admin reviews via `pending_services` view
4. Admin approves in UAT
5. Admin promotes to `prod` environment
6. Sets `promoted_at` timestamp
7. Service visible to customers

---

## Next Steps After Migration

1. Create first admin user via Supabase Auth
2. Insert admin record into system_users
3. Test RLS policies
4. Create sample customer
5. Create sample master
6. Test approval workflows
