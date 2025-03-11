import fs from 'fs/promises';

const getData = async (key) => {
  if (!key)
    return console.error('Unable to get data, missing required parameter: key');

  try {
    const file = await fs.readFile('../data.json', 'utf-8');
    const obj = await JSON.parse(file);

    for (const entry of Object.values(obj)) {
      if (entry._key == key) return entry;
    }
  } catch (error) {
    return console.error('Unable to get data:', error);
  }

  return null;
};

export default getData;
