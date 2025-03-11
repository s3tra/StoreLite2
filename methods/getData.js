import fs from 'fs/promises';

const getData = async (key) => {
  // Read the file
  const file = await fs.readFile('../data.json', 'utf-8');
  // Convert content to json
  const obj = await JSON.parse(file);

  // Find and return an entry with the given key
  for (const entry of Object.values(obj)) {
    if (entry._key == key) return entry;
  }

  // Return false if nothing is found
  return false;
};
