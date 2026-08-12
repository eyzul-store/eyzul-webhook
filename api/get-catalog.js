// api/get-catalog.js
export default async function handler(req, res) {
  try {
    // ⚡ High-Speed Caching: Keeps your storefront surfing ultra-fast
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

    // 🔗 CRUCIAL FIX: Changed from /api/v1/reseller/products to the correct direct HTTPS endpoint path
    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Your validated Vercel token
      }
    });

    const catalogData = await response.json();

    // Check if the server responds with a successful product array container
    if (catalogData && (catalogData.success || Array.isArray(catalogData.data))) {
      const itemsList = catalogData.data || catalogData.products || [];
      return res.status(200).json({ success: true, products: itemsList });
    } else {
      return res.status(500).json({ success: false, message: 'Gagal memproses data array katalog.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
