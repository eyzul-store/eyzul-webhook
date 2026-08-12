export default async function handler(req, res) {
  // 1. Pastikan hanya request POST sahaja yang dibenarkan oleh sistem
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2. Mengambil data pembelian daripada frontend kedai biskita
  const { priceAmount, targetId, productName } = req.body;

  try {
    // 3. Menghantar data transaksi terus ke sistem Sekalipay [image_lesWMz.png]
    const response = await fetch('https://sekalipay.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Menggunakan API Key selamat dari Vercel [image_tjBwhv.png]
      },
      body: JSON.stringify({
        amount: Number(priceAmount),
        order_id: `INV-${Date.now()}`, // Mencipta ID invois unik automatik
        product_name: productName || 'Pembelian Kedai',
        customer_id: targetId || 'GUEST'
      })
    });

    const data = await response.json();
    
    // 4. Hantar data respon (termasuk link pembayaran) balik ke kedai biskita
    return res.status(200).json(data);

  } catch (error) {
    console.error('Ralat Cipta Bayaran:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
