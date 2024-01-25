import generateDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readExpectedResult = (filename) => {
    const filePath = getFixturePath(filename);
    return fs.readFileSync(filePath, 'utf-8').trim();
};

describe('generateDiff for nested structures', () => {
    test('добавление нового ключа во вложенной структуре', () => {
        const data1 = getFixturePath('file1.json');
        const data2 = getFixturePath('file2.json');
        const diff = generateDiff(data1, data2);
        const expectedResult = readExpectedResult('result-json.json');
        expect(diff).toEqual(expectedResult);
    });

    test('удаление существовавшего ключа во вложенной структуре', () => {
        const data1 = getFixturePath('file1.json');
        const data2 = getFixturePath('file2.json');
        const diff = generateDiff(data1, data2);
        const expectedResult = readExpectedResult('result-json.json');
        expect(diff).toEqual(expectedResult);
    });

    test('изменение значения существующего ключа во вложенной структуре', () => {
        const data1 = getFixturePath('file1.json');
        const data2 = getFixturePath('file2.json');
        const diff = generateDiff(data1, data2);
        const expectedResult = readExpectedResult('result-json.json');
        expect(diff).toEqual(expectedResult);
    });

    test('изменение значения ключей и их порядка во вложенной структуре', () => {
        const data1 = getFixturePath('file1.json');
        const data2 = getFixturePath('file2.json');
        const diff = generateDiff(data1, data2);
        const expectedResult = readExpectedResult('result-json.json');
        expect(diff).toEqual(expectedResult);
    });

    test('без изменений во вложенной структуре', () => {
        const data1 = getFixturePath('file1.json');
        const data2 = getFixturePath('file2.json');
        const diff = generateDiff(data1, data2);
        const expectedResult = readExpectedResult('result-json.json');
        expect(diff).toEqual(expectedResult);
    });

    describe('generateDiff for YAML with nested structures', () => {
        test('добавление нового ключа во вложенной структуре', () => {
            const data1 = getFixturePath('file1.yml');
            const data2 = getFixturePath('file2.yml');
            const diff = generateDiff(data1, data2);
            const expectedResult = readExpectedResult('result-stylish.txt');
            expect(diff).toEqual(expectedResult);
        });

    });
});

