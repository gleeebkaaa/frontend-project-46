import pkg from 'lodash';
const { has, union } = pkg;

const gendiff = (data1, data2) => {
    const keys = union(Object.keys(data1), Object.keys(data2));
    const difference = keys.map((key) => {
        if (!has(data2, key)) {
            return `- ${key}: ${data1[key]}`;

        } if (!has(data1, key)) {
        return `+ ${key}: ${data2[key]}`;

        } if (data1[key] !== data2[key]) {
            return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`].join('\n');
        }
            return null;

        }).filter(Boolean);

        return ['{', ...difference,'}'].join(`\n`);
};

export default gendiff;