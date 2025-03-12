import fs from 'fs/promises';
import path from 'path';

import { type data } from '../types/data.js';
import getData from './getData.js';

const filePath = path.resolve('data.json');

const saveData = async (data: data): Promise<boolean> => {
  if (!data || !data._key) {
    console.error('Unable to save data, missing required value: _key');
    return false;
  }

  try {
    const existingData: data | null = await getData(data._key);
    if (existingData) data = { ...existingData, ...data };

    let file: string = '{}';
    try {
      file = await fs.readFile(filePath, 'utf-8');
    } catch (error: any) {
      if (error.code == 'ENOENT')
        await fs.writeFile(filePath, JSON.stringify({}));
    }

    const obj: object = await JSON.parse(file);

    const nextKey: number = Object.keys(obj).length + 1;
    const existingDataKey: string | undefined = Object.keys(obj).find(
      (i: string) => obj[i]._key === data._key
    );

    if (existingDataKey) {
      obj[existingDataKey] = data;
    } else {
      obj[nextKey] = data;
    }

    await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
    return true;
  } catch (error: any) {
    console.error('Unable to save data:', error);
  }

  return false;
};

export default saveData;
