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
                    x: 111,
                    y: 70,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('Elektronik (BSrE) Badan Siber dan Sandi Negara. Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau', {
                    x: 105,
                    y: 60,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
                    x: 185,
                    y: 50,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                // Draw the QRCode
                page.drawImage(QRCodeImagePng, {
                    x: 40,
                    y: 40,
                    width: 45,
                    height: 45,
                }) 
                // Draw the Logo QRCode Manually
                page.drawImage(QRCodeImageLogo, {
                    x: 53,
                    y: 53,
                    width: 20,
                    height: 20,
                }) 
                // Add title on bottom QRCode
                page.drawText(req.body.code, {
                    x: 37,
                    y: 30,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })   
            }

            break;

        case 2:
            for (const page of pages) {
                // Draw a string of text diagonally across the each page
                page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE) Badan Siber dan Sandi Negara.', {
                    x: 115,
                    y: 25,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
                    x: 135,
                    y: 15,
                    size: 8,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                // Draw the QRCode
                page.drawImage(QRCodeImagePng, {
                    x: 117,
                    y: 57,
                    width: 40,
                    height: 40,
                }) 
                // Draw the Logo QRCode Manually
                page.drawImage(QRCodeImageLogo, {
                    x: 130,
                    y: 70,
                    width: 15,
                    height: 15,
                }) 
                // Add title on bottom QRCode
                page.drawText(req.body.code, {
                    x: 114,
                    y: 47,
                    size: 7,
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

        case 4:
            for (const page of pages) {
                // Draw a string of text diagonally across the each page
                page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE) Badan', {
                    x: 90,
                    y: 34,
                    size: 7,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('Siber dan Sandi Negara. Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi TNDE', {
                    x: 100,
                    y: 24,
                    size: 7,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                page.drawText('Pemerintah Daerah Provinsi Jawa Barat.', {
                    x: 255,
                    y: 14,
                    size: 7,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })
                // Draw the QRCode
                page.drawImage(QRCodeImagePng, {
                    x: 35,
                    y: 15,
                    width: 30,
                    height: 30,
                }) 
                // Draw the Logo QRCode Manually
                page.drawImage(QRCodeImageLogo, {
                    x: 44,
                    y: 24,
                    width: 12,
                    height: 12,
                }) 
                // Add title on bottom QRCode
                page.drawText(req.body.code, {
                    x: 31,
                    y: 8,
                    size: 6,
                    font: arialRegularFont,
                    color: rgb(0, 0, 0),
                })   
            }

            break;

            case 5:
                for (const page of pages) {
                    // Draw a string of text diagonally across the each page
                    page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE) Badan Siber dan Sandi Negara.', {
                        x: 150,
                        y: 40,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText('Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
                        x: 175,
                        y: 30,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    // Draw the QRCode
                    page.drawImage(QRCodeImagePng, {
                        x: 70,
                        y: 17,
                        width: 40,
                        height: 40,
                    }) 
                    // Draw the Logo QRCode Manually
                    page.drawImage(QRCodeImageLogo, {
                        x: 83,
                        y: 30,
                        width: 15,
                        height: 15,
                    }) 
                    // Add title on bottom QRCode
                    page.drawText(req.body.code, {
                        x: 67,
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