function findQRCodeInImage(image) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  return jsQR(imageData.data, imageData.width, imageData.height);
}

function scanPageForQRCode() {
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const code = findQRCodeInImage(images[i]);
    if (code) {
      return code.data;
    }
  }
  return null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanPageForQRCode') {
    const qrCodeData = scanPageForQRCode();
    sendResponse({data: qrCodeData});
  }
});
