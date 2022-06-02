import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import fetch from 'node-fetch';
import fs from 'fs';
import QRCode from 'qrcode';

export const addFooterPdf = async (req, res) => {
    try {
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
                        y: 53,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText('Elektronik (BSrE) Badan Siber dan Sandi Negara. Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau', {
                        x: 105,
                        y: 43,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText('memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
                        x: 185,
                        y: 33,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    // Draw text link footer
                    page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
                        x: 157,
                        y: 23,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText(req.body.qrcode, {
                        x: 330,
                        y: 23,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(30/255, 136/255, 229/255),
                    })
                    // Draw the QRCode
                    page.drawImage(QRCodeImagePng, {
                        x: 40,
                        y: 20,
                        width: 45,
                        height: 45,
                    })
                    // Draw the Logo QRCode Manually
                    page.drawImage(QRCodeImageLogo, {
                        x: 53,
                        y: 33,
                        width: 20,
                        height: 20,
                    })
                    // Add title on bottom QRCode
                    page.drawText(req.body.code, {
                        x: 37,
                        y: 10,
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
                        y: 28,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText('Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
                        x: 135,
                        y: 18,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    // Draw text link footer
                    page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
                        x: 228,
                        y: 8,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText(req.body.qrcode, {
                        x: 402,
                        y: 8,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(30/255, 136/255, 229/255),
                    })
                    // Draw the QRCode
                    page.drawImage(QRCodeImagePng, {
                        x: 117,
                        y: 52,
                        width: 40,
                        height: 40,
                    })
                    // Draw the Logo QRCode Manually
                    page.drawImage(QRCodeImageLogo, {
                        x: 130,
                        y: 65,
                        width: 15,
                        height: 15,
                    })
                    // Add title on bottom QRCode
                    page.drawText(req.body.code, {
                        x: 115,
                        y: 42,
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
                    // Draw text link footer
                    page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
                        x: 328,
                        y: 20,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText(req.body.qrcode, {
                        x: 502,
                        y: 20,
                        size: 8,
                        font: arialRegularFont,
                        color: rgb(30/255, 136/255, 229/255),
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
                        y: 50,
                        size: 7,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText('Siber dan Sandi Negara. Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi TNDE', {
                        x: 100,
                        y: 40,
                        size: 7,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText('Pemerintah Daerah Provinsi Jawa Barat.', {
                        x: 255,
                        y: 30,
                        size: 7,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    // Draw text link footer
                    page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
                        x: 178,
                        y: 20,
                        size: 7,
                        font: arialRegularFont,
                        color: rgb(0, 0, 0),
                    })
                    page.drawText(req.body.qrcode, {
                        x: 330,
                        y: 20,
                        size: 7,
                        font: arialRegularFont,
                        color: rgb(30/255, 136/255, 229/255),
                    })
                    // Draw the QRCode
                    page.drawImage(QRCodeImagePng, {
                        x: 35,
                        y: 20,
                        width: 40,
                        height: 40,
                    })
                    // Draw the Logo QRCode Manually
                    page.drawImage(QRCodeImageLogo, {
                        x: 50,
                        y: 35,
                        width: 12,
                        height: 12,
                    })
                    // Add title on bottom QRCode
                    page.drawText(req.body.code, {
                        x: 33,
                        y: 13,
                        size: 7,
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
                        // Draw text link footer
                        page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
                            x: 288,
                            y: 20,
                            size: 8,
                            font: arialRegularFont,
                            color: rgb(0, 0, 0),
                        })
                        page.drawText(req.body.qrcode, {
                            x: 462,
                            y: 20,
                            size: 8,
                            font: arialRegularFont,
                            color: rgb(30/255, 136/255, 229/255),
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
    } catch (error) {
        res.status(400).json({
            message: 'Error while generating PDF. Message: ' + error.message + '. Detail: ' + error.stack,
        });
    }
}