import fs from 'fs/promises';
import path from 'path';

import { type data } from '../types/data.ts';

const filePath = path.resolve('data.json');

const getData = async (key: string): Promise<data | null> => {
  if (!key) {
    console.error('Unable to get data, missing required parameter: key');
    return null;
  }

  let file: string = '{}';
  try {
    file = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    if (error.code == 'ENOENT')
      await fs.writeFile(filePath, JSON.stringify({}));
  }

  try {
    const obj: object = await JSON.parse(file);

    for (const entry of Object.values(obj)) {
      if (entry._key == key) return entry;
    }
  } catch (error: any) {
    console.error('Unable to get data:', error);
    return null;
  }

  return null;
};

export default getData;
