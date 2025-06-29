import cloudinary from "../config/cloudinary";
import fs from 'fs/promises';

// Тип результата загрузки, который будет возвращать функция
interface UploadResult {
    public_id: string;    // уникальный ID файла в Cloudinary
    secure_url: string;   // HTTPS-ссылка на загруженное фото
}

/**
 * Функция для загрузки фото в Cloudinary
 * @param filePath - путь к файлу на сервере
 * @returns объект с ID и ссылкой на фото
 */
export const uploadImage = async (filePath: string): Promise<UploadResult> => {
    try {
        // Вызываем метод загрузки из Cloudinary SDK
        // folder - папка в облаке, куда сохраняется фото (можно поменять)
        // use_filename - использовать исходное имя файла
        // unique_filename - не добавлять уникальные суффиксы
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'diploma_project', // имя папки для твоих фото
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        // Возвращаем нужные данные
        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
        };
    } catch (error) {
        // Если ошибка — выводим в консоль и кидаем дальше
        console.error('Cloudinary Upload Error:', error);
        throw error;
    }
};


export const deleteTempFiles = async (files: Express.Multer.File[]) => {
    try {
        await Promise.all(files.map(file => fs.unlink(file.path)));
    } catch (error) {
        console.error('Error deleting temporary files:', error);
        // throw error;//спросить
    }
};

