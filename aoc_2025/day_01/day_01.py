
def main():
    instructions = []
    with open('input.txt', 'r') as file:
        for line in file.readlines():
            line = line.rstrip()
            instructions.append((line[0], int(line[1:])))

    pointer = 50
    times_pointer_at_zero = 0
    for instruction in instructions:
        direction, value = instruction

        if direction == 'L':
            pointer = (pointer - value) % 100
        elif direction == 'R':
            pointer = (pointer + value) % 100

        if pointer==0:
            times_pointer_at_zero += 1

    print(f"Pointer was at zero {times_pointer_at_zero} times.")

    pointer = 50
    times_pointer_at_zero = 0

    for instruction in instructions:
        direction, value = instruction

        times_pointer_at_zero += value // 100
        value = value % 100

        if direction == 'L':
            if value >= pointer != 0:
                times_pointer_at_zero += 1
            pointer = (pointer - value) % 100
        elif direction == 'R':
            if pointer + value >= 100 and pointer != 0:
                times_pointer_at_zero += 1
            pointer = (pointer + value) % 100

    print(f"Pointer was at zero {times_pointer_at_zero} times in the second calculation.")

if __name__ == "__main__":
    main()