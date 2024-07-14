import numpy as np
import matplotlib.pyplot as plt

def match_edges(tiles, tile_num):
    match = 0
    match_num = []
    directions = []
    for k in range(tiles.shape[0]):
        if k != tile_num:
            test_tile = np.copy(tiles[k,:,:])
            for rot in range(4):
                if rot > 0:
                    test_tile = np.rot90(test_tile)                
                for flip in range(2):
                    test_tile = np.flip(test_tile, flip)
                    res = np.abs(tiles[tile_num, :,:] - test_tile)
                    for j in [-1,0]:
                        if np.sum(res[:,j]) == 0:
                            match+=1
                            match_num.append(k)
                            directions.append('r{}'.format(j))
                            tiles[k,:,:] = np.flip(test_tile,1)
                    for i in [-1,0]:
                        if np.sum(res[i,:]) == 0:
                            match+=1
                            match_num.append(k)
                            directions.append('c{}'.format(i))
                            tiles[k,:,:] = np.flip(test_tile,0)
    return match, match_num, directions, tiles

filename = 'task_20.txt'
# filename = 'test.txt'
file = open(filename, 'r')

lines = file.readlines()
file.close()

tilenames = []
for line in lines:
    if line[0] == 'T':
        line = line.rstrip()
        tilenames.append(int(line.split(' ')[1][:-1]))

num_tiles = len(tilenames)
tiles = np.zeros((num_tiles, 10,10))

i = 0
j = 0
for line in lines[1:]:
    if line[0] == 'T':
        i+=1
        j=0
    elif line[0] != '\n':
        line = line.rstrip()
        for k, char in enumerate(line):
            if char == '.':
                tiles[i,j,k] = 0
            else:
                tiles[i,j,k] = 1
        j+=1

## part 1
# prod = 1
# for i in range(num_tiles):
#     m,_,_,_ = match_edges(tiles, i)
#     if m == 2:
#         print(tilenames[i])
#         prod *=tilenames[i]
# print(prod)

### part 2
todo = [0]
done = []
N = 30
order = np.zeros((N,N))
I = int(N/2)
K = int(N/2)
coords = {}
coords[0] = (I,K)

while len(todo)!=0:
    _, matches, directions, tiles = match_edges(tiles, todo[0])
    ### append matched tile to done tiles, append neighbours to new tiles
    ### if they are not already done
    done.append(todo.pop(0))
    for new_tile in matches:
        if new_tile not in done and new_tile not in todo:
            todo.append(new_tile)
    ### add matched tiles to order
    ### I, K indices of tile itself
    I,K = list(coords[done[-1]])
    for i, d in enumerate(directions):
        if d == 'c-1':
            order[I,K+1] = matches[i]
            coords[matches[i]] = (I,K+1)
        elif d== 'c0':
            order[I,K-1] = matches[i]
            coords[matches[i]] = (I,K-1)         
        elif d == 'r0':
            order[I-1,K] = matches[i]
            coords[matches[i]] = (I-1,K)
        elif d == 'r-1':
            order[I+1, K] = matches[i]
            coords[matches[i]] = (I+1,K)
        
R,C = np.nonzero(order)

order = (order[np.min(R):np.max(R)+1, np.min(C):np.max(C)+1])
order = np.rot90(np.copy(order))
print(order)
print(np.vectorize(lambda x:tilenames[x])(order.astype(np.int8)))

## picture with borders
# d = 10
# N = 12
# dim = N*d
# picture = np.zeros((dim, dim))
# order = order.astype(np.int16)
# for i in range(N):
#     for k in range(N):
#         tile = tiles[order[i,k],:,:]
#         picture[i*d:i*d+d, k*d:k*d+d] = tile

# for i in range(N):
#     picture[i*d:(i+1)*d, :] = np.flip(picture[i*d:(i+1)*d, :], 0)

# picture_wb = np.copy(picture)
# plt.pcolormesh(picture)
# plt.colorbar()
# plt.title('with borders')
# plt.show()

## picture without borders
d = 8
N = 12
dim = N*d
picture = np.zeros((dim, dim))
order = order.astype(np.int16)
for i in range(N):
    for k in range(N):
        print(order[i,k])
        print(tilenames[order[i,k]])
        tile = tiles[order[i,k],:,:]
        picture[i*d:i*d+d, k*d:k*d+d] = tile[1:-1, 1:-1]

for i in range(N):
    picture[i*d:(i+1)*d, :] = np.flip(picture[i*d:(i+1)*d, :], 0)

# plt.pcolormesh(picture)
# plt.colorbar()
# plt.title('without borders')
# plt.show()

monstername = 'monster.txt'
file = open(monstername, 'r')
lines = file.readlines()
file.close()

m_r = len(lines)
m_c = len(lines[0])-1

monster = []
monster_pic = np.zeros((m_r, m_c))
for i, line in enumerate(lines):
    line = line.rstrip()
    for k, char in enumerate(line):
        if char == '#':
            monster.append([i,k])
            monster_pic[i,k] = 1

match = 0
for rot in range(4):
    picture = np.rot90(picture)
    order = np.rot90(order)
    for flip in range(2):
        picture = np.flip(picture,flip)
        order = np.flip(order, flip)
        print(np.vectorize(lambda x:tilenames[x])(order.astype(np.int8)))
        for i in range(dim-m_r):
            for k in range(dim-m_c):
                control = True
                for inds in monster:
                    if picture[i+inds[0], k+inds[1]] != 1.:
                        control = False
                        break
                if control:
                    match +=1
                    
        print('roughness of the sea: ', np.count_nonzero(picture)- len(monster)*match)
        print('matches: ', match)
