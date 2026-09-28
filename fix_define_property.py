with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = '''if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'allCaseRecords', {
    get() { return allCaseRecords; },
    set(v) { allCaseRecords = v; },
    configurable: true
  });
  Object.defineProperty(window, 'allHearingRecords', {
    get() { return allHearingRecords; },
    set(v) { allHearingRecords = v; },
    configurable: true
  });
}'''

replacement = '''if (typeof window !== 'undefined') {
  try {
    Object.defineProperty(window, 'allCaseRecords', {
      get() { return typeof allCaseRecords !== 'undefined' ? allCaseRecords : (window._allCaseRecords || []); },
      set(v) { if (typeof allCaseRecords !== 'undefined') allCaseRecords = v; window._allCaseRecords = v; },
      configurable: true
    });
  } catch (e) {
    try { window.allCaseRecords = allCaseRecords; } catch (err) {}
  }
  try {
    Object.defineProperty(window, 'allHearingRecords', {
      get() { return typeof allHearingRecords !== 'undefined' ? allHearingRecords : (window._allHearingRecords || []); },
      set(v) { if (typeof allHearingRecords !== 'undefined') allHearingRecords = v; window._allHearingRecords = v; },
      configurable: true
    });
  } catch (e) {
    try { window.allHearingRecords = allHearingRecords; } catch (err) {}
  }
}'''

if target in js:
    js = js.replace(target, replacement)
    print("Replaced Object.defineProperty block with safe try-catch wrapper!")
else:
    print("Target block not matched exactly, applying regex...")
    import re
    js = re.sub(r'if \(typeof window !== \'undefined\'\) \{\s*Object\.defineProperty\(window,\s*\'allCaseRecords\'[\s\S]*?\}\);\s*\}', replacement, js)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
