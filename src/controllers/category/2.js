import convert from 'convert-length';
import { drawText1 } from '../../services/draw-text/1.js'
import { drawText2 } from '../../services/draw-text/2.js'

export function drawTemplate2(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
    for (const page of pages) {
        let { width, height } = page.getSize();
        
        // Convert from point (pt) to centimeter (cm)
        width = Math.ceil(convert(width, 'pt', 'cm'));
        height = Math.ceil(convert(height, 'pt', 'cm'));

        // Case 1 : Lanscape
        if (height <= width) {
            drawText2(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
        
        // Case 2 : Portrait
        else {
            drawText1(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
    }
}