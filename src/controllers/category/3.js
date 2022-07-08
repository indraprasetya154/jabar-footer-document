import convert from 'convert-length';
import { drawText1 } from '../../services/draw-text/1.js'
import { drawText3 } from '../../services/draw-text/3.js'

export function drawTemplate3(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
    for (const page of pages) {
        let { width, height } = page.getSize();
        
        // Convert from point (pt) to centimeter (cm)
        width = Math.ceil(convert(width, 'pt', 'cm'));
        height = Math.ceil(convert(height, 'pt', 'cm'));

        // Case 1 : Landscape
        if (height <= width) {
            drawText3(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
        
        // Case 2 : Portrait
        else {
            drawText1(req, page, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl)
        }
    }
}