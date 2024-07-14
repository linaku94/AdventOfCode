import numpy as np
import collections

Filename = 'puzzle_input_6.txt'
file = open(Filename, 'r')

forms = ['']
people = []
ans = []
singles = []
nums = 0
for line in file:
    line = line.rstrip()
    if line == '':
        ans.append(len(set(forms[-1])))
        people.append(nums)
        forms.append('')
        nums = 0
    else:
        forms[-1] += line
        nums += 1

people.append(nums)
ans.append(len(set(forms[-1])))

print(np.sum(ans))
ans2 = [0]
chars = ''

for i, form in enumerate(forms):
    for c in form:
        counter = form.count(c)
        if counter == people[i]:
            ans2[-1] +=1

    ans2[-1] = (ans2[-1]/people[i])
    ans2.append(0)

print(sum(ans2))