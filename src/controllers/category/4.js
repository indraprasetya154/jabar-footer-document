import convert from 'convert-length';
import { drawText3 } from '../../services/draw-text/3.js'
import { drawText4 } from '../../services/draw-text/4.js'

export function drawTemplate4(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
    for (const page of pages) {
        let { width, height } = page.getSize();
        
        // Convert from point (pt) to centimeter (cm)
        width = Math.ceil(convert(width, 'pt', 'cm'));
        height = Math.ceil(convert(height, 'pt', 'cm'));

        // Case 1 : Lanscape
        if (height <= width) {
            drawText3(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
        
        // Case 2 : Portrait
        else {
            drawText4(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
    }
}