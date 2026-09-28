const { createClient } = require('@supabase/supabase-js');
const url = 'https://podehqyygbbabkimbcud.supabase.co';
const key = 'sb_publishable_r8RXVVAf9UJfa9jtdamN_A_I5ZiDflg';

const supabase = createClient(url, key);

async function test() {
  console.log('Testing Supabase connection...');
  const { data, error } = await supabase.from('civilcases').select('*').limit(1);
  if (error) {
    console.error('SUPABASE ERROR:', error);
  } else {
    console.log('SUCCESS. Data rows:', data ? data.length : 0);
  }
}
test();
