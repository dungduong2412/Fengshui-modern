import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load .env.local file
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('🔍 Testing Frontend Supabase Connection...\n');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Anon Key:', supabaseAnonKey ? '✓ Present' : '✗ Missing');
console.log('');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('1️⃣  Testing basic connection...');
    
    // Test connection with a simple query
    const { error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('   ℹ️  Users table does not exist yet (expected)');
        console.log('   ✅ Connection successful!');
      } else {
        console.error('   ❌ Error:', error.message);
      }
    } else {
      console.log('   ✅ Connection and query successful!');
    }

    console.log('\n✅ Frontend Supabase connection test completed!');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
    process.exit(1);
  }
}

testConnection();
