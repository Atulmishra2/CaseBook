const fs = require('fs');
async function test() {
  const code = await fetch('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js').then(r => r.text());
  console.log('Downloaded UMD size:', code.length);
  // Let's eval it in a safe global context
  const sandbox = {};
  const vm = require('vm');
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox);
    console.log('Keys in sandbox:', Object.keys(sandbox));
    console.log('Type of sandbox.supabase:', typeof sandbox.supabase);
    if (sandbox.supabase) {
      console.log('Keys in sandbox.supabase:', Object.keys(sandbox.supabase));
    }
  } catch(e) {
    console.error('Eval error:', e);
  }
}
test();
