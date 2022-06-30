import { Router } from 'express';
import { addFooterPdf } from '../controllers/pdf.js';
import { addDraftPdf } from '../controllers/draft.js';
import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const path = `./tmp/uploads/`
      fs.mkdirSync(path, { recursive: true })
      cb(null, path)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
})
const uploadStorage = multer({ storage: storage })
const routes = new Router();

routes.get('/', (req, res) => {
    res.status(200).json({
        version: '1.0.0',
        message: 'API add footer pdf is running'
    });
})
routes.post('/api/add-footer-pdf', uploadStorage.single('pdf'), addFooterPdf);
routes.post('/api/add-draft-pdf', uploadStorage.single('pdf'), addDraftPdf);

export default routes;
