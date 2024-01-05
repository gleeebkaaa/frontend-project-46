#!/usr/bin/env node
import { program } from 'commander';
import generateDiff from '../src/index.js';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        console.log(generateDiff(filepath1, filepath2));
    });

program.helpInformation = function() {
    const helpInfo = [
        'Usage: gendiff [options] <filepath1> <filepath2>',
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