import express from "express";

import { Router } from 'express';
import { convertPdf } from '../controllers/pdf.js';

const routes = new Router();

// Add routes
routes.get('/convert-pdf', convertPdf);

export default routes;
