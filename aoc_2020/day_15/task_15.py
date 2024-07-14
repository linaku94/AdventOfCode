import time

def game_step(numbers):
    last_spoken = numbers[-1]
    if last_spoken not in numbers[:-1]:
        numbers.append(0)
    else:
        control = True
        k = -2
        while control:
            if numbers[k] == last_spoken:
                numbers.append(-k-1)
                control = False
            else:
                k -=1
    return numbers

def game_step_dict(numbers, num, step):
    if num in numbers.keys():
        dist = step - numbers[num]
    else:
        dist = 0
    numbers[num] = step
    step += 1
    return(dist, step)
    

numbers = [6,4,12,1,20,0,16]
# numbers =[0,3,6]
steps = 2020
steps = 30000000

# for i in range(steps-7):
#     game_step(numbers)
#     cut_list(numbers)
#     if i%1000 == 0:
#         print(i)
# print(numbers[-1])

### something else for second part
numbers_dict = {}
for i, number in enumerate(numbers[:-1]):
    numbers_dict[number] = i+1

start = time.monotonic()
step = len(numbers)
num, step = game_step_dict(numbers_dict, numbers[-1], step)
for i in range(steps-len(numbers)-1):
    num, step = game_step_dict(numbers_dict, num, step)
    # if (i%1000 == 0):
    #     print(i)
end = time.monotonic()
print(end-start, 's')
print(num)


