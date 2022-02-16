import { Router } from 'express';
import { addFooterPdf } from '../controllers/pdf.js';

const routes = new Router();

routes.post('/add-footer-pdf', addFooterPdf);

export default routes;
