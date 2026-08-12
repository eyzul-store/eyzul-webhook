export default async function handler(req, res) {
  try {
    // Menarik data menu produk terus dari database Sekalipay
    const response = await fetch('https://sekalipay.com', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
