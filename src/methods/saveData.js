import fs from 'fs/promises';
import path from 'path';

import getData from './getData.js';

const filePath = path.resolve('data.json');

const saveData = async (data) => {
  if (!data || !data._key)
    return console.error('Unable to save data, missing required value: _key');

  try {
    const existingData = await getData(data._key);
    if (existingData)
      return console.warn('Unable to save data, the key is already in use.');

    let file;
    try {
      file = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      if (error.code == 'ENOENT')
        file = await fs.writeFile(filePath, JSON.stringify({}));
    }

    const obj = await JSON.parse(file);

    const nextKey = Object.keys(obj) + 1;
    obj[nextKey] = data;

    await fs.writeFile(filePath, JSON.stringify(obj));
    return true;
  } catch (error) {
    console.error('Unable to save data:', error);
  }

  return false;
};

export default saveData;
