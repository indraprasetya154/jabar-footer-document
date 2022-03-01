import { Router } from 'express';
import { addFooterPdf } from '../controllers/pdf.js';

const routes = new Router();

routes.get('/', (req, res) => {
    res.status(200).json({
        version: "1.0.0",
        message: 'API add footer pdf is running'
    });
})
routes.post('/api/add-footer-pdf', addFooterPdf);

export default routes;
