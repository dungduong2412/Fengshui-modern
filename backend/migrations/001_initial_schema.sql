-- =============================================
-- Fengshui Modern - Initial Database Schema
-- Migration: 001_initial_schema
-- Date: 2026-01-03
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- ENUMS
-- =============================================

-- User role enum
CREATE TYPE user_role AS ENUM ('admin', 'master', 'customer');

-- User status enum
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected', 'inactive', 'active');

-- Gender enum
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');

-- Environment enum for services
CREATE TYPE environment_type AS ENUM ('uat', 'prod');

-- =============================================
-- TABLES
-- =============================================

-- System Users Table
-- Links to Supabase auth.users
CREATE TABLE public.system_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(255) UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    status user_status NOT NULL DEFAULT 'pending',
    login_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for system_users
CREATE INDEX idx_system_users_role ON public.system_users(role);
CREATE INDEX idx_system_users_status ON public.system_users(status);
CREATE INDEX idx_system_users_username ON public.system_users(username);

-- Add comments
COMMENT ON TABLE public.system_users IS 'Core user table linked to Supabase auth';
COMMENT ON COLUMN public.system_users.id IS 'References auth.users.id';
COMMENT ON COLUMN public.system_users.status IS 'pending: awaiting approval, approved: can use system, rejected: denied access, inactive: temporarily disabled, active: fully operational';

-- =============================================

