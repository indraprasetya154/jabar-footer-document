import convert from 'convert-length';
import { drawText1 } from '../../services/draw-text/1.js'
import { drawText3 } from '../../services/draw-text/3.js'
import { drawText5 } from '../../services/draw-text/5.js'

export function drawTemplate3(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
    for (const page of pages) {
        let { width, height } = page.getSize();
        
        // Convert from point (pt) to centimeter (cm)
        width = Math.ceil(convert(width, 'pt', 'cm'));
        height = Math.ceil(convert(height, 'pt', 'cm'));

        // Case 1 : A4 Landscape
        if (width <= 31 && height <= width) {
            drawText5(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
        
        // Case 2 : F4 Landscape
        else if (width >= 32 && height <= width) {
            drawText3(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
        
        // Case 3 : A4 Portrait
        // Case 4 : F4 Portrait
        else {
            drawText1(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
    }
}