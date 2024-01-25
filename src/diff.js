import _ from 'lodash';

const gendiff = (data1, data2) => {
  const iter = (currentData1, currentData2, depth) => {
    const indentSize = 4;
    const currentIndent = ' '.repeat(depth * indentSize - 2);
    const bracketIndent = ' '.repeat((depth - 1) * indentSize);
    const keys = _.union(Object.keys(currentData1), Object.keys(currentData2)).sort();

    const difference = keys.flatMap((key) => {
      if (!_.has(currentData2, key)) {
        return `${currentIndent}- ${key}: ${stringify(currentData1[key], depth + 1)}`;
      }
      if (!_.has(currentData1, key)) {
        return `${currentIndent}+ ${key}: ${stringify(currentData2[key], depth + 1)}`;
      }
      if (_.isObject(currentData1[key]) && _.isObject(currentData2[key])) {
        return `${currentIndent}  ${key}: ${iter(currentData1[key], currentData2[key], depth + 1)}`;
      }
      if (!_.isEqual(currentData1[key], currentData2[key])) {
        return [
          `${currentIndent}- ${key}: ${stringify(currentData1[key], depth + 1)}`,
          `${currentIndent}+ ${key}: ${stringify(currentData2[key], depth + 1)}`
        ];
      }
      return `${currentIndent}  ${key}: ${stringify(currentData1[key], depth + 1)}`;
    });

    return ['{', ...difference, `${bracketIndent}}`].join('\n');
  };

  const stringify = (value, depth) => {
    if (!_.isObject(value)) {
      return typeof value === 'string' ? value : String(value);
    }
    const indentSize = 4;
    const currentIndent = ' '.repeat(depth * indentSize);
    const bracketIndent = ' '.repeat((depth - 1) * indentSize);
    const lines = Object.entries(value).map(([key, val]) =>
      `${currentIndent}${key}: ${stringify(val, depth + 1)}`
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(data1, data2, 1);
};

export default gendiff;


