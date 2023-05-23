document.addEventListener('DOMContentLoaded', function () {
  const scanButton = document.createElement('button');
  scanButton.textContent = 'Scan Page for QR Code';
  document.body.appendChild(scanButton);

  scanButton.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'scanPageForQRCode'}, function (response) {
        if (response.data) {
          // Open the scanned QR code link in a new tab
          chrome.tabs.create({url: response.data});
        } else {
          alert('No QR Code found on the page.');
        }
      });
    });
  });
});
