import re

from aoc_2024.aoc_api.AocAPI import AocAPI


def compute_match(match):
    numbers = list(map(int, re.findall(r"\d{1,3}", match)))
    return numbers[0] * numbers[1]


def main():
    aoc_api = AocAPI(2024, 3)
    input_string = aoc_api.get_input()
    basic_matcher = r"mul\(\d{1,3},\d{1,3}\)"
    line_matches = [re.findall(basic_matcher, memory) for memory in input_string]
    multiplications = [compute_match(match) for matches in line_matches for match in matches ]
    print(f'Solution part 1: {sum(multiplications)}')

    line_matches_advanced = [re.findall(r"(mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\))", memory) for memory in input_string]
    accept_mul = True
    res = 0
    for matches in line_matches_advanced:
        for match in matches:
            if len(re.findall(basic_matcher, match))>0:
                res += compute_match(match) if accept_mul else 0
                continue
            accept_mul = False if re.match(r"don't\(\)", match) else True

    print(f'Solution part 2: {res}')

if __name__ == '__main__':
    main()
