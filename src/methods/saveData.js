import fs from 'fs/promises';
import path from 'path';

import getData from './getData.js';

const filePath = path.resolve('data.json');

const saveData = async (data) => {
  if (!data || !data._key)
    return console.error('Unable to save data, missing required value: _key');

  try {
    const existingData = await getData(data._key);
    if (existingData) data = { ...existingData, ...data };

    let file;
    try {
      file = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      if (error.code == 'ENOENT')
        file = await fs.writeFile(filePath, JSON.stringify({}));
    }

    const obj = await JSON.parse(file);

    const nextKey = Object.keys(obj).length + 1;
    const existingDataKey = Object.keys(obj).find(
      (key) => obj[key]._key === data._key
    );

    if (existingDataKey) {
      obj[existingDataKey] = data;
    } else {
      obj[nextKey] = data;
    }

    await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
    return true;
  } catch (error) {
    console.error('Unable to save data:', error);
  }

  return false;
};

export default saveData;
