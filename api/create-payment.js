export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { priceAmount, targetId, productName } = req.body;

  try {
    const response = await fetch('https://sekalipay.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY
      },
      body: JSON.stringify({
        amount: Number(priceAmount),
        order_id: `INV-${Date.now()}`,
        product_name: productName || 'Pembelian Kedai',
        customer_id: targetId || 'GUEST'
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Ralat Cipta Bayaran:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
