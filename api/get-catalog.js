// api/get-catalog.js
export default async function handler(req, res) {
  // Turn off Vercel server cache limits to fetch raw updates instantly from the origin database
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    // 🔗 UNIVERSAL CATALOG ACCESS POINT: Fetches all structural assets from the product database
    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY
      }
    });

    const catalogData = await response.json();

    if (catalogData && catalogData.success) {
      const full Roster = catalogData.data || catalogData.products || [];
      return res.status(200).json({ success: true, products: fullRoster });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: catalogData.message || 'Gagal menyambungkan jalur data produk digital.' 
      });
    }

  } catch (error) {
    console.error("Live Global Sync Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
