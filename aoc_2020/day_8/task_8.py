
Filename = 'puzzle_input_8.txt'
file = open(Filename, 'r')

commands= []
values = []
for line in file:
    line = line.rstrip()
    commands.append(line.split(' ')[0])
    values.append(int(line.split(' ')[1]))

Termination = False

for k in range(len(commands)):
    accumulator = 0
    nums = []
    control = True
    i = 0
    if commands[k] == 'jmp':
        commands[k] = 'nop'
    elif commands[k] == 'nop':
        commands[k] = 'jmp'
    while control:
        if i == len(commands):
            # print('termination, accumulator: ', accumulator)
            control = False
            Termination = True
        elif i not in nums:
            nums.append(i)
            if commands[i] == 'nop':
                i+=1
            elif commands[i] == 'acc':
                accumulator += values[i]
                i +=1
            elif commands[i] == 'jmp':
                i += values[i]
        else:
            #print('infinite loop, accumulator: ', accumulator)
            control = False
    if not Termination:
        if commands[k] == 'jmp':
            commands[k] = 'nop'
        elif commands[k] == 'nop':
            commands[k] = 'jmp'
    else:
        print('termination, accumulator :', accumulator)
        break
    
    
