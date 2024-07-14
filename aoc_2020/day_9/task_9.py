from itertools import permutations  

filename = 'puzzle_input_9.txt'
file = open(filename, 'r')

nums = []
for line in file:
    nums.append(int(line.rstrip()))


for i in range(25,len(nums)):
    control = False
    numbers = nums[i-25:i]
    for perms in list(permutations(numbers, 2)):
        test_sum = sum(perms)
        if test_sum == nums[i]:
            # print('number ', nums[i], 'valid with ', perms)
            control = True
            break
    if control == False:
        print('no valid combination for number: ', nums[i], ' with index ', i)
        num_crit = nums[i]
        # break

control = True
for i in range(len(nums[:608])):
    for k in range(2, len(nums[:608])):
        test_list = nums[i:k]
        test_sum = sum(test_list)
        if test_sum == num_crit:
            print('found sequence: ', test_list, 'from ', i+1, 'to ', i+1+k)
            print('lowest number: ', min(test_list))
            print('highest number: ', max(test_list))
            print('sum: ', min(test_list) + max(test_list))
            control = False
            break
        elif test_sum >= num_crit:
            break
    if control == False:
        break