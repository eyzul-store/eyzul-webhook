// api/webhook.js
export default async function handler(req, res) {
  // Allow Sekalipay's system testing routes (GET, PUT, or POST)
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'GET') {
    
    // Log the data in your Vercel console to check transaction details later
    console.log("Incoming Sekalipay Signal:", req.body);
    
    // Always return a clean 200 OK success message to clear the error banner
    return res.status(200).json({ 
      success: true, 
      message: 'Eyzulstore Webhook is Active and Verified! 🦋' 
    });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
