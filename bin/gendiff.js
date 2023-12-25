#!/usr/bin/env node
import { program } from 'commander';
import parseData from './../src/parsers/jsonParser.js';
import path from 'path';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {

        const absolutFilePath1 = path.resolve(process.cwd(), filepath1);
        const absolutFilePath2 = path.resolve(process.cwd(), filepath2);

        const data1 = parseData(absolutFilePath1);
        const data2 = parseData(absolutFilePath2);

        console.log(data1);
        console.log(data2);
    });

program.helpInformation = function() {
    const helpInfo = [
        'Usage: gendiff [options] <filepath1> <filpath2>',
        '',
        this.description(),
        '',
        'Options:',
        '-V, --version        output the version number',
        '-h, --help           display help for command',
        '-f, --format <type>  output format',
        ''
    ];
    return helpInfo.join('\n');
};

program.parse(process.argv);