from operator import truediv


def main():
    id_ranges = []

    with open('input.txt', 'r') as file:
        for line in file.readlines():
            line = line.rstrip()
            ranges = line.split(',')
            for id_range in ranges:
                start, end = map(int, id_range.split('-'))
                id_ranges.append((start, end))

    def is_valid(id_string):
        if len(id_string)%2 != 0:
            return True

        front, back = str(id_string)[:len(id_string) // 2], id_string[len(id_string) // 2:]
        return front != back

    def is_valid_part_two(id_string):
        id_length = len(id_string)
        for pattern_length in reversed(range(1, id_length//2+1)):
            pattern = id_string[:pattern_length]

            if pattern*(id_length//len(pattern)) == id_string:
                return False

        return True


    invalid_ids = []
    for id_range in id_ranges:
        start, end = id_range
        invalid_ids.extend([id for id in range(start, end+1) if not is_valid(str(id))])

    print(f"summing up all invalid ids gives: {sum(invalid_ids)}")

    invalid_ids = []
    for id_range in id_ranges:
        start, end = id_range
        invalid_ids.extend([id for id in range(start, end+1) if not is_valid_part_two(str(id))])

    print(f"summing up all invalid ids part two gives: {sum(invalid_ids)}")


if __name__ == "__main__":
    main()