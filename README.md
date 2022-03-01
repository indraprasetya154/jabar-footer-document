## Research Modify PDF File

- Add text on footer pdf page
- Add QR Code on footer pdf page

#### Category Support (WIP 1-4)
- 1

### Endpoints
- `POST` APP_URL/api/add-footer-pdf
````
{
    "pdf": "https://your-url-pdf",
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
