import re

def repl_rule(rules, nlist):
    for i, number in enumerate(nlist):
        # print(number)
        if type(number) is list:
            repl_rule(rules, number)
        elif type(number) is str:
            pass
        else:
            nlist[i] = rules[number]
    
def conc(rule):
    for i in range(len(rule)):
        if all(isinstance(n, str) for n in rule[i]):
            s = ''
            for k in rule[i]:
                s += k
            rule[i] = [s]
        else:
            print(i)
            conc(rule[i])
    return(rule)

def all_valids(rules, valids):      ## works but takes too long :/
    # print(len(valids))
    for rule in rules:
        if all(isinstance(n, str) for n in rule):
            if type(rule) is list:
                for s in range(len(valids)):
                    valids[s]+= rule[0]
            else:
                for s in range(len(valids)):
                    valids[s]+= rule     
        else:
            valids2 = valids.copy()
            valids = all_valids(rule[0], valids)
            valids2 = all_valids(rule[1], valids2)
            valids.extend(valids2)
    return(valids)

# filename = 'puzzle_input_19.txt'
filename = 'puzzle_input_19_2.txt'
# filename = 'test.txt'
file = open(filename, 'r')

lines = file.readlines()

rules = {}
for line in lines:
    if line == '\n':
        break
    line = line.rstrip()
    rule = line.split(':')
    rule[1] = rule[1].strip()
    if '"' in rule[1]:
        rules[int(rule[0])] = rule[1].replace('"', '')
    else:
        s = []
        for rul in rule[1].split(' '):
            if rul == '|':
                s.append(rul)
            else:
                s.append(int(rul))
        rules[int(rule[0])] = s

messages = []
# for line in lines[7:]:
for line in lines[134:]:
    line = line.rstrip()
    messages.append(line)
print(messages[0])
print(rules)

k = 0 
for i in rules.values():
    repl_rule(rules, i)

print(rules[0])
# for rule in rules[0:].values():
    # print(all_valids(rule, ['']))

# print(rules[0])
rules[0] = conc(rules[0])
print(rules[0])

rules[0] = str(rules[0]).replace('[\'|\']', '|')
rules[0] = str(rules[0]).replace('[', '(:?')
rules[0] = rules[0].replace(']', ')')
rules[0] = rules[0].replace(' ', '')
rules[0] = rules[0].replace('\'', '')
rules[0] = rules[0].replace(',', '')
regex = '^' + rules[0] + '$'
print(regex)
counter = 0
for m in messages:
    if re.match(regex, m) is not None:
        counter +=1

print(counter)
