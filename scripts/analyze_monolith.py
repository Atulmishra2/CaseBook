with open('admin.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if i >= 1680 and i <= 4560:
        if 'class="modal-overlay' in l:
            # look ahead 5 lines for id
            block = "".join(lines[max(0, i-3):min(len(lines), i+4)])
            print(f"--- Line {i+1} ---")
            for sub in lines[max(0, i-2):min(len(lines), i+3)]:
                if 'id="' in sub:
                    print("  ID line:", sub.strip())
