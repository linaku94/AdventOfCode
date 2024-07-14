
def flatten(nlist):
    flat_list = []
    for element in nlist:
        if type(element) is list:
            for item in element:
                flat_list.append(item)
        else:
            flat_list.append(element)

    new_list = list(set(flat_list))
    return(new_list)

filename = 'puzzle_input_21.txt'
file = open(filename, 'r')

lines = file.readlines()

ingredients = []
ingredients_list = []
allergenes = []
for line in lines:
    line = line.rstrip()
    ings = []
    als = []
    for ing in line.split(' (')[0].split(' '):
        ings.append(ing)
    for al in line.split('contains ')[1][:-1].split(', '):
        als.append(al)
    allergenes.append(set(als))
    ingredients.append(set(ings))
    ingredients_list.append(ings)

pos_all = allergenes[0]     ### get possible allergenes
for i in range(1,len(allergenes)):
    pos_all = pos_all.union(allergenes[i])
pos_all = list(pos_all)
pos_all.sort()      ## sort them alphabetically
print('possible allergenes:', pos_all)      

poss_ings = []          ## find ingredients that can contain an allergene
for pos in pos_all:
    for i, al in enumerate(allergenes):
        if len((set({pos}).intersection(al))) == 1:
            possible_ing = ingredients[i]
            break
    for i, al in enumerate(allergenes):
        if len((set({pos}).intersection(al))) == 1:
            possible_ing = possible_ing.intersection(ingredients[i])
    poss_ings.append(list(possible_ing))

print('possible ingredients containing allergenes: ',poss_ings)
## part 1
# poss_ings = flatten(poss_ings)
# print(poss_ings)

# counter = 0
# for f in ingredients_list:
#     for ings in f:
#         if ings not in poss_ings:
#             counter +=1

# print('number of ingredients with no allergene: ', counter)

## part 2
finals = {}     ## dictionary with final allergenes and ingredients
while(len(finals)) <8:
    for i,p in enumerate(poss_ings):
        if len(p) == 1:
            finals[pos_all[i]] = p[0]
            I = i
            found = p[0]
            break
    for lists in poss_ings:
        if found in lists:
            lists.remove(found)

print(finals)

canc_list = ''      ## find that damn list
for ing in pos_all:
    print(finals[ing])
    canc_list += finals[ing] + ','

print(canc_list[:-1])
f = open('canonical.txt', 'w+')
f.write(canc_list[:-1])
f.close()