import { rgb } from 'pdf-lib';

export function drawTemplate4(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
    for (const page of pages) {
        // Draw a string of text diagonally across the each page
        page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE) Badan', {
            x: 90,
            y: 50-10,
            size: 7,
            font: arialRegularFont,
            color: rgb(0, 0, 0),
        })
        page.drawText('Siber dan Sandi Negara. Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi NDE', {
            x: 100,
            y: 40-10,
            size: 7,
            font: arialRegularFont,
            color: rgb(0, 0, 0),
        })
        page.drawText('Pemerintah Daerah Provinsi Jawa Barat.', {
            x: 255,
            y: 30-10,
            size: 7,
            font: arialRegularFont,
            color: rgb(0, 0, 0),
        })
        // Draw text link footer
        // page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
        //     x: 178,
        //     y: 20,
        //     size: 7,
        //     font: arialRegularFont,
        //     color: rgb(0, 0, 0),
        // })
        // page.drawText(footerUrl, {
        //     x: 330,
        //     y: 20,
        //     size: 7,
        //     font: arialRegularFont,
        //     color: rgb(30/255, 136/255, 229/255),
        // })
        // Draw the QRCode
        page.drawImage(QRCodeImagePng, {
            x: 35,
            y: 20,
            width: 40,
            height: 40,
        })
        // Draw the Logo QRCode Manually
        page.drawImage(QRCodeImageLogo, {
            x: 49,
            y: 34,
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
}