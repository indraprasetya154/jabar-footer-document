import { rgb } from 'pdf-lib';

export function drawTemplate3(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
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
        page.drawText(footerUrl, {
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
}