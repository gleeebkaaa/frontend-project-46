test('gendifftest', async () => {
  const gendiff = await import('./bin/gendiff');

describe('gendiff', () => {
    test('добавление нового ключа', () => {
        const data1 = { a: 1, b: 2 };
        const data2 = { a: 1, b: 2, c: 3 };
        const expected = `{
            a: 1
            b: 2
          + c: 3
        }`;
        expect(gendiff(data1, data2)).toBe(expected);
    });

    test('удаление существовавшего ключа', () => {
        const data1 = { a: 1, b: 2, c: 3 };
        const data2 = { a: 1, b: 2 };
        const expected = `{
            a: 1
            b: 2
          - c: 3
        }`;
        expect(gendiff(data1, data2)).toBe(expected);
    });

    test('изменение значения существующего ключа', () => {
        const data1 = { a: 1, b: 2 };
        const data2 = { a: 2, b: 2 };
        const expected = `{
          - a: 1
          + a: 2
            b: 2
        }`;
        expect(gendiff(data1, data2)).toBe(expected);
    });

    test('изменение значения ключей и их порядка', () => {
        const data1 = { a: 1, b: 2, c: 4 };
        const data2 = { a: 2, b: 2, d: 3 };
        const expected = `{
          - a: 1
          + a: 2
            b: 2
          + d: 3
          - c: 4  
        }`;
        expect(gendiff(data1, data2)).toBe(expected);
    });

    test('без изменений', () => {
        const data1 = { f: 1, g: 2 };
        const data2 = { f: 1, g: 2 };
        const expected = `{
            f: 1
            g: 2
        }`;
        expect(gendiff(data1, data2)).toBe(expected);
    });
});

});