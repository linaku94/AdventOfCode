import numpy as np

def next_taken(pattern, I,J):
    count = 0
    for i in [I-1,I,I+1]:
        for j in [J-1,J,J+1]:
            if pattern[i,j] == 1.:
                count +=1
    if pattern[I,J] == 1:
        return(count-1)
    else:
        return count

def next_taken2(pattern, I,J):
    count = 0
    for i in [I-1,I,I+1]:
        for j in [J-1,J,J+1]:
            if pattern[i,j] == 1.:
                count +=1
            elif pattern[i,j] == 2:
                k = i
                r = j
                while pattern[k,r] ==2:
                    if i < I :
                        k -=1
                    elif i > I:
                        k +=1
                    if j < J:
                        r-=1
                    elif j > J:
                        r+=1

                if pattern[k,r] == 1.:
                    count +=1

    if pattern[I,J] == 1:
        return(count-1)
    else:
        return count     

def update_taken(pattern, I,J):
    for i in range(len(I)):
        pattern[I[i], J[i]] = 1
    return(pattern)

def update_empty(pattern, I,J):
    for i in range(len(I)):
        pattern[I[i], J[i]] = 0
    return(pattern)

filename = 'puzzle_input_11.txt'
file = open(filename, 'r')

width = 0
for line in file:
    line = line.rstrip()
    length = len(line)
    width +=1

file.close()
file = open(filename, 'r')
pattern = np.zeros((width+2, length+2))
i = 1
for line in file:
    j = 1
    line = line.rstrip()
    for char in line:
        if char == '.':
            pattern[i,j] = 2
        j +=1
    i+=1

# control = True
# while control:
#     control = False
#     changesi = []
#     changesj = []
#     for i in range(1,width+1):
#         for j in range(1,length+1):
#             if pattern[i,j] == 0 and next_taken(pattern, i,j)== 0:
#                 changesi.append(i)
#                 changesj.append(j)
#                 control = True

#     update_taken(pattern, changesi, changesj)
#     changesi = []
#     changesj = []

#     for i in range(1,width+1):
#         for j in range(1,length+1):
#             if pattern[i,j] == 1 and next_taken(pattern,i,j) >=4:
#                 changesi.append(i)
#                 changesj.append(j)
#                 control = True
#     update_empty(pattern, changesi, changesj)


# counter = 0
# for i in range(1,width+1):
#     for j in range(1,length+1):
#         if pattern[i,j] == 1:
#             counter +=1
# print(counter)

control = True
while control:
    control = False
    changesi = []
    changesj = []
    for i in range(1,width+1):
        for j in range(1,length+1):
            if pattern[i,j] == 0 and next_taken2(pattern, i,j)== 0:
                changesi.append(i)
                changesj.append(j)
                control = True

    update_taken(pattern, changesi, changesj)
    changesi = []
    changesj = []

    for i in range(1,width+1):
        for j in range(1,length+1):
            if pattern[i,j] == 1 and next_taken2(pattern,i,j) >=5:
                changesi.append(i)
                changesj.append(j)
                control = True
    update_empty(pattern, changesi, changesj)

counter = 0
for i in range(1,width+1):
    for j in range(1,length+1):
        if pattern[i,j] == 1:
            counter +=1
print(counter)