import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import fs from 'fs';
import QRCode from 'qrcode';
import { drawTemplate1 } from './category/1.js';
import { drawTemplate2 } from './category/2.js';
import { drawTemplate3 } from './category/3.js';
import { drawTemplate4 } from './category/4.js';
import { drawTemplate5 } from './category/5.js';

export const addFooterPdf = async (req, res) => {
    try {
        const existingPdfBytes = fs.readFileSync('./' + req.file.path);
        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Register the `fontkit` instance
        pdfDoc.registerFontkit(fontkit)
        // Set Font
        const arialRegularFontBytes = fs.readFileSync('./fonts/Arial.ttf')
        const arialRegularFont = await pdfDoc.embedFont(arialRegularFontBytes)
        // Setup QRCode Options
        const QRCodeImage = await QRCode.toDataURL(req.body.qrcode, {
                width: 45,
                margin: 0,
                errorCorrectionLevel: 'H',
            }).then((url) => {
                return url
            });

        const QRCodeImagePng = await pdfDoc.embedPng(QRCodeImage)
        const QRCodeImageLogo = await pdfDoc.embedPng(fs.readFileSync('./images/specimen-with-bg.png'))

        let baseUrlReq = new URL(req.body.qrcode)
        const footerUrl =  baseUrlReq.origin + '/v/' + req.body.code

        // Get the each page of the document
        const pages = pdfDoc.getPages()
        if (pages === 0) {
            throw new Error('No pages found in url pdf');
        }

        const category = parseInt(req.body.category)
        switch (category) {
            case 1:
                drawTemplate1(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
                break;

            case 2:
                drawTemplate2(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
                break;

            case 3:
                drawTemplate3(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
                break;

            case 4:
                drawTemplate4(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
                break;

            case 5:
                drawTemplate5(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
                break;

            default:
                throw new Error('Category not yet available');
                break;
        }
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
        let pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');
        // remove file upload
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path)
            console.log('File Deleted!')
        }
        // send response
        res.status(200);
        res.type('pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        // remove file upload
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path)
            console.log('File Deleted!')
        }
        // send response
        res.status(400).json({
            message: 'Error while generating PDF. Message: ' + error.message + '. Detail: ' + error.stack,
        });
    }
}