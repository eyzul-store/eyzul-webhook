export default async function handler(req, res) {
  try {
    // Membantu menghantar arahan PUT ke Sekalipay secara automatik [image_ZUQnMn.png, image_qSZul_]
    const response = await fetch('https://sekalipay.com', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Mengambil API Key dari Vercel biskita [image_tjBwhv.png]
      },
      body: JSON.stringify({
        // Memasukkan URL webhook kedai biskita ke sistem Sekalipay [image_ZUQnMn.png, image_qSZul_]
        "callback_url": "https://vercel.app",
        "webhook_enabled": true
      })
    });

    const data = await response.json();
    
    // Memaparkan hasil maklum balas di skrin browser biskita
    return res.status(200).json({ 
      mesej: "Sistem sedang mengaktifkan webhook biskita!", 
      respon_sekalipay: data 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
