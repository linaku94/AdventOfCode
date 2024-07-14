def game(player1, player2):
    i = 0
    while len(player1) != 0 and len(player2) != 0:
        i+=1
        card1 = player1.pop(0)
        card2 = player2.pop(0)
        if int(card1) > int(card2):
            winner = 1
        else:
            winner = 2
        if winner == 1:
            new_cards = [card1, card2]
            player1.extend(new_cards)
        if winner == 2:
            new_cards = [card2, card1]
            player2.extend(new_cards)
    
    if len(player1) != 0:
        winner = player1
        # print('winner is player 1 in {} rounds'.format(i))
    else:
        winner = player2
        # print('winner is player 2 in {} rounds'.format(i))

    score = 0
    for i in range(len(winner)):
        score += (len(winner)-i)* int(winner[i])
        # print(score, int(winner[i]))
    # print('final score: ', score)

    return(player1, player2, score)

def recursive_game(player1, player2, starting_hands):

    while len(player1) != 0 and len(player2) != 0:
        if [player1, player2] in starting_hands:
            winner = 1
            score = 0
            for i in range(len(player1)):
                score += (len(player1)-i)* int(player1[i])
            return(player1, player2, score, winner)
        if len(player1) != 0 and len(player2) != 0:
            starting_hands.append([player1.copy(), player2.copy()])
        card1 = player1.pop(0)
        card2 = player2.pop(0)
        if len(player1) >= int(card1) and len(player2) >= int(card2):
            _,_,_,winner = recursive_game(player1[:int(card1)], player2[:int(card2)], [])
        elif int(card1) > int(card2):
            winner = 1
        else:
            winner = 2

        if winner == 1:
            new_cards = [card1, card2]
            player1.extend(new_cards)
        if winner == 2:
            new_cards = [card2, card1]
            player2.extend(new_cards)

    if len(player1) != 0:
        winner = 1
        winnerdeck = player1
    else:
        winner = 2
        winnerdeck = player2
    score = 0
    for i in range(len(winnerdeck)):
        score += (len(winnerdeck)-i)* int(winnerdeck[i])

    return(player1, player2, score, winner)

# filename = 'test.txt'
filename = 'puzzle_input_22.txt'
file = open(filename, 'r')
lines = file.readlines()

player1 = []
player2 = []

P = 'P1'
for line in lines[1:]:
    if line == '\n':
        P = 'P2'
    line = line.rstrip()
    if P == 'P1':
        player1.append(line)
    elif P == 'P2':
        player2.append(line)
player2.pop(0)
player2.pop(0)

# ## part 1
# print(game(player1, player2))

## part 2 
print(recursive_game(player1, player2, []))