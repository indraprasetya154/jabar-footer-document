import { rgb } from 'pdf-lib';

export function drawTemplate2(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
    for (const page of pages) {
        // Draw a string of text diagonally across the each page
        page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE) Badan Siber dan Sandi Negara.', {
            x: 115,
            y: 28-10,
            size: 8,
            font: arialRegularFont,
            color: rgb(0, 0, 0),
        })
        page.drawText('Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi NDE Pemerintah Daerah Provinsi Jawa Barat.', {
            x: 135,
            y: 18-10,
            size: 8,
            font: arialRegularFont,
            color: rgb(0, 0, 0),
        })
        // Draw text link footer
        // page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
        //     x: 228,
        //     y: 8,
        //     size: 8,
        //     font: arialRegularFont,
        //     color: rgb(0, 0, 0),
        // })
        // page.drawText(footerUrl, {
        //     x: 402,
        //     y: 8,
        //     size: 8,
        //     font: arialRegularFont,
        //     color: rgb(30/255, 136/255, 229/255),
        // })
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
}