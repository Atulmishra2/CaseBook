const fs = require('fs');
async function test() {
  const code = await fetch('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js').then(r => r.text());
  
  const sandbox = {
    fetch: global.fetch,
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    URL: URL,
    window: {}
  };
  sandbox.window = sandbox;
  const vm = require('vm');
  vm.createContext(sandbox);
  
  vm.runInContext(code, sandbox);
  
  const supabaseClient = sandbox.supabase.createClient(
    'https://podehqyygbbabkimbcud.supabase.co', 
    'sb_publishable_r8RXVVAf9UJfa9jtdamN_A_I5ZiDflg'
  );
  
  console.log('Fetching civilcases...');
  const res = await supabaseClient.from('civilcases').select('*').limit(1);
  console.log('Result error:', res.error);
  console.log('Result data length:', res.data ? res.data.length : 'null');
}
test();
