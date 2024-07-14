
def change_face(command, value, position):
    pos = ['N', 'E', 'S', 'W', 'N', 'E', 'S', 'W']
    val = int(value/90)
    if command == 'L':
        val = -val
    start = 0
    if position == 'N':
        start = 0
    elif position == 'E':
        start = 1
    elif position == 'S':
        start = 2
    elif position == 'W':
        start = 3
    return pos[start+val]

def move(command, value, position, face): 
    if command in ['N', 'E', 'S', 'W']:   
        position[command] +=value
    else:
        position[face] +=value

def move2(command, value, wayp, position):
    for key, item in wayp.items():
        position[key] += value*item

def movewp(command, value, wayp):
    wayp[command] += value

def rotatewp(command, value, wayp):
    pos = ['N', 'E', 'S', 'W','N', 'E', 'S', 'W']
    val = int(value/90)
    if command == 'L':
        val = -val
    wayp2 = {}
    start = 0
    for key in wayp.keys():
        if key == 'N':
            start = 0
        elif key == 'E':
            start = 1
        elif key == 'S':
            start = 2
        elif key == 'W':
            start = 3
        wayp2[pos[start+val]] = wayp[key]
    return wayp2

def adjust(wayp):
    if wayp['N'] >= wayp['S']:
        wayp['N'] -= wayp['S']
        wayp['S'] = 0
    else:
        wayp['S'] -= wayp['N']
        wayp['N'] = 0
    if wayp['E'] >= wayp['W']:
        wayp['E'] -= wayp['W']
        wayp['W'] = 0
    else:
        wayp['W'] -= wayp['E']
        wayp['E'] = 0
    

filename = 'puzzle_input_12.txt'
# filename = 'test.txt'

file = open(filename, 'r')

commands = []
values = []
for line in file:
    line = line.rstrip()
    commands.append(line[0])
    values.append(int(line[1:]))


position = {}
position['E'] = 0
position['N'] = 0
position['S'] = 0
position['W'] = 0
face = 'E'

wayp = {}
wayp['E'] = 10
wayp['N'] = 1
wayp['S'] = 0
wayp['W'] = 0


for i in range(len(commands)):
    if commands[i] in ['N', 'E', 'S', 'W', 'F']:
        move(commands[i], values[i], position, face)
        adjust(position)
    elif commands[i] in ['L','R']:
        face = change_face(commands[i], values[i], face)

print('final position: ', position)

md = 0
for val in position.values():
    md+= val
print('manhattan distance: ', md)

for i in range(len(commands)):
    if commands[i] in ['N', 'E', 'S', 'W']:
        movewp(commands[i], values[i], wayp)
        adjust(wayp)
    elif commands[i] in ['L', 'R']:
        wayp = rotatewp(commands[i], values[i], wayp)
        adjust(wayp)
    else:
        move2(commands[i], values[i], wayp, position)
        adjust(position)

print('final position: ', position)

md = 0
for val in position.values():
    md+= val
print('manhattan distance: ', md)