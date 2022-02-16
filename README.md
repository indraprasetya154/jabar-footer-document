## Research Modify PDF File

- Add text on footer pdf page
- Add QR Code on footer pdf page

### Endpoints
- `POST` APP_URL/api/add-footer-pdf
````
{
    "url": "https://your-url-pdf",
    "template": "potrait", // now only support this template
    "code": "YOUR RANDOM CODE"
}
````
### Stack
- Node JS
- Express JS

### Package
- https://github.com/Hopding/pdf-lib
- https://github.com/ushelp/EasyQRCodeJS-NodeJS
- https://github.com/Automattic/node-canvas

#### Current Issue (on my local machine - mac)
- Cannot run node-canvas with image svg
