
import numpy as np
import matplotlib.pyplot as plt

filename = 'puzzle_input_3.txt'
file = open(filename, 'r')
num_cols = len(file.readline())-1
num_lines = sum(1 for line in file)+1
stacks = int(7*num_lines/num_cols)+1
file.close()

forest = np.zeros((num_lines, num_cols))
file = open(filename, 'r')
for i,line in enumerate(file):
    for k, char in enumerate(line):
        if char == '.':
            forest[i,k] = 0
        elif char == '#':
            forest[i,k] = 1

FOREST = forest
for i in range(stacks):
    FOREST = np.concatenate((FOREST, forest), axis= 1)

k = 3
counter = 0
for i in range(1,num_lines):
    if FOREST[i,k] == 1:
        counter +=1
    k+=3

print(counter)

### part two
slopes_i = [1,1,1,1,2]
slopes_k = [1,3,5,7,1]
counters  = [0,0,0,0,0]
prod = 1
for j in range(5):
    k = slopes_k[j]
    for i in range(slopes_i[j], num_lines, slopes_i[j]):
        if FOREST[i,k] == 1:
            counters[j] +=1
        k+=slopes_k[j]
    prod *= counters[j]

print(counters)
print(prod)