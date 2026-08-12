// api/create-payment.js
export default async function handler(req, res) {
  // Direct security block against invalid requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Captures the precise price, account ID, and product name sent straight from your index.html storefront
  const { priceAmount, targetId, productName } = req.body;

  try {
    // Connects directly to Sekalipay's secure invoice generation engine
    const response = await fetch('https://sekalipay.com', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APIKEY': process.env.SEKALIPAY_API_KEY // Your secure H2H token variable
      },
      body: JSON.stringify({
        amount: priceAmount,                                                   // Example: 20000
        order_id: 'INV-' + Date.now(),                                        // Unique tracking number
        customer_email: 'buyer@eyzulstore.com',
        description: `Topup ${productName} ke ID/No: ${targetId}`,
        callback_url: 'https://vercel.app',         // Direct listener path
        redirect_url: 'https://vercel.app'                      // Where to return after paying
      })
    });

    const result = await response.json();

    // If Sekalipay successfully creates the checkout link, deliver it to the client
    if (result.success || result.data?.payment_url) {
      const liveCheckoutUrl = result.data?.payment_url || result.paymentUrl;
      return res.status(200).json({ success: true, paymentUrl: liveCheckoutUrl });
    } else {
      return res.status(400).json({ success: false, message: result.message || 'Gagal memproses kasir.' });
    }

  } catch (error) {
    console.error("Cashier Payment Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
