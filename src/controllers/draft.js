import { PDFDocument, rgb, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import fetch from 'node-fetch';
import fs from 'fs';

export const addDraftPdf = async (req, res) => {
    try {
        // Fetch an existing PDF document
        const existingPdfBytes = await fetch(req.body.pdf).then(res => res.arrayBuffer())
        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        // Register the `fontkit` instance
        pdfDoc.registerFontkit(fontkit)
        // Set Font
        const arialRegularBoldFontBytes = fs.readFileSync('./fonts/Arial-Bold.ttf')
        const arialRegularBoldFont = await pdfDoc.embedFont(arialRegularBoldFontBytes)

        // Get the each page of the document
        const pages = pdfDoc.getPages()

        if (pages === 0) {
            res.status(400).json({
                message: 'No pages found in url pdf'
            });
        }

        const text = 'NASKAH DRAFT';
        for (const page of pages) {
            // Draw a string of text diagonally across the each page
            switch (req.body.category) {
                case 1:
                    page.drawText(text, {
                        x: 150,
                        y: 150,
                        size: 100,
                        font: arialRegularBoldFont,
                        color: rgb(0, 0, 0),
                        opacity: 0.10,
                        rotate: degrees(60)
                    });
                break;

                case 2:
                    page.drawText(text, {
                        x: 150,
                        y: 60,
                        size: 110,
                        font: arialRegularBoldFont,
                        color: rgb(0, 0, 0),
                        opacity: 0.10,
                        rotate: degrees(30)
                    });
                break;

                case 3:
                    page.drawText(text, {
                        x: 100,
                        y: 100,
                        size: 100,
                        font: arialRegularBoldFont,
                        color: rgb(0, 0, 0),
                        opacity: 0.10,
                        rotate: degrees(30)
                    });
                break;

                case 4:
                    page.drawText(text, {
                        x: 140,
                        y: 140,
                        size: 100,
                        font: arialRegularBoldFont,
                        color: rgb(0, 0, 0),
                        opacity: 0.10,
                        rotate: degrees(60)
                    });
                break;

                case 5:
                    page.drawText(text, {
                        x: 100,
                        y: 80,
                        size: 100,
                        font: arialRegularBoldFont,
                        color: rgb(0, 0, 0),
                        opacity: 0.10,
                        rotate: degrees(30)
                    });
                break;
            }
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