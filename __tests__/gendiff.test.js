import fs from 'fs';
import generateDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('generateDiff', () => {
    test('добавление нового ключа', () => {
        const data1 = path.join('__fixtures__', 'before_add.json');
        const data2 = path.join('__fixtures__', 'after_add.json');
        const expected = `{
            a: 1
            b: 2
          + c: 3
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });

    test('удаление существовавшего ключа', () => {
        const data1 = path.join('__fixtures__', 'before_remove.json');
        const data2 = path.join('__fixtures__', 'after_remove.json');
        const expected = `{
            a: 1
            b: 2
          - c: 3
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });

    test('изменение значения существующего ключа', () => {
        const data1 = path.join('__fixtures__', 'before_change.json');
        const data2 = path.join('__fixtures__', 'after_change.json');
        const expected = `{
          - a: 1
          + a: 2
            b: 2
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });

    test('изменение значения ключей и их порядка', () => {
        const data1 = path.join('__fixtures__', 'before_change_order.json');
        const data2 = path.join('__fixtures__', 'after_change_order.json');
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
        const data1 = path.join('__fixtures__', 'before_no_change.json');
        const data2 = path.join('__fixtures__', 'after_no_change.json');
        const expected = `{
            f: 1
            g: 2
        }`;
        expect(generateDiff(data1, data2)).toBe(expected);
    });
});