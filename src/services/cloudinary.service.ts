import { ErrorHendler } from "../classes/ErrorHandler";
import cloudinary from "../config/cloudinary";

interface UploadResult {
    public_id: string;    
    secure_url: string;   
}


export const uploadImage = async (filePath: string): Promise<UploadResult> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'diploma_project',
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
        };
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw error;
    }
};

export const deletePhotoes = async (photoesId: string[]) => {
    try {
        await cloudinary.api.delete_resources(photoesId, { invalidate: true });
    } catch (error: any) {
        throw new ErrorHendler(error.error.http_code, error.error.message);
    }
}




