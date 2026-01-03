import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function runMigration() {
  try {
    console.log('🚀 Running database migration...\n');

    // Read migration file
    const migrationPath = join(__dirname, 'migrations', '001_initial_schema.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration file loaded');
    console.log('📊 Executing SQL...\n');

    // Execute migration
    const { error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL,
    });

    if (error) {
      console.error('❌ Migration failed:', error.message);
      console.log('\n💡 Manual execution required:');
      console.log('   1. Go to Supabase Dashboard > SQL Editor');
      console.log('   2. Copy contents of backend/migrations/001_initial_schema.sql');
      console.log('   3. Execute the SQL');
      process.exit(1);
    }

    console.log('✅ Migration completed successfully!\n');
    console.log('📋 Created tables:');
    console.log('   ✓ system_users');
    console.log('   ✓ customers');
    console.log('   ✓ fengshui_masters');
    console.log('   ✓ services');
    console.log('   ✓ audit_logs\n');
    console.log('🔒 Row Level Security enabled on all tables');
    console.log('🎯 Views created for pending approvals');

  } catch (error) {
    console.error('❌ Error running migration:', error);
    console.log('\n💡 Manual execution required:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy contents of backend/migrations/001_initial_schema.sql');
    console.log('   3. Execute the SQL');
    process.exit(1);
  }
}

runMigration();
