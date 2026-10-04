with open('admin.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, l in enumerate(lines):
    if 'id="accountTransactionModal"' in l:
        start_idx = i
        if i > 0 and 'Add / Edit Transaction Modal' in lines[i-1]:
            start_idx = i - 1
        elif i > 1 and 'Add / Edit Transaction Modal' in lines[i-2]:
            start_idx = i - 2
    if start_idx != -1 and end_idx == -1 and i > start_idx:
        if 'id="paisaReceivedModal"' in l:
            end_idx = i
            if i > 0 and 'PAISA: RECEIVED MONEY' in lines[i-1]:
                end_idx = i - 1
            elif i > 3 and 'PAISA: RECEIVED MONEY' in lines[i-3]:
                end_idx = i - 4
            break

print(f"Removing dead accountTransactionModal from line {start_idx+1} to {end_idx+1}")
if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + lines[end_idx:]
    with open('admin.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"Successfully removed {end_idx - start_idx} lines. New total: {len(new_lines)}")
else:
    print("Could not locate indices safely.")
