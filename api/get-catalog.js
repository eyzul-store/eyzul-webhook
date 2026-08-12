export default async function handler(req, res) {
  // 1. Pastikan hanya request GET sahaja yang dibenarkan untuk menarik data
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 2. Menarik data menu produk game dan pulsa terus dari sistem Sekalipay
    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Menggunakan API Key rahsia biskita di Vercel [image_tjBwhv.png]
      }
    });

    const data = await response.json();
    
    // 3. Hantar data senarai produk balik ke frontend kedai biskita
    return res.status(200).json(data);

  } catch (error) {
    console.error('Ralat Ambil Katalog:', error);
    return res.status(500).json({ error: error.message });
  }
}
