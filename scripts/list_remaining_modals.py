with open('admin.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'class="modal-overlay' in l:
        # find id
        modal_id = "unknown"
        for sub in lines[max(0, i-2):min(len(lines), i+3)]:
            if 'id="' in sub:
                modal_id = sub.strip()
        print(f"Line {i+1}: {modal_id}")
