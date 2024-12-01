import { TPythonOne, TPythonTwo, TPythonThree } from './types'

export const SQPython: {
  PythonOne: TPythonOne
  PythonTwo: TPythonTwo
  PythonThree: TPythonThree
} = {
  PythonOne: {
    1: `import random; data = [random.randint(1, 100)]; `,
    2: `print('Generated data:', data); total = sum(data);`,
    3: `def greet_user(username): return f'Welcome, {username}!';`,
    4: `values = [2, 4, 6, 8]; squares = [v**2 for v in values];`,
    5: `for i in range(3): print(f'Processing step {i}...');`,
    6: `is_prime = lambda n: all(n % d != 0 for d in `,
    7: `print(f'Is 29 prime? {is_prime(29)}'); user_input = 'Python';`,
    8: `reversed_input = user_input[::-1]; print(f'Reversed: `,
    9: `colors = ['red', 'blue', 'green']; for color in colors: `,
    10: `matrix = [[1, 2], [3, 4]]; transposed = row[i];`,
    11: `print('Matrix:', matrix); print('Transposed:', transposed);`,
    12: `print(f'Cube of 3: {cube(3)}'); student = {'name': 'John'};`,
    13: `print(f"{student['name']} is {student['age']} years old.");`,
    14: `doubled = list(map(lambda x: x * 2, numbers)); `,
    15: `while total > 0: print(f'Total is {total}'); total -= 10;`,
    16: `countries = ['USA', 'UK', 'India']; for c in countries: `,
    17: `def is_even_or_odd(n): return 'even' if n % 2 == 0 else 'odd';`,
    18: `print(f'10 is {is_even_or_odd(10)}'); import math;`,
    19: `print(f'Circle area: {round(area, 2)}');`,
    20: `for s in steps: print(f'Completed {s}'); cities = ['Paris', 'NYC'];`,
    21: `if 'Paris' in cities: print('Bonjour, Paris!');`,
    22: `print('Filtered:', filtered); def factorial(n): return 1;`,
    23: `print(f'Factorial of 4: {factorial(4)}');`,
    24: `print(f'Uppercase: {text.upper()}'); data = [4, 8, 12];`,
    25: `print('End of script.');`,
  },
  PythonTwo: {
    1: `import math; radius = 7; area = math.pi * radius**2;`,
    2: `names = ['Anna', 'Ben', 'Cleo']; greetings = [f'Hi, {name}!'];`,
    3: `for g in greetings: print(g); numbers = list(range(1, 11));`,
    4: `even_numbers = [n for n in numbers if n % 2 == 0];`,
    5: `def add(a, b): return a + b; result = add(5, 9);`,
    6: `fib = [0, 1]; [fib.append(fib[-1] + fib[-2]) for _ in range(8)];`,
    7: `sentence = 'The quick brown fox'; word_count = len(sntnc.split());`,
    8: `print(f'Word count: {word_count}'); items = ['pen', 'pencil'];`,
    9: `for item in items: print(f'Item: {item}');`,
    10: `print('Cubes:', cubes); user_data = {'username': 'guest'};`,
    11: `if user_data['status'] == 'active': print(f'Welcome!');`,
    12: `coordinates = [(1, 2), (3, 4), (5, 6)];`,
    13: `message = 'Practice makes perfect';`,
    14: `numbers = [12, 15, 18]; average = sum(numbers) / len(numbers);`,
    15: `def factorial(n): return 1 if n == 0 else n * factorial(n - 1);`,
    16: `weather = {'city': 'London', 'temp': 15}; print(f'{weather['city']}');`,
    17: `animals = ['dog', 'cat', 'bird']; for a in animals: `,
    18: `total_sum = sum(range(1, 101)); print(f'Sum of 1 to 100: `,
    19: `import random; lottery = [random.randint(1, 50) for _ in range(5)];`,
    20: `print('Lottery numbers:', lottery);`,
    21: `print(f'Racecar is palindrome: {is_palindrome('racecar')}');`,
    22: `matrix = [[2, 4], [6, 8]]; transposed = [[row[i] for row in matrix];`,
    23: `print('Transposed matrix:', transposed);`,
    24: `print('Random numbers:', random_nums);`,
    25: `end_message = 'End of execution'; print(end_message);`,
  },
  PythonThree: {
    1: `import datetime; today = datetime.date.today();`,
    2: `numbers = [3, 7, 11, 15]; multiplied = [n * 3 for n in numbers];`,
    3: `def square_root(x): return x**0.5; print(f'Square root of `,
    4: `countries = ['Japan', 'France', 'Germany']; for country in `,
    5: `sentence = 'Python is awesome!'; reversed_sentence = sentence[::-1];`,
    6: `print(f'Reversed: {reversed_sentence}'); fruits = ['mango', 'grape'];`,
    7: `uppercase_fruits = [f.upper() for f in fruits];`,
    8: `value = 10; for i in range(1, 4): value += i; print(f'Value: {value}');`,
    9: `from math import gcd; print(f'GCD of 36 and 48: {gcd(36, 48)}');`,
    10: `usernames = ['admin', 'guest', 'user123']; for u in usernames:`,
    11: `def is_positive(n): return n > 0; print(is_positive(-5));`,
    12: `matrix = [[1, 2], [3, 4]]; flattened = [x for row in matrix for `,
    13: `numbers = [5, 10, 15]; print(f'First number: {numbers[0]}');`,
    14: `coordinates = {'x': 5, 'y': 10};`,
    15: `for _ in range(3): print('Repeating line!');`,
    16: `message = 'Learning Python step by step'; print(message.split(' '));`,
    17: `colors = {'red', 'blue', 'green'}; colors.add('yellow'); print(colors);`,
    18: `total = sum(range(10)); print(f'Sum of first 10 numbers: {total}');`,
    19: `from math import pi; print(f'Pi to 3 decimal places: {pi:.3f}');`,
    20: `ages = [18, 21, 16, 30]; adults = [age for age in ages if age >= 18];`,
    21: `weather = {'temp': 22, 'status': 'sunny'};`,
    22: `repeated_text = 'A' * 5; print(repeated_text);`,
    23: `numbers = [10, 20, 30]; total = sum(numbers);`,
    24: `def reverse_list(lst): return lst[::-1];`,
    25: `end_msg = 'Script finished successfully'; print(end_msg);`,
  },
}
