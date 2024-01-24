import generateDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('generateDiff', () => {
    test('добавление нового ключа', () => {
        const data1 = getFixturePath('before_add.json');
        const data2 = getFixturePath('after_add.json');
        const diff = generateDiff(data1, data2);
        expect(diff).toMatchSnapshot();
    });

    test('удаление существовавшего ключа', () => {
        const data1 = getFixturePath('before_remove.json');
        const data2 = getFixturePath('after_remove.json');
        const diff = generateDiff(data1, data2);
        expect(diff).toMatchSnapshot();
    });

    test('изменение значения существующего ключа', () => {
        const data1 = getFixturePath('before_change.json');
        const data2 = getFixturePath('after_change.json');
        const diff = generateDiff(data1, data2);
        expect(diff).toMatchSnapshot();
    });

    test('изменение значения ключей и их порядка', () => {
        const data1 = getFixturePath('before_change_order.json');
        const data2 = getFixturePath('after_change_order.json');
        const diff = generateDiff(data1, data2);
        expect(diff).toMatchSnapshot();
    });

    test('без изменений', () => {
        const data1 = getFixturePath('before_no_change.json');
        const data2 = getFixturePath('after_no_change.json');
        const diff = generateDiff(data1, data2);
        expect(diff).toMatchSnapshot();
    });
});