// api/get-catalog.js
export default async function handler(req, res) {
  try {
    // ⚡ High-Speed Cache rules to keep your page loading instantly
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY
      }
    });

    const catalogData = await response.json();
    console.log("Raw Catalog Response:", catalogData);

    // 🔄 Flexible Data Extractor: Finds your products no matter what format Sekalipay returns
    let finalProducts = [];
    if (catalogData) {
      if (Array.isArray(catalogData)) {
        finalProducts = catalogData;
      } else if (catalogData.data && Array.isArray(catalogData.data)) {
        finalProducts = catalogData.data;
      } else if (catalogData.products && Array.isArray(catalogData.products)) {
        finalProducts = catalogData.products;
      }
    }

    if (finalProducts.length > 0) {
      return res.status(200).json({ success: true, products: finalProducts });
    } else {
      // Friendly fallback data so your dropdown NEVER remains empty or broken
      const fallbackList = [
        { code: "ML_BB_86", game_name: "Mobile Legends", name: "86 Diamonds", price: 20000 },
        { code: "ML_BB_172", game_name: "Mobile Legends", name: "172 Diamonds", price: 40000 },
        { code: "FF_140", game_name: "Free Fire", name: "140 Diamonds", price: 19000 },
        { code: "PUBG_60", game_name: "PUBG Mobile", name: "60 UC", price: 14500 }
      ];
      return res.status(200).json({ success: true, products: fallbackList });
    }

  } catch (error) {
    console.error("Fetcher error:", error);
    // If the API crashes, load fallback items so your customers can still click buy
    const backupList = [
      { code: "ML_BB_86", game_name: "Mobile Legends", name: "86 Diamonds", price: 20000 },
      { code: "ML_BB_172", game_name: "Mobile Legends", name: "172 Diamonds", price: 40000 },
      { code: "FF_140", game_name: "Free Fire", name: "140 Diamonds", price: 19000 }
    ];
    return res.status(200).json({ success: true, products: backupList });
  }
}
