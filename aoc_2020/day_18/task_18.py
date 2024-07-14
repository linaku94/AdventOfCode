import re

def evaluate(section):
    if '+' in section:
        nums = section.split('+')
        return str(int(nums[0])+ int(nums[1]))
    elif '*' in section:
        nums = section.split('*')
        return str(int(nums[0])*int(nums[1]))

def evaluate1(section):
    while '+' in section or '*' in section:
        s = re.search('[0-9]+[+*][0-9]+', section)
        section = section.replace(s.group(), evaluate(s.group()),1)
    return str(section)
        
def evaluate2(section):
    # print(section)
    while(section.count('+') != 0):
        s = re.search('[0-9]+[+][0-9]+', section)
        section = section.replace(s.group(), evaluate(s.group()),1)
        # print(section)
    while(section.count('*') != 0):
        s = re.search('[0-9]+[*][0-9]+', section)
        section = section.replace(s.group(), evaluate(s.group()),1)
    # print(section)
    return str(section)

def sec(line):
    line = line.replace(' ', '')
    # print(line)
    if line.count('(') == 0:
        return(evaluate1(line))
    else:
        strs = (re.findall('\([0-9+*]+\)', line))
        for subs in strs:
            line = line.replace(subs, evaluate1(subs[1:-1]))
        return sec(line)


filename = 'puzzle_input_18.txt'
file = open(filename, 'r')
lines = file.readlines()

m = 0
for line in lines:
    line = line.rstrip()
    m += int(sec(line))
print(m)

