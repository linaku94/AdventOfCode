import numpy as np
import csv

filename = 'puzzle_input_4.csv'

def contain_char(string, chars):
    contr = 0
    for i in string:
        for c in chars:
            if i == c:
                contr +=1
    if contr == len(string):
        return True
    else:
        return False



passports = []
nums = 0
file = open(filename, 'r')

categories = ['byr', 'iyr', 'eyr', 'hgt', 'hc1', 'ec1', 'pid', 'cid']
passport = {}

for line in file:
    if line == '\n':
        nums += 1
        passports.append(passport)
        passport = {}

    else:
        line = line.replace('\n', '')
        for entry in line.split(' '):
            category = entry.split(':')[0]
            value = entry.split(':')[1]
            passport[str(category)] = str(value) 

valids = nums
for i in range(nums):
    passports[i].pop('cid', passports[i])
    if len(passports[i])<7:
        valids -=1
    else:
        byr = passports[i]['byr']
        iyr = passports[i]['iyr']
        eyr = passports[i]['eyr']
        hgt = passports[i]['hgt']
        hcl = passports[i]['hcl']
        ecl = passports[i]['ecl']
        pid = passports[i]['pid']
        if not byr.isdigit() or not iyr.isdigit() or not eyr.isdigit():
            valids -=1
        elif int(byr) < 1920 or int(byr) > 2002:
            valids -=1
        elif int(iyr) < 2010 or int(iyr) > 2020:
            valids -=1
        elif int(eyr) < 2020 or int(eyr) > 2030:
            valids -=1
        elif hgt[-2:] != 'in' and hgt[-2:] != 'cm':
            valids -=1
        elif not hgt[:-2].isdigit():
            valdis -=1
        elif hgt[-2:] == 'in' and (int(hgt[:-2]) < 59 or int(hgt[:-2]) > 76):
            valids -=1
        elif hgt[-2:] == 'cm' and(int(hgt[:-2]) < 150 or int(hgt[:-2]) > 193):
            valids -=1
        elif hcl[0] != '#' or len(hcl) != 7:
            valids -=1
        elif not contain_char(hcl[1:],'abcdef0123456789'):
            valids -=1
            print(hcl)
        elif ecl != 'amb' and ecl != 'blu' and ecl != 'brn' and ecl != 'gry' and ecl != 'grn' and ecl != 'hzl' and ecl != 'oth':
            valids -=1
        elif len(pid)!= 9:
            valids -=1

print(valids)
