def get_loop_size(key, subject):
    loop_size = 1
    val = 1
    while True:
        val *= subject
        val = val% 20201227
        if val == key:
            return (loop_size)
        else:
            loop_size +=1

def transform(subject, loop_size):
    val = 1
    for i in range(loop_size):
        val *= subject
        val = val%20201227
    return val


filename = 'puzzle_input_25.txt'
file = open(filename, 'r')
lines = file.readlines()

door = int(lines[0].rstrip())
card = int(lines[1].rstrip())
test_card = 5764801
test_door = 17807724

loop_door = get_loop_size(door, 7)
loop_card = get_loop_size(card, 7)
# loop_card_test = get_loop_size(test_card, 7)
# loop_door_test = get_loop_size(test_door, 7)

# print('loop card: ', loop_card_test, 'door: ',loop_door_test)
print('loop card: ', loop_card, 'door: ',loop_door)

# encr_door_test = transform(7, loop_door_test)
# encr_card_test = transform(7, loop_card_test)
# print('encr_key door: ',encr_door_test,  'card: ', encr_card_test)
encr_door = transform(7, loop_door)
encr_card = transform(7, loop_card)
print('encr_key door: ',encr_door,  'card: ', encr_card)

# print(transform(encr_door_test, loop_card_test))
# print(transform(encr_card_test, loop_door_test))
print(transform(encr_door, loop_card))
print(transform(encr_card, loop_door))