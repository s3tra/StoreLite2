import fs from 'fs/promises';
import path from 'path';
const filePath = path.resolve('data.json');
const getData = async (key) => {
    if (!key) {
        console.error('Unable to get data, missing required parameter: key');
        return null;
    }
    let file = '{}';
    try {
        file = await fs.readFile(filePath, 'utf-8');
    }
    catch (error) {
        if (error.code == 'ENOENT')
            await fs.writeFile(filePath, JSON.stringify({}));
    }
    try {
        const obj = await JSON.parse(file);
        for (const entry of Object.values(obj)) {
            if (entry._key == key)
                return entry;
        }
    }
    catch (error) {
        console.error('Unable to get data:', error);
        return null;
    }
    return null;
};
export default getData;
