import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'

import QRCode from 'easyqrcodejs-nodejs';

import fetch from 'node-fetch';
import fs from 'fs';

export const convertPdf = async (req, res) => {    
    // Fetch an existing PDF document
    const urlPdf = 'https://devsikd.jabarprov.go.id/api/mobile/api/v1/draft/6090222023231'
    const existingPdfBytes = await fetch(urlPdf).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Register the `fontkit` instance
    pdfDoc.registerFontkit(fontkit)

    // Set Font
    const arialRegularFontBytes = fs.readFileSync('./fonts/Arial.ttf')
    const arialRegularFont = await pdfDoc.embedFont(arialRegularFontBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Setup QRCode Options
    let options = {
        text: urlPdf,
        width: 90,
        height: 90,
        logo: './images/specimen-with-bg.png',
        logoWidth: 30,
        logoHeight: 30,
        title: 'YTAWNWYZIU', // content 
        titleFont: "normal normal bold 14px Arial", // font
        titleHeight: 30, // height, including subTitle. default is 0
        titleTop: 25, // draws y coordinates. default is 30
    };

    // New instance with options
    let createQRCode = new QRCode(options);
    const QRCodeImage = await createQRCode.toDataURL().then((data) => {
        return data;
    });

    const QRCodeImagePng = await pdfDoc.embedPng(QRCodeImage)
    const QRCodeImagePngDims = QRCodeImagePng.scale(0.5)

    // Get the each page of the document
    const pages = pdfDoc.getPages()
    for (const page of pages) {
        // Get the width and height of the each page
        const { width, height } = page.getSize()
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

        // Draw the PNG image near the lower right corner of the JPG image
        page.drawImage(QRCodeImagePng, {
            x: 35,
            y: 40,
            width: QRCodeImagePngDims.width,
            height: QRCodeImagePngDims.height,
        }) 
        // page.drawText('AK293KDMD9', {
        //     x: 32,
        //     y: 30,
        //     size: 8,
        //     font: arialRegularFont,
        //     color: rgb(0, 0, 0),
        // })   
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    let pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');

    res.status(200);
    res.type('pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
}