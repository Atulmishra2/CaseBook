async function test() {
  const url = 'https://podehqyygbbabkimbcud.supabase.co/rest/v1/civilcases?select=*&limit=1';
  const key = 'sb_publishable_r8RXVVAf9UJfa9jtdamN_A_I5ZiDflg';
  
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json'
      }
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}
test();
