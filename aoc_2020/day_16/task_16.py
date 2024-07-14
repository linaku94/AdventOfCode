import numpy as np

filename = 'puzzle_input_16.txt'
file = open(filename, 'r')

lines = file.readlines()

valid_nums = [] 
for line in lines[:20]:
    for char in line.split(':')[1].split('or'):
        nums = char.split('-')
        for num in list(range(int(nums[0][1:]), int(nums[1][:-1])+1)):
            valid_nums.append(num)

invalids = []
valids = []
for line in lines[25:]:
    invalid = False
    vals = []
    line = line.rstrip()
    for nums in line.split(','):
        if int(nums) not in valid_nums:
            invalids.append(int(nums))
            invalid = True
    if not invalid:
        for nums in line.split(','):
            vals.append(int(nums))
        valids.append(vals)

# print(sum(invalids))

my_ticket = []
line = lines[22]
for nums in line.split(','):
    my_ticket.append(int(nums))
print(my_ticket)

### part 2
categories = list(range(20))

valid_nums = []     ## list of 20 list with valid numbers for each category
for line in lines[:20]:
    vals = []
    for char in line.split(':')[1].split('or'):
        nums = char.split('-')
        for num in list(range(int(nums[0][1:]), int(nums[1][:-1])+1)):
            vals.append(num)
    valid_nums.append(vals)

positions = []      ## list of 20 lists with values of same position
for k in range(20):
    pos = []
    for value in valids:
        pos.append(value[k])
    positions.append(pos)

cats = []   ## valid categories for every position
for pos in positions:
    cat = []
    for k in range(20):
        for nums in pos:
            if nums not in valid_nums[k]:
                cat.append(k)
                break
    cats.append(cat)

final_cats = np.zeros((20))
k = 19
taken  = []
while k >= 0:
    for r, cat in enumerate(cats):
        if len(cat) == k:
            print(cat, r)
            for num in categories:
                if num not in cat and num not in taken:
                    final_cats[r] = num
                    taken.append(num)
            k -=1

print(final_cats)

prod = 1
for l, i in enumerate(final_cats):
    if i <=5:
        prod *=my_ticket[l]
        print(i, my_ticket[l], prod)
print(prod)