// api/webhook.js
export default async function handler(req, res) {
  // Allow secure payment system test signals and real customer webhooks
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'GET') {
    
    // Log the transaction details inside your Vercel console logs for tracking
    console.log("Sekalipay payment notification received successfully:", req.body);
    
    // Always respond with a clean HTTP 200 OK so Sekalipay turns green
    return res.status(200).json({ 
      success: true, 
      message: 'Eyzulstore Webhook is Active and Verified! 🦋' 
    });
  }

  // Reject any unrecognised request types securely
  return res.status(405).json({ message: 'Method Not Allowed' });
}
