import { TCsharpOne, TCsharpTwo, TCsharpThree } from './types'

export const SQCsharp: {
  ['C#One']: TCsharpOne
  ['C#Two']: TCsharpTwo
  ['C#Three']: TCsharpThree
} = {
  ['C#One']: {
    1: `using System; class Program { static void Main() { new Random(); }`,
    2: `int x = new Random().Next(100); Console.WriteLine(x);`,
    3: `string s = 'Hello'; Console.WriteLine(s.ToUpper());`,
    4: `var list = new List<int> { 1, 2, 3 }; list.Clear();`,
    5: `bool flag = DateTime.Now.Second % 2 == 0;`,
    6: `Console.WriteLine(flag ? 'Even' : 'Odd');`,
    7: `for (int i = 0; i < 10; i++) Console.Write(i);`,
    8: `var r = new Random(); int y = r.Next(10);`,
    9: `Console.WriteLine($'Random number: {y}');`,
    10: `Func<int, int> square = x => x * x;`,
    11: `var guid = Guid.NewGuid(); Console.WriteLine(guid);`,
    12: `char c = (char)new Random().Next(65, 90);`,
    13: `var date = DateTime.Now.ToShortDateString();`,
    14: `Console.WriteLine($'Today is {date}');`,
    15: `Console.WriteLine('This is random text.');`,
    16: `string rev = new string('abc'.Reverse().ToArray());`,
    17: `Console.WriteLine($'Reversed: {rev}');`,
    18: `Console.WriteLine(Math.Sqrt(16));`,
    19: `var t = Task.Run(() => 42); t.Wait();`,
    20: `new int[5].Select(x => x + 1).ToArray();`,
    21: `string str = 'Random'; Console.WriteLine(str.Length);`,
    22: `Console.WriteLine(new string('*', 10));`,
    23: `Console.WriteLine(new Random().NextDouble());`,
    24: `string[] arr = { 'a', 'b', 'c' };`,
    25: `Console.WriteLine(arr[new Random().Next(3)]);`,
  },
  ['C#Two']: {
    1: `int a = 42, b = 13; Console.WriteLine(a + b);`,
    2: `Console.WriteLine('Random:' + new Random().Next(1, 100));`,
    3: `var nums = new int[] { 1, 2, 3 }; Console.WriteLine(nums.Length);`,
    4: `string text = 'Test'; Console.WriteLine(text.Substring(0, 2));`,
    5: `DateTime now = DateTime.Now; Console.WriteLine(now);`,
    6: `Console.WriteLine($'Ticks: {DateTime.Now.Ticks}');`,
    7: `var data = new int[3] { 5, 8, 2 }; Array.Sort(data);`,
    8: `Console.WriteLine('Sorted: ' + string.Join(',', data));`,
    9: `bool isEven = 42 % 2 == 0; Console.WriteLine(isEven);`,
    10: `Console.WriteLine('Hello' + ' ' + 'World!');`,
    11: `var rand = new Random(); Console.WriteLine(rand.Next(1000));`,
    12: `double pi = Math.PI; Console.WriteLine($'PI: {pi:F2}');`,
    13: `string name = 'C#'; Console.WriteLine($'Hello, {name}!');`,
    14: `int sum = 0; for (int i = 1; i <= 5; i++) sum += i;`,
    15: `Console.WriteLine($'Sum: {sum}');`,
    16: `var chars = 'xyz'.ToCharArray(); Console.WriteLine(chars[1]);`,
    17: `int z = new Random().Next(10, 20); Console.WriteLine(z);`,
    18: `Console.WriteLine(new string('-', 20));`,
    19: `TimeSpan span = DateTime.Now.TimeOfDay;`,
    20: `Console.WriteLine($'Hours: {span.Hours}');`,
    21: `string rev = new string('word'.Reverse().ToArray());`,
    22: `Console.WriteLine($'Reversed: {rev}');`,
    23: `int[] array = { 10, 20, 30 };`,
    24: `Console.WriteLine(array[new Random().Next(array.Length)]);`,
    25: `Console.WriteLine('Done with random code!');`,
  },
  ['C#Three']: {
    1: `int x = 100 / (new Random().Next(1, 10)); Console.WriteLine(x);`,
    2: `char randomChar = (char)new Random().Next(65, 91);`,
    3: `double num = Math.Pow(2, 3); Console.WriteLine($'2^3 = {num}');`,
    4: `string msg = 'Hello, world!'.Replace('world', 'C#');`,
    5: `int[] nums = { 1, 3, 5, 7 }; Console.WriteLine(nums.Sum());`,
    6: `var now = DateTime.UtcNow; Console.WriteLine($'UTC: {now}');`,
    7: `bool result = 'hello'.Contains('h'); Console.WriteLine(result);`,
    8: `Console.WriteLine('Random letter: ' + (char)new Random());`,
    9: `int count = 'abcdef'.Count(c => c > 'c'); Console.WriteLine(count);`,
    10: `string stars = new string('*', 5); Console.WriteLine(stars);`,
    11: `double sqrt = Math.Sqrt(49); Console.WriteLine($'Sqrt: {sqrt}');`,
    12: `Console.WriteLine(DateTime.Now.ToString('HH:mm:ss'));`,
    13: `Console.WriteLine('Abc'.ToLowerInvariant());`,
    14: `var arr = new int[] { 3, 1, 4, 1 }; Array.Reverse(arr);`,
    15: `Console.WriteLine('Reversed: ' + string.Join(', ', arr));`,
    16: `var rnd = new Random().Next(50, 100); Console.WriteLine(rnd);`,
    17: `int sum = Enumerable.Range(1, 10).Sum(); Console.WriteLine(sum);`,
    18: `string pad = '123'.PadLeft(5, '0'); Console.WriteLine(pad);`,
    19: `Console.WriteLine($'Today is {DateTime.Today.DayOfWeek}');`,
    20: `Console.WriteLine('Fizz' + 'Buzz'.Substring(1));`,
    21: `int n = 10; Console.WriteLine(n.ToString('X'));`,
    22: `Console.WriteLine(new Random().NextDouble().ToString('F3'));`,
    23: `var initials = 'John Doe'.Split().Select(w => w[0]);`,
    24: `Console.WriteLine(string.Join('', initials));`,
    25: `Console.WriteLine('Goodbye, random code!');`,
  },
}
