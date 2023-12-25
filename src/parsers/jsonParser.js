import fs from 'fs';
import path from 'path';

const parseData = (filepath) => {
    const separateFormat = path.extname(filepath);
    const content = fs.readFileSync(filepath, 'utf-8');

    let data;
    switch (separateFormat) {
        case '.json':
            data = JSON.parse(content);
            break;
            
            default:
                throw new Error(`Unsupported file format: ${separateFormat}`);
    }
    return data;
};

export default parseData;