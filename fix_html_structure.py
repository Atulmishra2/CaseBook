with open('d:/caseBook/admin.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix admin.html html corruption
bad_chunk = '''            <!-- Disposed Cases tab: list closed or disposed matters -->
            <div id="disposed" class="tab" data-tab-src="components/tabs/disposed/disposed.html"></div>
</div>

<!-- Supabase Database Manager Tab: Direct live data inspection & Full CRUD -->
            <!-- Live CRUD (Simple) Tab -->
            <div id="livecrud" class="tab" data-tab-src="components/tabs/livecrud/livecrud.html"></div>

            <!-- Change Password & Credentials Tab -->
            <div id="settings" class="tab" data-tab-src="components/tabs/settings/settings.html"></div>
            
            <!-- Themes Tab (v7.44) -->
            <div id="themes" class="tab" data-tab-src="components/tabs/themes/themes.html"></div>
                    <div id="themeOptionsGrid" aria-label="Available themes"></div>
                </div>
            </div>'''

good_chunk = '''            <!-- Disposed Cases tab: list closed or disposed matters -->
            <div id="disposed" class="tab" data-tab-src="components/tabs/disposed/disposed.html"></div>

            <!-- Live CRUD (Simple) Tab -->
            <div id="livecrud" class="tab" data-tab-src="components/tabs/livecrud/livecrud.html"></div>

            <!-- Change Password & Credentials Tab -->
            <div id="settings" class="tab" data-tab-src="components/tabs/settings/settings.html"></div>
            
            <!-- Themes Tab (v7.44) -->
            <div id="themes" class="tab" data-tab-src="components/tabs/themes/themes.html"></div>'''

if bad_chunk in content:
    content = content.replace(bad_chunk, good_chunk)
    print("Fixed admin.html chunk successfully!")
else:
    print("bad_chunk not found exactly, attempting regex replacement...")
    import re
    content = re.sub(r'<div id="themes" class="tab" data-tab-src="components/tabs/themes/themes\.html"></div>\s*<div id="themeOptionsGrid".*?</div>\s*</div>\s*</div>', '<div id="themes" class="tab" data-tab-src="components/tabs/themes/themes.html"></div>', content, flags=re.DOTALL)
    content = re.sub(r'(<div id="disposed".*?</div>)\s*</div>\s*<!-- Supabase Database Manager Tab.*?>', r'\1', content, flags=re.DOTALL)

with open('d:/caseBook/admin.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('d:/caseBook/index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

idx_bad = '''            <!-- Themes Tab (v7.44) -->
            <div id="themes" class="tab" data-tab-src="components/tabs/themes/themes.html"></div>
                    <div id="themeOptionsGrid" aria-label="Available themes"></div>
                </div>
            </div>'''

idx_good = '''            <!-- Themes Tab (v7.44) -->
            <div id="themes" class="tab" data-tab-src="components/tabs/themes/themes.html"></div>'''

if idx_bad in idx_content:
    idx_content = idx_content.replace(idx_bad, idx_good)
    print("Fixed index.html chunk successfully!")
else:
    import re
    idx_content = re.sub(r'<div id="themes" class="tab" data-tab-src="components/tabs/themes/themes\.html"></div>\s*<div id="themeOptionsGrid".*?</div>\s*</div>\s*</div>', '<div id="themes" class="tab" data-tab-src="components/tabs/themes/themes.html"></div>', idx_content, flags=re.DOTALL)

with open('d:/caseBook/index.html', 'w', encoding='utf-8') as f:
    f.write(idx_content)
