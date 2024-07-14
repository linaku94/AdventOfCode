from collections import Counter
import numpy as np

def flip_hexes(hex_grid):
    new_grid = np.copy(hex_grid)
    for i in range(1,hex_grid.shape[0]-1):
        for k in range(1,hex_grid.shape[1]-1):
            num_next = np.sum([hex_grid[i-1:i+2, k-1:k+2]]) - hex_grid[i,k]
            num_next -= (hex_grid[i-1,k-1] + hex_grid[i+1,k+1])
            if hex_grid[i,k] == 1:
                if num_next == 0 or num_next > 2:
                    new_grid[i,k] = 0
            elif hex_grid[i,k] == 0:
                if num_next == 2:
                    new_grid[i,k] = 1.
    return(new_grid)

filename = 'test.txt'
# filename = 'puzzle_input_24.txt'
file = open(filename, 'r')
lines = file.readlines()

coords = []
for line in lines:
    line = line.rstrip()
    line = line.replace('se', 'esw')
    line = line.replace('nw', 'new')
    sw = int(line.count('sw'))
    ne = int(line.count('ne'))
    w = int(line.count('w'))- sw# - nw
    e = int(line.count('e'))- ne# -se
    coords.append((ne-sw, e-w))

## part 1
print(coords)
print(Counter(coords))
Count = list(Counter(coords).values())
even = 0
odds = 0
for i in range(0, max(Count)+1):
    if i%2 == 0:
        even += Count.count(i)
    else:
        odds += Count.count(i)
print(odds)
    
## part 2
days = 1
MAX = max(Count)
dim = 2*(days+MAX+2)
hex_grid = np.zeros((dim,dim))

for cord in coords:
    cord = list(cord)
    hex_grid[int(dim/2)+cord[0], int(dim/2)+cord[1]] = 1. - hex_grid[int(dim/2)+cord[0], int(dim/2)+cord[1]]

print(hex_grid)
# print(np.count_nonzero(hex_grid))
for i in range(days):
    hex_grid = flip_hexes(hex_grid)
    print(i, np.count_nonzero(hex_grid))
print(hex_grid)
