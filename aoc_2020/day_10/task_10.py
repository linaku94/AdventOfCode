import numpy as np

filename = 'puzzle_input_10.txt'
file = open(filename, 'r')

jolts = [0]
for line in file:
    jolts.append(int(line.rstrip()))

jolts = np.array(jolts)
jolts = np.sort(jolts)
jolts = np.append(jolts, np.max(jolts)+3)
diffs = np.diff(jolts)
jolt_diff, nums = np.unique(diffs, return_counts = True)

counter = 1
single_count = 0
for i in range(len(diffs)):
    if diffs[i] == 1:
        single_count +=1
    elif diffs[i] == 3:
        if 1 < single_count < 4:
            counter *= (2**(single_count-1))
        elif single_count == 4:
            counter *= (2**(single_count-1) -1)
        single_count = 0

print(counter)