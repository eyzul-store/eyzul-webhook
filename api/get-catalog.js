// api/get-catalog.js
export default async function handler(req, res) {
  try {
    // ⚡ High-Speed Caching: Stores product list for 1 hour so your website loads instantly
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

    // Fetch the live product catalog from Sekalipay
    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Hidden Reseller Key
      }
    });

    const catalogData = await response.json();

    if (catalogData && catalogData.success) {
      return res.status(200).json({ success: true, products: catalogData.data });
    } else {
      return res.status(500).json({ success: false, message: 'Gagal mengambil data katalog.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
