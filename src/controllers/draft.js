import { PDFDocument, rgb, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import fs from 'fs';
import convert from 'convert-length';

export const addDraftPdf = async (req, res) => {
    try {
        const existingPdfBytes = fs.readFileSync('./' + req.file.path);
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
            throw new Error('No pages found in url pdf');
        }

        const text = 'NASKAH DRAFT';
        
        // Draw a string of text diagonally across the each page
        for (const page of pages) {
            const { width, height } = page.getSize()
            
            // Convert from point (pt) to centimeter (cm)
            const widthInCm = Math.ceil(convert(width, 'pt', 'cm'));
            const heightInCm = Math.ceil(convert(height, 'pt', 'cm'));
            
            // Case 1 : A4 Landcape
            if (widthInCm <= 31 && heightInCm <= widthInCm) {
                const textSize = 94;
                const degreeAngle = 30;
                
                const textWidth = arialRegularBoldFont.widthOfTextAtSize(text, textSize);
                const textHeight = arialRegularBoldFont.heightAtSize(textSize);
                
                page.drawText(text, {
                    x: (width / 6) - (textWidth / 24),
                    y: (height / 4) - (textHeight / 2),
                    size: textSize,
                    font: arialRegularBoldFont,
                    color: rgb(0, 0, 0),
                    opacity: 0.10,
                    rotate: degrees(degreeAngle)
                });
            } 
            
            // Case 2 : F4 Landcape
            else if (widthInCm >= 32 && heightInCm <= widthInCm) {
                const textSize = 94;
                const degreeAngle = 30;

                const textHeight = arialRegularBoldFont.heightAtSize(textSize);
                
                page.drawText(text, {
                    x: (width / 6) - (textHeight / 6),
                    y: (height / 6) - (textHeight / 4),
                    size: textSize,
                    font: arialRegularBoldFont,
                    color: rgb(0, 0, 0),
                    opacity: 0.10,
                    rotate: degrees(degreeAngle)
                });
            }
            
            // Case 3 : A4 Portrait
            else if (heightInCm <= 31 && heightInCm >= widthInCm) {
                const textSize = 96;
                const degreeAngle = 60;
                
                const textWidth = arialRegularBoldFont.widthOfTextAtSize(text, textSize);
                const textHeight = arialRegularBoldFont.heightAtSize(textSize);
                
                page.drawText(text, {
                    x: (width / 4) - (textWidth / 48),
                    y: (height / 6) - (textHeight / 2),
                    size: textSize,
                    font: arialRegularBoldFont,
                    color: rgb(0, 0, 0),
                    opacity: 0.10,
                    rotate: degrees(degreeAngle)
                });
            }
            
            // Case 4 : F4 Portrait
            else {
                const textSize = 96;
                const degreeAngle = 60;
                
                const textWidth = arialRegularBoldFont.widthOfTextAtSize(text, textSize);
                const textHeight = arialRegularBoldFont.heightAtSize(textSize);

                page.drawText(text, {
                    x: (width / 4) - (textWidth / 48),
                    y: (height / 6) - (textHeight / 4),
                    size: textSize,
                    font: arialRegularBoldFont,
                    color: rgb(0, 0, 0),
                    opacity: 0.10,
                    rotate: degrees(degreeAngle)
                });
            }
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
            message: 'Error while generating PDF. Message: ' + error.message,
        });
    }
}