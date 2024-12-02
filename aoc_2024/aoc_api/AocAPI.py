import logging

import requests
from dotenv import load_dotenv
import os

class AocAPI:
    def __init__(self, year: int, day: int):
        load_dotenv()
        self.token = os.getenv('AOC_TOKEN')
        self.aoc_base_url = 'https://adventofcode.com'
        self.year = year
        self.day = day

    @property
    def default_headers(self):
        return {
            'accept': 'text/plain',
            'content-type': 'text/plain',
            'Cookie': f'session={self.token}'
        }

    def _request(self, path, method: str, headers=None, data=None):
        headers = headers if headers else self.default_headers
        data = data if data else {}
        match method:
            case 'POST':
                response = requests.post(url=f'{self.aoc_base_url}/{path}', data=data , headers=headers)
            case 'GET':
                response = requests.get(url=f'{self.aoc_base_url}/{path}', headers=headers)
            case _:
                logging.ERROR(f'Invalid request method {method}')
                return

        print(response.status_code)
        if  response.status_code==200:
            return response.text
        else:
            logging.ERROR(f'GET request returned error with status {response.status_code}')
            return ''



    def post_solution(self, part: int, solution: str):
        return self._request(path=f'{self.year}/day/{self.day}/answer', data=f'level={part}&answer={solution}', method='POST')

    def get_input(self, filename: str='input.txt') -> list[str]:
        input_path = os.path.join(os.getcwd(), filename)
        if not os.path.isfile(input_path):
            input_content = self._request(path=f'{self.year}/day/{self.day}/input', method='GET')
            with open(input_path, 'x') as file:
                file.write(input_content)
            return input_content.split('\n')
        else:
            with open(input_path, 'r') as file:
                return file.readlines()


