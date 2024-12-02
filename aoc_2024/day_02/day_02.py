from aoc_2024.aoc_api.AocAPI import AocAPI

def is_safe(numbers):
    return True if all(0 > x > -4 for x in numbers) or all(0 < x < 4 for x in numbers) else False

def compute_differences(numbers):
    return [number-numbers[i+1] for i,number in enumerate(numbers[:-1])]

def main():
    aoc_api = AocAPI(2024, 2)
    input_txt = aoc_api.get_input()
    reports = [list(map(int, line.rstrip('\n').split(' '))) for line in input_txt]
    safe_levels = 0
    for report in reports:
        safe_levels += 1 if is_safe(compute_differences(report)) else 0
    print(f'solution part1: {safe_levels}')

    for report in reports:
        if is_safe(compute_differences(report)):
            continue
        for k in range(len(report)):
            sliced_report = report[:k] + report[k+1:]
            if is_safe(compute_differences(sliced_report)):
                safe_levels+=1
                break
    print(f'solution part 2: {safe_levels}')


if __name__=='__main__':
    main()
