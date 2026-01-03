import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('🔍 Testing Supabase Connection...\n');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Service Key:', supabaseServiceKey ? '✓ Present' : '✗ Missing');
console.log('');

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

async function testConnection() {
  try {
    console.log('1️⃣  Testing basic connection...');
    
    // Test 1: List tables
    const { data: tables, error: tablesError } = await supabase
      .from('_tables')
      .select('*')
      .limit(1);
    
    if (tablesError) {
      console.log('   ℹ️  No tables query (expected for new database)');
    } else {
      console.log('   ✅ Tables query successful');
    }

    // Test 2: Check auth
    console.log('\n2️⃣  Testing auth service...');
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('   ❌ Auth error:', authError.message);
    } else {
      console.log('   ✅ Auth service connected');
      console.log(`   👥 Current users: ${authData.users.length}`);
    }

    // Test 3: Try a simple query
    console.log('\n3️⃣  Testing database query...');
    const { error: queryError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (queryError) {
      if (queryError.message.includes('relation') || queryError.message.includes('does not exist')) {
        console.log('   ℹ️  Users table does not exist yet (expected)');
      } else {
        console.error('   ❌ Query error:', queryError.message);
      }
    } else {
      console.log('   ✅ Database query successful');
    }

    console.log('\n✅ Supabase connection test completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Create database schema');
    console.log('   2. Run migrations');
    console.log('   3. Set up authentication');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
    process.exit(1);
  }
}

testConnection();
