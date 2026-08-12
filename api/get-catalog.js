// api/get-catalog.js
export default async function handler(req, res) {
  // Disable edge caching to ensure live, raw inventory updates synchronize perfectly
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY
      }
    });

    const catalogData = await response.json();

    // Safely structure and return the full list array back to your interactive page
    if (catalogData && catalogData.success) {
      return res.status(200).json({ success: true, products: catalogData.data });
    } else {
      return res.status(500).json({ success: false, message: 'Gagal mengambil data dari provider.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
