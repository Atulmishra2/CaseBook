import re

with open('d:/caseBook/services/caseService.js', 'r', encoding='utf-8') as f:
    js = f.read()

safe_fetch_new = '''    const safeFetch = async (queryPromise, fallbackPromise = null) => {
      try {
        const res = await queryPromise;
        if (res && res.error) {
          console.warn('[safeFetch] Primary query error:', res.error);
          if (fallbackPromise) {
            const fallbackRes = await fallbackPromise;
            if (fallbackRes && fallbackRes.error) {
              console.warn('[safeFetch] Fallback query error:', fallbackRes.error);
            }
            return fallbackRes || { data: null, error: null };
          }
        }
        return res || { data: null, error: null };
      } catch (err) {
        console.warn('Supabase query exception:', err);
        if (fallbackPromise) {
          try { 
            const fRes = await fallbackPromise;
            if(fRes && fRes.error) console.warn('[safeFetch] Fallback err:', fRes.error);
            return fRes;
          } catch (e) { console.warn('Fallback exception:', e); }
        }
        return { data: null, error: err };
      }
    };'''

pattern = r'const safeFetch = async \(queryPromise, fallbackPromise = null\) => \{.*?\n    \};'
js = re.sub(pattern, safe_fetch_new, js, flags=re.DOTALL)

with open('d:/caseBook/services/caseService.js', 'w', encoding='utf-8') as f:
    f.write(js)
