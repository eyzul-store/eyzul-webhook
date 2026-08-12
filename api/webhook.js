// api/webhook.js
export default async function handler(req, res) {
  // Accepts the payment connection test from Sekalipay
  if (req.method === 'POST') {
    return res.status(200).json({ success: true, message: 'Webhook operational!' });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
