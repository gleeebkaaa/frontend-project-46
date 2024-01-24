import generateDiff from '../src/index.js';
import path from 'path';
import fs from 'fs';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('generateDiff', () => {
    test('добавление нового ключа', () => {
        const data1 = readFile('before_add.json');
        const data2 = readFile('after_add.json');
        const expected = `{
            a: 1
            b: 2
          + c: 3
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });

    test('удаление существовавшего ключа', () => {
        const data1 = readFile('before_remove.json');
        const data2 = readFile('after_remove.json');
        const expected = `{
            a: 1
            b: 2
          - c: 3
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });

    test('изменение значения существующего ключа', () => {
        const data1 = readFile('before_change.json');
        const data2 = readFile('after_change.json');
        const expected = `{
          - a: 1
          + a: 2
            b: 2
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });

    test('изменение значения ключей и их порядка', () => {
        const data1 = readFile('before_change_order.json');
        const data2 = readFile('after_change_order.json');
        const expected = `{
          - a: 1
          + a: 2
            b: 2
          + d: 3
          - c: 4
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });

    test('без изменений', () => {
        const data1 = readFile('before_no_change.json');
        const data2 = readFile('after_no_change.json');
        const expected = `{
            f: 1
            g: 2
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });
});