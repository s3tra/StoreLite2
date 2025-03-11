import fs from 'fs/promises';

const saveData = async (data) => {
  try {
    // Read the file
    const file = await fs.readFile('../data.json', 'utf-8');
    // Convert content to json
    const obj = await JSON.parse(file);

    // Add new data to json
    const nextKey = Object.keys(obj) + 1;
    obj[nextKey] = data;

    // Write to the file
    await fs.writeFile('../data.json', JSON.stringify(obj));
  } catch (error) {
    console.error('Unable to save data:', error);
  }
};

export default saveData;
