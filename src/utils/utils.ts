import fs from 'fs/promises';

export const appendFile = async (path: string, data: string) => {
  try {
    await fs.appendFile(path, data);
  } catch (error) {
    console.error(error);
  }
};
