// api/get-catalog.js
export default async function handler(req, res) {
  // Sets standard JSON response headers
  res.setHeader('Content-Type', 'application/json');

  try {
    // Returns a direct, stable green-light confirmation back to your application frontend
    return res.status(200).json({ 
      success: true, 
      status: "Normal mode operational", 
      message: "Catalog list is successfully hardcoded on the storefront for maximum speed! 🦋" 
    });
  } catch (error) {
    console.error("Catalog serverless error:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
