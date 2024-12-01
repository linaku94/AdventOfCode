from aoc_2024.aoc_api.AocAPI import AocAPI

def main():
    aoc_api = AocAPI(2024, 1)
    aoc_api.get_input()
    with open('input.txt', 'r') as file:
        file_input = file.readlines()
        first_list = [int(line.strip().split('   ')[0]) for line in file_input]
        second_list = [int(line.strip().split('   ')[-1]) for line in file_input]
    first_list.sort()
    second_list.sort()

    result = sum([abs(first_list[i] - second_list[i]) for i in range(len(first_list))])
    print(f'first part {result}')

    result2 = sum([first_list[i]*second_list.count(first_list[i]) for i in range(len(first_list))])
    print(f'second part {result2}')

if __name__=='__main__':
    main()
