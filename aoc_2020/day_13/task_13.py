import numpy as np

def bus_departures(bus, mytime):
    if mytime%bus == 0:
        N = int(mytime/bus)
    else:
        N = int(mytime/bus)+1
    return(bus*N-mytime)

def match_schedule(busses, delay, diff, start):
    control = True
    while control:
        control = False
        for i, bus in enumerate(busses):
            if (start+ delay[i])%bus != 0:
                start += diff
                control = True
                break
    return(start)

# filename = 'test.txt'
filename = 'puzzle_input_13.txt'
file = open(filename, 'r')

lines = file.readlines()
mytime = int(lines[0].rstrip())

lines[1] = lines[1].rstrip()
busses = []
for char in lines[1].split(','):
    if char != 'x':
        busses.append(int(char))

times = []
minimum = 1e6
for i in range(len(busses)):
    times.append(bus_departures(busses[i], mytime))
    if times[-1] <= minimum:
        minimum = times[-1]
        busmin = busses[i]

print('solution 1: ', busmin*minimum)

positions = []
i = 0
for char in lines[1].split(','):
    if char != 'x':
        positions.append(i)
    i+=1

# print(busses)
# diff = busses[0]
# start = 0
# for k in range(2,len(busses)+1):
#     control = True
#     while control:
#         control = False
#         for i, bus in enumerate(busses[:k]):
#             if (start+ positions[i])%bus != 0:
#                 start += diff
#                 control = True
#                 break
#     start1 = start
#     start +=diff
#     control = True
#     while control:
#         control = False
#         for i, bus in enumerate(busses[:k]):
#             if (start+ positions[i])%bus != 0:
#                 start += diff
#                 control = True
#                 break
#     diff = start-start1

# print('solution 2: ', start1)

start = 0
for k in range(2, len(busses)+1):
    diff = np.lcm.reduce(busses[:k-1], dtype =np.int64)
    start = match_schedule(busses[:k], positions[:k], diff, start)
print('solution 2: ' , start)
