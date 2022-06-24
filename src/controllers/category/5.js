import { rgb } from 'pdf-lib';

export function drawTemplate5(req, pages, arialRegularFont, QRCodeImagePng, QRCodeImageLogo, footerUrl) {
    for (const page of pages) {
        // Draw a string of text diagonally across the each page
        page.drawText('Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE) Badan Siber dan Sandi Negara.', {
            x: 150,
            y: 40-10,
            size: 8,
            font: arialRegularFont,
            color: rgb(0, 0, 0),
        })
        page.drawText('Dokumen digital yang asli dapat diperoleh dengan memindai QR Code atau memasukkan kode pada Aplikasi TNDE Pemerintah Daerah Provinsi Jawa Barat.', {
            x: 175,
            y: 30-10,
            size: 8,
            font: arialRegularFont,
            color: rgb(0, 0, 0),
        })
        // Draw text link footer
        // page.drawText('Untuk mengecek keaslian surat silahkan klik link ', {
        //     x: 288,
        //     y: 20,
        //     size: 8,
        //     font: arialRegularFont,
        //     color: rgb(0, 0, 0),
        // })
        // page.drawText(footerUrl, {
        //     x: 462,
        //     y: 20,
        //     size: 8,
        //     font: arialRegularFont,
        //     color: rgb(30/255, 136/255, 229/255),
        // })
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
}