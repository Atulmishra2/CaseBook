with open('admin.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, l in enumerate(lines):
    if 'id="accounts"' in l and 'class="tab"' in l:
        start_idx = i
        # look back for comment
        if i > 0 and 'CHAMBERS ACCOUNTS' in lines[i-1]:
            start_idx = i - 1
        elif i > 3 and 'CHAMBERS ACCOUNTS' in lines[i-3]:
            start_idx = i - 4
    if start_idx != -1 and end_idx == -1 and i > start_idx:
        if 'id="paisa"' in l:
            # end right before paisa comment or div
            end_idx = i
            if i > 0 and 'PAISA (' in lines[i-1]:
                end_idx = i - 1
            elif i > 3 and 'PAISA (' in lines[i-3]:
                end_idx = i - 4
            break

print(f"Removing dead #accounts from line {start_idx+1} to {end_idx+1}")
if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + lines[end_idx:]
    with open('admin.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"Successfully removed {end_idx - start_idx} lines. New total: {len(new_lines)}")
else:
    print("Could not locate indices safely.")
