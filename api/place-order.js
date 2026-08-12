export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { uniqueProductCode, targetCustomerAccount } = req.body;

  try {
    const response = await fetch('https://sekalipay.com', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY
      },
      body: JSON.stringify({
        product_code: uniqueProductCode,
        target: targetCustomerAccount,
        ref_id: 'EYZUL-' + Date.now()
      })
    });

    const orderStatusResult = await response.json();
    return res.status(200).json({ success: true, data: orderStatusResult });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
