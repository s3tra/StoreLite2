import fs from 'fs/promises';
import getData from './getData.js';

const saveData = async (data) => {
  if (!data || !data._key)
    return console.error('Unable to save data, missing required value: _key');

  try {
    const existingData = await getData(data._key);
    if (existingData)
      return console.warn('Unable to save data, the key is already in use.');

    const file = await fs.readFile('../data.json', 'utf-8');
    const obj = await JSON.parse(file);

    const nextKey = Object.keys(obj) + 1;
    obj[nextKey] = data;

    await fs.writeFile('../data.json', JSON.stringify(obj));
    return true;
  } catch (error) {
    console.error('Unable to save data:', error);
  }

  return false;
};

export default saveData;
