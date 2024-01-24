import path from 'path';
import fs from 'fs';
import gendiff from './diff.js';
import parseData from './parsers/parsers.js';

    const generateDiff = ((filepath1, filepath2) => {

        const absolutFilePath1 = path.resolve(process.cwd(), filepath1);
        const absolutFilePath2 = path.resolve(process.cwd(), filepath2);

        const content1 = fs.readFileSync(absolutFilePath1, 'utf-8');
        const content2 = fs.readFileSync(absolutFilePath2, 'utf-8');

        const format1 = path.extname(absolutFilePath1);
        const format2 = path.extname(absolutFilePath2);

        const data1 = parseData(content1, format1);
        const  data2 = parseData(content2, format2);

        return gendiff (data1, data2);
        
    });

    export default generateDiff;