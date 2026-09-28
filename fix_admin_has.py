import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('''function getDeletedCourtsSet() {
  try {
    const list = JSON.parse(localStorage.getItem('cmDeletedCourts') || '[]');
    if (Array.isArray(list)) {
      return new Set(list.map(c => (c || '').trim().toLowerCase()).filter(Boolean));
    }
  } catch (e) {
    return new Set();
  }
}''', '''function getDeletedCourtsSet() {
  try {
    const list = JSON.parse(localStorage.getItem('cmDeletedCourts') || '[]');
    if (Array.isArray(list)) {
      return new Set(list.map(c => (c || '').trim().toLowerCase()).filter(Boolean));
    }
  } catch (e) {
  }
  return new Set();
}''')

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
