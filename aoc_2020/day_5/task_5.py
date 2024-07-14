import numpy as np

filename = 'puzzle_input_5.txt'
file = open(filename, 'r')

def row_num(pass_row):
    row = 0
    k = 6
    for char in pass_row:
        if char == 'B':
            row += 2**k 
        k-=1
    return row

def col_num(pass_col):
    col = 0
    k = 2
    for char in pass_col:
        if char == 'R':
            col+= 2**k
        k-=1
    return col

passes_row = []
passes_col = []
ID = []
for line in file:
    line.rstrip()
    passes_row.append(row_num(line[:7]))
    passes_col.append(col_num(line[-4:]))
    ID.append(8*passes_row[-1] + passes_col[-1])

# print(np.max(ID))
ID = np.sort(ID)
diffs = np.diff(ID)
for i, diff in enumerate(diffs):
    if diff != 1:
        print(diff)
        print(ID[i-1], ID[i], ID[i+1])


