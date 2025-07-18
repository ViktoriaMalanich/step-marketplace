import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
// import 'dotenv/config';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // важно для HTTPS-ссылок
});

export default cloudinary;
