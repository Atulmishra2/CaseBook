import re

with open('d:/caseBook/services/caseService.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'''(const safeFetch = async \(queryPromise, fallbackPromise = null\) => \{.*?try \{.*?const res = await queryPromise;.*?if \(res && res\.error && fallbackPromise\) \{.*?return await fallbackPromise;.*?\}).*?(return res \|\| \{ data: null, error: null \};)'''

replacement = r'''\1
        if (res && res.error) console.error('[safeFetch] Query returned error:', res.error);
        \2'''

js = re.sub(pattern, replacement, js, flags=re.DOTALL)

with open('d:/caseBook/services/caseService.js', 'w', encoding='utf-8') as f:
    f.write(js)
