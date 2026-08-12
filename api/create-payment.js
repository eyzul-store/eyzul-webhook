export default async function handler(req, res) {
  try {
    // Menghantar isyarat PUT ke Sekalipay secara automatik menggunakan API Key biskita [image_ZUQnMn.png, image_qSZul_]
    const response = await fetch('https://sekalipay.com', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Mengambil kunci rahsia dari Vercel biskita [image_tjBwhv.png]
      },
      body: JSON.stringify({
        // Pautan rasmi webhook kedai biskita yang akan didaftarkan ke Sekalipay [image_ZUQnMn.png, image_qSZul_]
        "callback_url": "https://vercel.app",
        "webhook_enabled": true
      })
    });

    const data = await response.json();
    
    // Memaparkan hasil maklum balas daripada Sekalipay di skrin browser biskita
    return res.status(200).json({ 
      mesej: "Sistem sedang mendaftarkan URL Webhook biskita ke Sekalipay!", 
      respon_sekalipay: data 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
