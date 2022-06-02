## Jabar Footer Document

- Add text on footer pdf page
- Add QR Code on footer pdf page

#### Category Support
- 1, 2, 3, 4, 5

### Endpoints
### Stable
- `POST` https://jabar-footer-document.rover.digitalservice.id/api/add-footer-pdf

### Playground
- `POST` https://research-modify-pdf.rover.digitalservice.id/api/add-footer-pdf
````
{
    "pdf": "https://your-url/file.pdf",
    "qrcode": "YOUR QRCODE VALUE",
    "category": 1,
    "code": "YOUR RANDOM CODE"
}
````
### Stack
- Node JS
- Express JS

### Package
- https://github.com/Hopding/pdf-lib
- https://github.com/soldair/node-qrcode
