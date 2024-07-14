import numpy as np

def cycle(cube, step):
    new_cube = np.zeros_like(cube)
    for k in range(1,cube.shape[2]-1):
        for i in range(1,cube.shape[0]-1):
            for j in range(1,cube.shape[1]-1):
                num = np.count_nonzero(cube[i-1:i+2, j-1:j+2, k-1:k+2]) - cube[i,j,k]
                # print(cube[i-1:i+2, j-1:j+2, k-1:k+2].shape)
                if cube[i,j,k] == 0 and num == 3:
                    new_cube[i,j,k] = 1
                elif cube[i,j,k] == 1 and 2 <= num <=3:
                    new_cube[i,j,k] = 1
    return new_cube

def cycle4D(cube):
    new_cube = np.zeros_like(cube)
    for i in range(1,cube.shape[0]-1):
        for j in range(1,cube.shape[1]-1):
            for k in range(1,cube.shape[2]-1):
                for r in range(1, cube.shape[3]-1):
                    num = np.count_nonzero(cube[i-1:i+2, j-1:j+2, k-1:k+2, r-1:r+2])-cube[i,j,k,r]
                    if cube[i,j,k,r] == 0 and num ==3:
                            new_cube[i,j,k,r] = 1.
                    elif cube[i,j,k,r] == 1 and (num == 2 or num == 3):
                            new_cube[i,j,k,r] = 1.
    return(new_cube)

filename = 'puzzle_input_17.txt'
# filename = 'test.txt'
file = open(filename, 'r')

lines = file.readlines()

# L = len(lines)
# N_cycles = 6
# dim = L+2*N_cycles+2
# cube = np.zeros((dim, dim,2*N_cycles+2))

# for i, line in enumerate(lines):
#     j = N_cycles + 1
#     line = line.rstrip()
#     for char in line:
#         if char == '#':
#             cube[i +1 + N_cycles,j, N_cycles] = 1
#         j+=1

# # print(cube[:,:,N_cycles])
# for k in range(6):
#     cube = cycle(cube, k)
# # print(cube[:,:,N_cycles+1])
# print(np.count_nonzero(cube))

L = len(lines)
N_cycles = 6
dim = L+2*N_cycles+2
dim2 = 2*N_cycles+4
cube = np.zeros((dim, dim,dim2,dim2))

for i, line in enumerate(lines):
    j = 0
    line = line.rstrip()
    for char in line:
        if char == '#':
            cube[i +1 + N_cycles,j +1+ N_cycles, N_cycles+1, N_cycles+1] = 1
        j+=1

print(cube.shape)
for k in range(6):
    cube = cycle4D(cube)
print(np.count_nonzero(cube))