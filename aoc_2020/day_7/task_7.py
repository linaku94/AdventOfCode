import re

def contains_bag(dictionary, contain_key, key):
    if key in dictionary[contain_key]:
        # print('contained in: ', contain_key)
        return True
    else:
        for new_key in dictionary[contain_key]:
            if contains_bag(dictionary, str(new_key), key) == True:
                return True
        return False

def num_bags(dictionary, bag_key):
    N = 0
    if not dictionary[bag_key]:
        return 0
    else:
        for key in dictionary[bag_key].keys():
            N += int(dictionary[bag_key][key])
            N += int(dictionary[bag_key][key]) * num_bags(dictionary, key)
        return N


Filename = 'puzzle_input_7.txt'
file = open(Filename, 'r')

counter = 0
rules = {}
for line in file:
    line = line.rstrip()
    bag = line.split(' bags')[0]
    rules[bag] = {}
    line = re.sub(' bags', '', line)
    line = re.sub(' bag', '', line)
    line = line.replace('.', '')
    if 'no other' in line:
        pass
    else:
        for rule in line.split('contain ')[1].split(', '):
            rules[bag][rule.split(' ', 1)[1]] = rule.split(' ',1)[0]


counter = 0
for key in rules:
    if contains_bag(rules, key, 'shiny gold') == True:
        counter += 1

print(counter)

# print(rules['shiny gold'])
print(num_bags(rules, 'shiny gold'))