export default async function handler(req, res) {
  // 1. Pastikan hanya request POST sahaja yang diterima dari Sekalipay
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 2. Menerima data isyarat transaksi daripada Sekalipay
    const body = req.body;
    
    // Ini untuk tujuan semakan (log) biskita di dashboard Vercel nanti
    console.log('Isyarat Webhook Diterima:', body);

    // 3. Sistem Sekalipay mewajibkan respon status 200 OK sebagai tanda data selamat diterima [image_8nRy8Z.png, image_Eh0oIp]
    return res.status(200).json({ status: true, message: 'Webhook processed' });

  } catch (error) {
    console.error('Ralat Webhook:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
