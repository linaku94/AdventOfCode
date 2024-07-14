import time
from collections import OrderedDict

def move(config):
    start = config[0]
    selection = []
    selection.extend(config.pop(1) for i in [0,1,2])
    destination = start-1
    while destination in selection + [0]:
        if destination == 0:
            destination = len(config)+3
        else:
            destination-=1
    ind = config.index(destination)
    for i in [0,1,2]:
        config.insert((ind+1+i), selection[i])
    config.append(config.pop(0))
    return(config)

def get_point_list(config):
    point_list = [0]
    for i in range(len(config)-1):
        point_list.append(config[(config.index(i+1)+1)%len(config)])
    return point_list

def move_point(config, start):
    selection = [0]
    select = start
    for i in range(3):
        selection.append(config[select])
        select = config[select]
    destination = start-1
    while destination in selection:
        if destination == 0:
            destination = len(config)-1
        else:
            destination -=1
    config[start] = config[selection[-1]]
    config[selection[-1]] = config[destination]
    config[destination] = selection[1]

    return(config, config[start])


start_config = [9,6,2,7,1,3,8,5,4]
example_config = [3,8,9,1,2,5,4,6,7]

new_config = start_config
start = new_config[0]
moves = 100
for i in range(moves):
    # new_config, start = move(new_config, start)
    new_config = move(new_config)
    # print(new_config)

print('final configuration:', new_config, start)
res = ''
for i in range(8):
    res = res + str(new_config[(new_config.index(1)+i+1)%9])
print (res)

### part 2
## something else...

start_config.append(10)
config_point = get_point_list(start_config)
config_point.extend(range(11,1000001))
config_point.append(9)

moves = 10000000
start = 9

for i in range(moves):
    config_point, start = move_point(config_point, start)
print(config_point[1]* config_point[config_point[1]])