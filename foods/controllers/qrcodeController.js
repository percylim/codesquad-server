const QRCode = require('qrcode');

exports.getQRCode = async (req, res) => {
  try {
    const { stallID, stallName } = req.query;
    if (!stallID || !stallName) {
      return res.status(400).json({ error: 'Missing stallID or stallName' });
    }

    const orderUrl = `https://centralsoft.com.my/order/${stallID}`;
    const qrDataUrl = await QRCode.toDataURL(orderUrl, { width: 300 });

    res.json({ success: true, qrCode: qrDataUrl, orderUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};
