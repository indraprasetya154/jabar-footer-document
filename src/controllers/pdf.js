import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import fetch from 'node-fetch';
import fs from 'fs';
import QRCode from 'qrcode';

export const addFooterPdf = async (req, res) => {
    // Fetch an existing PDF document
    const existingPdfBytes = await fetch(req.body.pdf).then(res => res.arrayBuffer())
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
    // Get the each page of the document
    const pages = pdfDoc.getPages()

    if (pages === 0) {
        res.status(400).json({
            message: 'No pages found in url pdf'
        });
    }

    switch (req.body.category) {
        case 1:
            for (const page of pages) {
                // Draw a string of text diagonally across the each page
                page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi', {
                    x: 106,
                    y: 72,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('Elektronik (BSrE) Badan Siber dan Sandi Negara. Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau', {
                    x: 100,
                    y: 60,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
                    x: 180,
                    y: 48,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                // Draw the QRCode
                page.drawImage(QRCodeImagePng, {
                    x: 35,
                    y: 40,
                    width: 45,
                    height: 45,
                }) 
                // Draw the Logo QRCode Manually
                page.drawImage(QRCodeImageLogo, {
                    x: 48,
                    y: 53,
                    width: 20,
                    height: 20,
                }) 
                // Add title on bottom QRCode
                page.drawText(req.body.code, {
                    x: 32,
                    y: 30,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })   
            }

            break;

        case 3:
            for (const page of pages) {
                // Draw a string of text diagonally across the each page
                page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE) Badan Siber dan Sandi Negara. Dokumen digital', {
                    x: 180,
                    y: 40,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
                    x: 265,
                    y: 30,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                // Draw the QRCode
                page.drawImage(QRCodeImagePng, {
                    x: 50,
                    y: 17,
                    width: 40,
                    height: 40,
                }) 
                // Draw the Logo QRCode Manually
                page.drawImage(QRCodeImageLogo, {
                    x: 63,
                    y: 30,
                    width: 15,
                    height: 15,
                }) 
                // Add title on bottom QRCode
                page.drawText(req.body.code, {
                    x: 47,
                    y: 7,
                    size: 7,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })   
            }

            break;
    
        default:
            res.status(400).json({
                message: 'Template type not yet supported'
            });
            break;
    }
        
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    let pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');

    res.status(200);
    res.type('pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
}