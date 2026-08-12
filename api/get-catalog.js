// api/get-catalog.js
export default async function handler(req, res) {
  // Prevent system cache locks so prices and new games sync up instantly
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    // Connects directly to Sekalipay's live reseller catalog system endpoint
    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Your secure Vercel environment variable
      }
    });

    const catalogData = await response.json();

    // Verify if the system received a successful response from the supplier API
    if (catalogData && catalogData.success) {
      const liveProducts = catalogData.data || [];
      return res.status(200).json({ success: true, products: liveProducts });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: catalogData.message || 'Gagal menarik data dari server pusat Sekalipay.' 
      });
    }

  } catch (error) {
    console.error("Live Catalog Sync Crash:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
