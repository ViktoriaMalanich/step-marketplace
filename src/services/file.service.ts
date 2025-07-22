import fs from 'fs/promises';

export const deleteTempFiles = async (files: Express.Multer.File[]) => {
    try {
        await Promise.all(files.map(file => fs.unlink(file.path)));
    } catch (error) {
        console.error('Error deleting temporary files:', error);
    }
};