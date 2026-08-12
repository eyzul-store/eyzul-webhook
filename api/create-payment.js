// api/create-payment.js
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
        amount: priceAmount,
        order_id: 'INV-' + Date.now(),
        customer_email: 'buyer@eyzulstore.com',
        description: `Topup ${productName} ke ID: ${targetId}`,
        callback_url: 'https://vercel.app', 
        redirect_url: 'https://vercel.app'      
      })
    });

    const result = await response.json();

    if (result.success || result.data?.payment_url) {
      return res.status(200).json({ success: true, paymentUrl: result.data.payment_url });
    } else {
      return res.status(400).json({ success: false, message: result.message || 'Gagal membuat invoice' });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