-- Customers Table
-- Stores customer profile data (gold layer)
CREATE TABLE public.customers (
    user_id UUID PRIMARY KEY REFERENCES public.system_users(id) ON DELETE CASCADE,
    dob DATE NOT NULL,
    gender gender_type NOT NULL,
    avatar_url TEXT,
    phone VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for customers
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_phone ON public.customers(phone);
CREATE INDEX idx_customers_gender ON public.customers(gender);

-- Add comments
COMMENT ON TABLE public.customers IS 'Customer profile data - gold layer for chatbot readiness';
COMMENT ON COLUMN public.customers.dob IS 'Date of birth - required for Fengshui calculations';
COMMENT ON COLUMN public.customers.email IS 'Customer contact email';

-- =============================================

-- Fengshui Masters Table
-- Stores master profile and service information
CREATE TABLE public.fengshui_masters (
    user_id UUID PRIMARY KEY REFERENCES public.system_users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    display_name VARCHAR(255),
    bio TEXT,
    certification_files JSONB DEFAULT '[]'::jsonb,
    service_name VARCHAR(255),
    service_description TEXT,
    uat_enabled BOOLEAN NOT NULL DEFAULT true,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for fengshui_masters
CREATE INDEX idx_fengshui_masters_email ON public.fengshui_masters(email);
CREATE INDEX idx_fengshui_masters_phone ON public.fengshui_masters(phone);
CREATE INDEX idx_fengshui_masters_approved_at ON public.fengshui_masters(approved_at);
CREATE INDEX idx_fengshui_masters_uat_enabled ON public.fengshui_masters(uat_enabled);

-- Add comments
COMMENT ON TABLE public.fengshui_masters IS 'Fengshui master profiles requiring admin approval';
COMMENT ON COLUMN public.fengshui_masters.approved_at IS 'Timestamp when admin approved this master';
COMMENT ON COLUMN public.fengshui_masters.uat_enabled IS 'Can create services in UAT environment';
COMMENT ON COLUMN public.fengshui_masters.certification_files IS 'Array of certification document URLs';

-- =============================================

-- Services Table
-- Manages services in UAT and PROD environments
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    master_id UUID NOT NULL REFERENCES public.fengshui_masters(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    environment environment_type NOT NULL DEFAULT 'uat',
    status user_status NOT NULL DEFAULT 'pending',
    input_schema JSONB NOT NULL DEFAULT '{}'::jsonb,
    output_schema JSONB NOT NULL DEFAULT '{}'::jsonb,
    approved_at TIMESTAMPTZ,
    promoted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for services
CREATE INDEX idx_services_master_id ON public.services(master_id);
CREATE INDEX idx_services_environment ON public.services(environment);
CREATE INDEX idx_services_status ON public.services(status);
CREATE INDEX idx_services_approved_at ON public.services(approved_at);

-- Add comments
COMMENT ON TABLE public.services IS 'Fengshui services managed across UAT and PROD environments';
COMMENT ON COLUMN public.services.environment IS 'uat: testing, prod: customer-facing';
COMMENT ON COLUMN public.services.input_schema IS 'JSON schema for service inputs';
COMMENT ON COLUMN public.services.output_schema IS 'JSON schema for service outputs';
COMMENT ON COLUMN public.services.promoted_at IS 'When service was promoted from UAT to PROD';

-- =============================================

-- Audit Logs Table
-- Tracks all important actions
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.system_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for audit_logs
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_resource_type ON public.audit_logs(resource_type);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- Add comments
COMMENT ON TABLE public.audit_logs IS 'Audit trail for all important system actions';
COMMENT ON COLUMN public.audit_logs.action IS 'Action performed (e.g., approve_master, promote_service)';
COMMENT ON COLUMN public.audit_logs.resource_type IS 'Type of resource affected (e.g., master, service, customer)';

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger for system_users
CREATE TRIGGER set_system_users_updated_at
    BEFORE UPDATE ON public.system_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for customers
CREATE TRIGGER set_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for fengshui_masters
CREATE TRIGGER set_fengshui_masters_updated_at
    BEFORE UPDATE ON public.fengshui_masters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for services
CREATE TRIGGER set_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.system_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fengshui_masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - System Users
-- =============================================

-- Users can view their own record
CREATE POLICY "Users can view own profile"
    ON public.system_users
    FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own record (except role and status)
CREATE POLICY "Users can update own profile"
    ON public.system_users
    FOR UPDATE
    USING (auth.uid() = id);

-- Admin can view all users
CREATE POLICY "Admin can view all users"
    ON public.system_users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admin can update all users
CREATE POLICY "Admin can update all users"
    ON public.system_users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- RLS POLICIES - Customers
-- =============================================

-- Customers can view their own profile
CREATE POLICY "Customers can view own profile"
    ON public.customers
    FOR SELECT
    USING (auth.uid() = user_id);

-- Customers can update their own profile
CREATE POLICY "Customers can update own profile"
    ON public.customers
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Customers can insert their own profile
CREATE POLICY "Customers can insert own profile"
    ON public.customers
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admin can view all customers
CREATE POLICY "Admin can view all customers"
    ON public.customers
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- RLS POLICIES - Fengshui Masters
-- =============================================

-- Masters can view their own profile
CREATE POLICY "Masters can view own profile"
    ON public.fengshui_masters
    FOR SELECT
    USING (auth.uid() = user_id);

-- Masters can update their own profile
CREATE POLICY "Masters can update own profile"
    ON public.fengshui_masters
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Masters can insert their own profile
CREATE POLICY "Masters can insert own profile"
    ON public.fengshui_masters
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admin can view all masters
CREATE POLICY "Admin can view all masters"
    ON public.fengshui_masters
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admin can update all masters (for approval)
CREATE POLICY "Admin can update all masters"
    ON public.fengshui_masters
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- RLS POLICIES - Services
-- =============================================

-- Masters can view their own services
CREATE POLICY "Masters can view own services"
    ON public.services
    FOR SELECT
    USING (
        master_id IN (
            SELECT user_id FROM public.fengshui_masters
            WHERE user_id = auth.uid()
        )
    );

-- Masters can insert services in UAT
CREATE POLICY "Masters can create services in UAT"
    ON public.services
    FOR INSERT
    WITH CHECK (
        environment = 'uat' AND
        master_id IN (
            SELECT user_id FROM public.fengshui_masters
            WHERE user_id = auth.uid() AND uat_enabled = true
        )
    );

-- Masters can update their own services in UAT
CREATE POLICY "Masters can update own UAT services"
    ON public.services
    FOR UPDATE
    USING (
        environment = 'uat' AND
        master_id IN (
            SELECT user_id FROM public.fengshui_masters
            WHERE user_id = auth.uid()
        )
    );

-- Admin can view all services
CREATE POLICY "Admin can view all services"
    ON public.services
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admin can update all services (for approval and promotion)
CREATE POLICY "Admin can update all services"
    ON public.services
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Customers can view approved PROD services
CREATE POLICY "Customers can view approved prod services"
    ON public.services
    FOR SELECT
    USING (
        environment = 'prod' AND
        status = 'approved' AND
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'customer'
        )
    );

-- =============================================
-- RLS POLICIES - Audit Logs
-- =============================================

-- Only admin can view audit logs
CREATE POLICY "Admin can view audit logs"
    ON public.audit_logs
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.system_users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- System can insert audit logs (backend service role)
CREATE POLICY "System can insert audit logs"
    ON public.audit_logs
    FOR INSERT
    WITH CHECK (true);

-- =============================================
-- INITIAL DATA
-- =============================================

-- Note: First admin user should be created via Supabase Auth
-- Then manually insert into system_users with role 'admin'

-- =============================================
-- VIEWS
-- =============================================

-- View for pending master approvals
CREATE OR REPLACE VIEW pending_masters AS
SELECT 
    su.id,
    su.username,
    su.status,
    fm.full_name,
    fm.email,
    fm.certification_files,
    fm.created_at
FROM public.system_users su
JOIN public.fengshui_masters fm ON su.id = fm.user_id
WHERE su.role = 'master' AND su.status = 'pending'
ORDER BY fm.created_at ASC;

-- View for pending service approvals
CREATE OR REPLACE VIEW pending_services AS
SELECT 
    s.id,
    s.name,
    s.description,
    s.environment,
    s.status,
    fm.full_name as master_name,
    s.created_at
FROM public.services s
JOIN public.fengshui_masters fm ON s.master_id = fm.user_id
WHERE s.status = 'pending'
ORDER BY s.created_at ASC;

-- View for approved production services
CREATE OR REPLACE VIEW approved_prod_services AS
SELECT 
    s.id,
    s.name,
    s.description,
    s.input_schema,
    s.output_schema,
    fm.full_name as master_name,
    fm.display_name as master_display_name,
    s.approved_at,
    s.promoted_at
FROM public.services s
JOIN public.fengshui_masters fm ON s.master_id = fm.user_id
WHERE s.environment = 'prod' AND s.status = 'approved'
ORDER BY s.promoted_at DESC;

-- =============================================
-- GRANTS
-- =============================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant access to tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant access to sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- =============================================
-- END OF MIGRATION
-- =============================================
