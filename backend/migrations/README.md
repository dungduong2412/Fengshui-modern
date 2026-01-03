# Database Migrations

This directory contains SQL migration files for the Fengshui Modern database.

## Migration Files

- `001_initial_schema.sql` - Initial database schema with all core tables

## Running Migrations

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of the migration file
4. Execute the SQL

### Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref qxruafhkipkayvosgmdj

# Run migrations
supabase db push
```

### Manual Execution

```bash
# Using psql
psql postgresql://postgres:[YOUR-PASSWORD]@db.qxruafhkipkayvosgmdj.supabase.co:5432/postgres -f 001_initial_schema.sql
```

## Database Schema

### Tables

1. **system_users** - Core user table linked to Supabase auth
   - Links to `auth.users`
   - Stores role (admin, master, customer)
   - Tracks login count and status

2. **customers** - Customer profile data (gold layer)
   - Personal information
   - DOB and gender for Fengshui calculations
   - Contact details

3. **fengshui_masters** - Master profiles
   - Professional information
   - Certification files
   - Service offerings
   - Approval status

4. **services** - Service management
   - UAT and PROD environments
   - Input/output schemas
   - Approval workflow

5. **audit_logs** - Audit trail
   - Tracks all important actions
   - User actions and changes
   - Resource modifications

### Security

All tables have Row Level Security (RLS) enabled with appropriate policies:

- **Customers**: Can only access their own data
- **Masters**: Can only access their own data and create UAT services
- **Admin**: Full access to all data
- **Services**: Environment-based access control

### Triggers

- Automatic `updated_at` timestamp updates
- Maintained via `update_updated_at_column()` function

## Important Notes

1. **No Prisma** - Direct Supabase client usage only
2. **Manual migrations** - All schema changes via SQL
3. **SQL = Truth** - Database is the source of truth
4. **RLS enforced** - Security policies prevent unauthorized access

## Schema Updates

When making schema changes:

1. Create a new migration file: `00X_description.sql`
2. Include rollback instructions in comments
3. Test in UAT environment first
4. Document changes in this README
5. Update backend types/interfaces accordingly

## Rollback

To rollback migrations, create a down migration:

```sql
-- 001_initial_schema_down.sql
DROP VIEW IF EXISTS approved_prod_services;
DROP VIEW IF EXISTS pending_services;
DROP VIEW IF EXISTS pending_masters;
-- ... continue with all drops in reverse order
```
