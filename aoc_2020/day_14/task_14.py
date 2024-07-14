import numpy as np
import itertools

def mask_val(value, msk):
    res = ''
    for k, char in enumerate(msk):
        if char != 'X':
            res += char
        else:
            res += value[k]
    return res
    
def fill_val(value, lens):
    zeros = ''
    for i in range(lens-len(value)):
        zeros += '0'
    return (zeros + value)

def mask_mem(mem, msk):
    res = []
    val = ''
    cx = msk.count('X')
    combs = list(itertools.product([0,1], repeat = cx))
    for k, char in enumerate(msk):
        if char == '0':
            val += mem[k]
        else:
            val += char
    for comb in combs:
        new = val
        for c in list(comb):
            new = new.replace('X', str(c), 1)
        res.append(new)
    return res



filename = 'puzzle_input_14.txt'
# filename = 'test.txt'
file = open(filename)
lines = file.readlines()
file.close()

mem = {}
for line in lines:
    line = line.rstrip()
    if 'a' in line:
        mask = line.split('=')[1]
        mask = mask.rstrip()
        mask = mask[1:]
    else:
        entry = line.split('=')[0]
        entry = entry.rstrip()
        entry = int(entry[4:-1])
        val = line.split('=')[1]
        val = val.rstrip()
        val = val[1:]
        val = np.base_repr(int(val), base = 2)
        val = fill_val(val, 36)
        val = mask_val(val, mask)
        mem[entry] = val

summe = 0
for entry, val in mem.items():
    summe += int(val, base= 2)

print(summe)

mem = {}
for line in lines:
    line = line.rstrip()
    if 'a' in line:
        mask = line.split('=')[1]
        mask = mask.rstrip()
        mask = mask[1:]
    else:
        entry = line.split('=')[0]
        entry = entry.rstrip()
        entry = int(entry[4:-1])
        entry = np.base_repr(int(entry), base = 2)
        entry = fill_val(entry, 36)
        adresses = mask_mem(entry, mask)

        val = line.split('=')[1]
        val = val.rstrip()
        val = val[1:]
        for adress in adresses:
            mem[adress] = val

summe = 0
for entry, val in mem.items():
    summe += int(val)
print(summe)
