import multer from 'multer';
import path from 'path';

// Настраиваем, куда multer будет сохранять файлы (папка uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // папка для временного хранения файлов
  },
  filename: (req, file, cb) => {
    // формируем имя файла: оригинальное имя + текущая метка времени
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// Создаем мидлвар для обработки одного файла с ключом 'file'
const upload = multer({ storage });

export default upload;
